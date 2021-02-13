var xhr = new XMLHttpRequest(),
		method = "GET",
		url = "https://bot.clover-service.online/index.html";//読み込まれるHTMLを指定
	var box = document.getElementById("drawer");//読み込みたい位置を指定
 
	xhr.responseType = "document";//XMLとして扱いたいので一応記述
	xhr.open(method, url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var restxt = xhr.responseXML;//重要
			var int = restxt.getElementsByTagName("html")[0].getElementsByTagName("body")[0].getElementsByTagName("aside")[0];//読み込まれるセレクタを指定
			box.innerHTML = int.innerHTML;//完了
		}
	};
	xhr.send();
	
window.onload = function() {
  let links = document.getElementsByClassName('link');
  
  for (let link of links) {
    if (location.href === link.href) {
      link.href = '#';
      link.classList.add('mdc-list-item--activated');
    }
  }
}
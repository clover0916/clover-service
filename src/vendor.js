const loader = document.getElementById('loading');

window.addEventListener('load', () => {
  alert('load')
  const ms = 400;
  loader.style.transition = 'opacity ' + ms + 'ms';
  
  const loaderOpacity = function(){
    loader.style.opacity = 0;
  }
  const loaderDisplay = function(){
    loader.style.display = 'none';
  }
  setTimeout(loaderOpacity, 1);
  setTimeout(loaderDisplay, ms); // opacityが0になるまで待ってからdisplay: none;にする
});

document.getElementById("OpenDialog").onclick = function() {
  var url = document.getElementById("OpenDialog").dataset.url;
  dialog.open();
  document.getElementById("url").innerHTML = url;
  const go = document.getElementById("go-url");
  go.addEventListener('click', function() {
    const spinner = document.getElementById("load");
    spinner.classList.remove("hidden");
    go.classList.add("hidden");
    location.href = url;
  });
};

//var xhr = new XMLHttpRequest(),
//		method = "GET",
//		url = "../dialog.html";//読み込まれるHTMLを指定
//	var box=document.getElementById("dialog");//読み込みたい位置を指定
 
//	xhr.open(method, url, true);
//	xhr.onreadystatechange = function () {
//		if(xhr.readyState === 4 && xhr.status === 200) {
//		  alert('ho?')
//			var restxt=xhr.responseText;//String型で取得
//			dialog.innerHTML=restxt;//完了
//		}
//	};
//	xhr.send();

window.WebFontConfig = {
  google: { families: ['Roboto', 'Noto+Sans+JP', 'Material+Icons'] },
  typekit: { id: 'pbk7rhd' },
  active: function() {
    sessionStorage.fonts = true;
  }
};
(function() {
  var wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
document.getElementById('get_video').addEventListener('click', function() {
  document.getElementById("video_url").value = document.getElementById("video_url").value.replace('https://www.youtube.com/', '')
  //submit()でフォームの内容を送信
  document.myform.submit();
})
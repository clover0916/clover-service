const textField = new MDCTextField(document.querySelector('.mdc-text-field'));

textField.listen('input', function(){
  textField.helperText_.foundation.setPersistent(true);

  if(!textField.value) {
    textField.valid = false;
    textField.helperTextContent = 'URLを入力してください';
    return;
  }

  textField.valid = true;

  textField.helperText_.foundation.setPersistent(false);
  // or
  //textField.helperTextContent = 'Valid';
});

document.getElementById('get_video').addEventListener('click', function() {
  var video_url = document.getElementById("video_url").value
  video_url = document.getElementById("video_url").value.replace('https://www.youtube.com/', '')
  if (!video_url) {
    textField.valid = false;
    textField.helperTextContent = 'URLを入力してください';
    return;
  }
  //submit()でフォームの内容を送信
  document.myform.submit();
})


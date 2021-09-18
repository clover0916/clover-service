import { MDCTextField } from '@material/textfield';
import {MDCMenu} from '@material/menu';

const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
const menu = new MDCMenu(document.querySelector('.mdc-menu'));
menu.open = true;

document.getElementById('get_video').addEventListener('click', function() {
  document.getElementById("video_url").value = document.getElementById("video_url").value.replace('https://www.youtube.com/watch?v=', '')
  if (!document.getElementById("video_url").value) {
    textField.valid = false;
    return;
  }
  //submit()でフォームの内容を送信
  document.myform.submit();
})
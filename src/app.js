import { MDCRipple } from '@material/ripple';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCCircularProgress } from '@material/circular-progress';
import { MDCDialog } from '@material/dialog';

// BootstrapのJavaScript側の機能を読み込む
//import "bootstrap";
import jQuery from "jquery";

// ドルマークに参照を代入(慣習的な $ を使うため)
const $ = jQuery;


// インスタンス化
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBarInstance = new MDCTopAppBar(topAppBarElement);
const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));
const circularProgress = new MDCCircularProgress(document.querySelector('.mdc-circular-progress'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;

const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});

$(window).on('load',function(){
  alert('load')
  $("loading").fadeOut();
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
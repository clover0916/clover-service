import { MDCRipple } from '@material/ripple';
import { MDCTopAppBar } from '@material/top-app-bar';

// BootstrapのJavaScript側の機能を読み込む
//import "bootstrap";

import "./index.scss";


// インスタンス化
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBarInstance = new MDCTopAppBar(topAppBarElement);
const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;

const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});

window.WebFontConfig = {
  google: { families: ['Noto+Sans+JP', 'Material+Icons'] },
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
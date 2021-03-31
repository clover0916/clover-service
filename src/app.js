import { MDCRipple } from '@material/ripple';
import { MDCTopAppBar } from '@material/top-app-bar';
import {MDCList} from "@material/list";
import {MDCDrawer} from "@material/drawer";
import {MDCIconButtonToggle} from '@material/icon-button';
import { MDCLinearProgress } from '@material/linear-progress';

import Swiper from 'swiper';

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

// インスタンス化
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBarInstance = new MDCTopAppBar(topAppBarElement);
const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));
const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
const iconToggle = new MDCIconButtonToggle(document.querySelector('.mdc-icon-button'));
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const list = MDCList.attachTo(document.querySelector('.mdc-list'));
const linearProgress = new MDCLinearProgress(document.querySelector('.mdc-linear-progress'));

list.wrapFocus = true;
iconButtonRipple.unbounded = true;

const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});

var swiper = new Swiper('.swiper-container');

const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});

topAppBarElement.addEventListener('MDCTopAppBar:nav', () => {
  drawer.open = true;
})

var scrollAnimationElm = document.querySelector('.main');
var scrollAnimationFunc = function() {
  var triggerMargin = 500;
  if (window.innerHeight > scrollAnimationElm.getBoundingClientRect().top + triggerMargin) {
    topAppBarElement.classList.remove('top');
  } else {
    topAppBarElement.classList.add('top');
  }
}

window.onload = function () {
  document.querySelector('.mdc-linear-progress').classList.add("mdc-linear-progress--closed")
};

window.addEventListener('load', scrollAnimationFunc);
window.addEventListener('scroll', scrollAnimationFunc);
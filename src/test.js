import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';
import { MDCList } from "@material/list";
import { MDCDrawer } from "@material/drawer";
import { MDCIconButtonToggle } from '@material/icon-button';
import { MDCSnackbar } from '@material/snackbar';
import { MDCTextField } from '@material/textfield';
//import {MDCTextFieldIcon} from '@material/textfield/icon';
import '@fortawesome/fontawesome-free/js/brands.js'
import '@fortawesome/fontawesome-free/js/fontawesome.js'

//const icon = new MDCTextFieldIcon(document.querySelector('.mdc-text-field-icon'));
//const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const iconToggle = new MDCIconButtonToggle(document.querySelector('.demo-icon'));
const list = MDCList.attachTo(document.querySelector('.mdc-deprecated-list'));
list.wrapFocus = true;
const listEl = document.querySelector('.mdc-drawer .mdc-deprecated-list');
//Ripple

const mainContentEl = document.querySelector('.main-content');
const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;
const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});

document.getElementById('demo-icon').onclick = function() {
  snackbar.open();
}

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

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});

topAppBarElement.addEventListener('MDCTopAppBar:nav', () => {
  drawer.open = true;
})

document.querySelectorAll('#share').forEach(share => {
  onclick = function() {
    if (navigator.share) {
      const shareData = {
        title: document.getElementById('share').title,
        text: document.getElementById('share').dataset.text,
        url: document.getElementById('share').dataset.url,
      }
      navigator.share(shareData).then(() => {
          console.log('Successful share');
        })
        .catch((error) => {
          console.log('Error sharing', error);
        });
    } else {
      alert('このブラウザではシェアできません、他の最新のブラウザを使用してください。');
    }
  }
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

window.addEventListener('load', scrollAnimationFunc);
window.addEventListener('scroll', scrollAnimationFunc);
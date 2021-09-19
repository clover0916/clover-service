import {MDCTopAppBar} from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';
import {MDCList} from "@material/list";
import {MDCDrawer} from "@material/drawer";
import {MDCIconButtonToggle} from '@material/icon-button';
import {MDCSnackbar} from '@material/snackbar';
import { MDCTextField } from '@material/textfield';
//import {MDCTextFieldIcon} from '@material/textfield/icon';
import { MDCDialog } from '@material/dialog';

const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
//const icon = new MDCTextFieldIcon(document.querySelector('.mdc-text-field-icon'));
const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const iconToggle = new MDCIconButtonToggle(document.querySelector('.demo-icon'));
const list = MDCList.attachTo(document.querySelector('.mdc-deprecated-list'));
list.wrapFocus = true;
//Ripple
const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});

document.getElementById('demo-icon').onclick = function() {
  snackbar.open();
}

document.getElementById('search').onclick = function() {
  dialog.open()
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

const listEl = document.querySelector('.mdc-drawer .mdc-deprecated-list');
const mainContentEl = document.querySelector('.main-content');

dialog.listen('MDCDialog:opened', () => {
  dialog_list.layout();
});

dialog.listen('MDCDialog:opened', function() {
  // Assuming contentElement references a common parent element with the rest of the page's content
  mainContentEl.setAttribute('aria-hidden', 'true');
});
dialog.listen('MDCDialog:closing', function() {
  mainContentEl.removeAttribute('aria-hidden');
});

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});

topAppBarElement.addEventListener('MDCTopAppBar:nav', () => {
  drawer.open = true;
})

document.getElementById('share').onclick = function() {
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
import {MDCTopAppBar} from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';
import {MDCList} from "@material/list";

const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
const list = MDCList.attachTo(document.querySelector('.mdc-deprecated-list'));
list.wrapFocus = true;
const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;

const listEl = document.querySelector('.mdc-drawer .mdc-deprecated-list');
const mainContentEl = document.querySelector('.main-content');

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});
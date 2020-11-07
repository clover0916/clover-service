import { MDCRipple } from '@material/ripple';

const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

import {MDCTopAppBar} from '@material/top-app-bar';

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;

import {MDCList} from "@material/list";
const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;

import {MDCDrawer} from "@material/drawer";
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});

const topAppBars = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBars.setScrollTarget(document.getElementById('main-content'));
topAppBars.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

import { MDCRipple } from '@material/ripple';

const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

import {MDCTopAppBar} from '@material/top-app-bar';

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;

const topAppBars = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBars.setScrollTarget(document.getElementById('main-content'));
topAppBars.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});
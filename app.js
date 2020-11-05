import { MDCRipple } from '@material/ripple/index';
import {MDCTopAppBar} from '@material/top-app-bar';

const ripple = new MDCRipple(document.querySelector('.mdc-button'));
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
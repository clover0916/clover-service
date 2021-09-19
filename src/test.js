import {MDCTopAppBar} from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';

const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;

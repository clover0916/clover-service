import {MDCRipple} from '@material/ripple';
import {MDCTopAppBar} from '@material/top-app-bar';

const ripple = new MDCRipple(document.querySelector('.foo-button'));

// インスタンス化
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;
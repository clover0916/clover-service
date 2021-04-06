import { MDCRipple } from '@material/ripple';

window.WebFontConfig = {
    google: { families: ['Roboto', 'Noto+Sans+JP', 'Material+Icons'] },
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

  const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));
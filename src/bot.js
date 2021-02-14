window.onload = function() {
  let links = document.getElementsByClassName('link');
  
  for (let link of links) {
    if (location.href === link.href) {
      link.href = '#';
      link.classList.add('mdc-list-item--activated');
      link.setAttribute('aria-current', 'page');
      link.setAttribute('tabindex', "0");
    }
  }
}
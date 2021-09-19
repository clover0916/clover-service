import { MDCDialog } from '@material/dialog';
import { MDCCircularProgress } from '@material/circular-progress';
import { MDCMenu } from '@material/menu';

const circularProgress = new MDCCircularProgress(document.querySelector('.mdc-circular-progress'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
const menu = new MDCMenu(document.querySelector('.mdc-menu'));

document.getElementById('redirect').onclick = function() {
  var title = 'ここから先は別のサイトに移動しますが進みますか？';
  var description = `<span id="url">${document.getElementById('redirect').dataset.url}</span>`;
  var redirect = document.getElementById('redirect').dataset.url;
  od(title, description, redirect);
}

function od(title, description, redirect) {
  dialog.open();
  document.getElementById('my-dialog-title').innerHTML = title;
  document.getElementById('my-dialog-content').innerHTML = description;
  if (redirect) {
    const go = document.getElementById("go-url");
    go.addEventListener('click', function() {
      const spinner = document.getElementById("load");
      spinner.classList.remove("hidden");
      go.classList.add("hidden");
      location.href = redirect;
    });
  };
}

document.getElementById('menu-button').onclick = function() {
  menu.open = !menu.open
  menu.setAnchorElement(document.getElementById('demo-menu'));
}

document.getElementById('ss').onclick = function() {
  var title = 'サポートサーバー';
  var description = `
    <h2 style="mdc-typography--headline2">サポートサーバーとは？</h2>
  `;
  var redirect = 'https://discord.gg/WJn3tbdMsz'
  od(title, description, redirect)
 
  const go = document.getElementById("go-url");
  go.addEventListener('click', function() {
    const spinner = document.getElementById("load");
    spinner.classList.remove("hidden");
    go.classList.add("hidden");
    location.href = 'https://discord.gg/WJn3tbdMsz';
  });
}

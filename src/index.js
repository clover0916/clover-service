import { MDCDialog } from '@material/dialog';
import { MDCCircularProgress } from '@material/circular-progress';
import {MDCMenu} from '@material/menu';

const circularProgress = new MDCCircularProgress(document.querySelector('.mdc-circular-progress'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
const menu = new MDCMenu(document.querySelector('.mdc-menu'));

document.getElementById("OpenDialog").onclick = function() {
  var url = document.getElementById("OpenDialog").dataset.url;
  dialog.open();
  document.getElementById("url").innerHTML = url;
  const go = document.getElementById("go-url");
  go.addEventListener('click', function() {
    const spinner = document.getElementById("load");
    spinner.classList.remove("hidden");
    go.classList.add("hidden");
    location.href = url;
  });
};

document.getElementById('menu-button').onclick = function () {
  menu.open = !menu.open
  menu.setFixedPosition(true);
  menu.setAnchorElement(document.getElementById('demo-menu'));
}
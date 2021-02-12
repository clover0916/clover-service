import { MDCDialog } from '@material/dialog';
import { MDCCircularProgress } from '@material/circular-progress';

const circularProgress = new MDCCircularProgress(document.querySelector('.mdc-circular-progress'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));


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
import { MDCDataTable } from '@material/data-table';
import { MDCDialog } from '@material/dialog';


const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

var OpenDialog = document.querySelectorAll('.od');

for (var i = 0; i < OpenDialog.length; i++) {
  var b = {
    [i]: OpenDialog[i].dataset.command
  };
  OpenDialog[i].addEventListener('click', function() {
    fetch("../assets/commands.json")
      .then(res => res.json())
      .then(data => {
        const json = data.find((v) => v.name === b[i]);
        dialog.open();
        document.getElementById("detail").innerHTML = json.description;
    })
  }, false);
}
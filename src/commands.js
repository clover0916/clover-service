import { MDCDataTable } from '@material/data-table';
import { MDCDialog } from '@material/dialog';


const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

var OpenDialog = document.querySelectorAll('.od');
var command = {};
var json;

for (var i = 0; i < OpenDialog.length; i++) {
  command[i] = OpenDialog[i].dataset.command
  OpenDialog[i].onclick = function() {
    fetch("../assets/commands.json")
      .then(res => res.json())
      .then(data => {
        json = data.find((v) => v.name === this.dataset.command);
        dialog.open();
        document.getElementById("detail").innerHTML = json.description;
    })
  };
}
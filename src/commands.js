
import {MDCDataTable} from '@material/data-table';
import { MDCDialog } from '@material/dialog';


const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

var OpenDialog = document.getElementsByClassName('od');

for(var i = 0; i < OpenDialog.length; i++) {
  OpenDialog[i].onclick = function() {
    fetch("../assets/commands.json")
      .then(res => res.json())
      .then(data => {
        const json = data.find((v) => v.name === OpenDialog[i].dataset.command)
        dialog.open()
        document.getElementById("detail").innerHTML = json.description;
      })
  }
}
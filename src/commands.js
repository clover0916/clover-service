
import {MDCDataTable} from '@material/data-table';
import { MDCDialog } from '@material/dialog';

const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));


document.getElementById('od').onclick = function() {
    fetch("../assets/commands.json")
      .then(res => res.json())
      .then(data => {
        const json = data.find((v) => v.name === document.getElementById("od").dataset.command)
        dialog.open()
        document.getElementById("detail").innerHTML = json.description;
      })
  }
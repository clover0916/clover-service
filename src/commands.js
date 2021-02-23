import { MDCDataTable } from '@material/data-table';
import { MDCDialog } from '@material/dialog';


const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

var OpenDialog = document.querySelectorAll('.od');

OpenDialog[0].addEventListener('click', function() {
  fetch("../assets/commands.json")
    .then(res => res.json())
    .then(data => {
      var command = OpenDialog[0].dataset.command
      const json = data.find((v) => v.name === command);
      dialog.open();
      document.getElementById("detail").innerHTML = json.description;
    })
}, false);
var commandTable = document.getElementById("cl")

fetch("../assets/commands.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(function(element, index){
      if (index === 0) {
        var thead = commandTable.createTHead();
        var tr = thead.insertRow(0);
        tr.classList.add("mdc-data-table__header-row")
        var th = document.createElement("th")
        th.innerHTML(element["name"]);
        th.classList.add("mdc-data-table__header-cell")
        th.setAttribute('role', "columnheader");
        th.setAttribute('scope', "col");
        tr.appendChild(th);
        var th = document.createElement("th")
        th.innerHTML(element["description"]);
        th.classList.add("mdc-data-table__header-cell")
        th.setAttribute('role', "columnheader");
        th.setAttribute('scope', "col");
        tr.appendChild(th);
        var th = document.createElement("th")
        th.innerHTML(element["use"]);
        th.classList.add("mdc-data-table__header-cell")
        th.setAttribute('role', "columnheader");
        th.setAttribute('scope', "col");
        tr.appendChild(th);
        var th = document.createElement("th")
        th.innerHTML(element["example"]);
        th.classList.add("mdc-data-table__header-cell")
        th.setAttribute('role', "columnheader");
        th.setAttribute('scope', "col");
        tr.appendChild(th);
      } else {
        console.log("Naiyou");
        console.log(element["name"]);
      }
    });
  })

  import { MDCDataTable } from '@material/data-table';


  const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
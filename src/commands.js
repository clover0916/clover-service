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
        th.innerHTML = element["name"];
        th.classList.add("mdc-data-table__header-cell")
        th.setAttribute('role', "columnheader");
        th.setAttribute('scope', "col");
        tr.appendChild(th);
        var th = document.createElement("th")
        th.innerHTML = element["description"];
        th.classList.add("mdc-data-table__header-cell")
        th.setAttribute('role', "columnheader");
        th.setAttribute('scope', "col");
        tr.appendChild(th);
        var th = document.createElement("th")
        th.innerHTML = element["use"];
        th.classList.add("mdc-data-table__header-cell")
        th.setAttribute('role', "columnheader");
        th.setAttribute('scope', "col");
        tr.appendChild(th);
        var th = document.createElement("th")
        th.innerHTML = element["example"];
        th.classList.add("mdc-data-table__header-cell")
        th.setAttribute('role', "columnheader");
        th.setAttribute('scope', "col");
        tr.appendChild(th);
      } else {
        var tbody = commandTable.createTBody()
        tbody.classList.add("mdc-data-table__content")
        var tr = thead.insertRow(0);
        tr.classList.add("mdc-data-table__header-row")
        tr.setAttribute('data-row-id', `u${index - 1}`);
        var th = document.createElement("th")
        th.innerHTML = element["name"];
        th.classList.add("mdc-data-table__cell")
        th.setAttribute('scope', "row");
        th.setAttribute('id', `u${index - 1}`);
        tr.appendChild(th);
        var td = document.createElement("td")
        td.innerHTML = element["description"];
        td.classList.add("mdc-data-table__cell")
        tr.appendChild(td);
        var td = document.createElement("td")
        td.innerHTML = element["use"];
        td.classList.add("mdc-data-table__cell")
        tr.appendChild(td);
        var td = document.createElement("td")
        td.innerHTML = element["example"];
        td.classList.add("mdc-data-table__cell")
        tr.appendChild(td);
      }
    });
  })

  import { MDCDataTable } from '@material/data-table';


  const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
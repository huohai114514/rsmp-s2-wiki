(function(){
  document.querySelectorAll('table').forEach(function(table){
    const rows = table.querySelectorAll('tr').length;
    const cells = table.querySelectorAll('tr:first-child th, tr:first-child td').length;
    if(rows === 4 && cells === 3){ table.classList.add('maybe-crafting-table'); }
  });
})();

let Size1 = document.querySelector(".SizeMatrixm");
let m = Size1.value;
let Size2 = document.querySelector(".SizeMatrixn");
let n = Size2.value;
let matrix1 = [];
let matrix2 = [];
CreateMatrix(m,n, "matrix1", "Elements1");
CreateMatrix(m,n, "matrix2", "Elements2");
Size1.oninput = function(){
  for(let i = 0; i < 2*m; i++){
    var elem = document.getElementById("str");
    elem.parentNode.removeChild(elem);
  }
  m = Size1.value;
  CreateMatrix(m,n, "matrix1", "Elements1");
  CreateMatrix(m,n, "matrix2", "Elements2");
}
Size2.oninput = function(){
  for(let i = 0; i < 2*m; i++){
    var elem = document.getElementById("str");
    elem.parentNode.removeChild(elem);
  }
  n = Size2.value;
  CreateMatrix(m,n, "matrix1", "Elements1");
  CreateMatrix(m,n, "matrix2", "Elements2");
}
let Get = document.querySelector(".Get");
let count = 0; 
Get.onclick = function(){
  if(count != 0) {
    var elem = document.getElementById("result");
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
  }
  }
  GetMatrix(m,n); 
  let matrRes = [];
  for (let i = 0; i < m; i++) {
    matrRes[i] = [];
    for (let j = 0; j < n; j++) {
      matrix1[i][j]*=1; matrix2[i][j]*=1;
      matrRes[i][j] = matrix1[i][j] - matrix2[i][j];
    }
    
  }
  PrintResult(matrRes, m, n);
  count++;
}
function CreateMatrix(m,n, id, cl) {
  /* createDocumentFragment создает фрагмент документа, но он не будет сразу же вставлен на страницу
      благодаря этому, мы не будем совершать множество операций, по вставке на страницу строк и ячеек,
      а соберем нужный нам фрагмент, и за один раз вставим все нужные элементы 
      совершить одну вставку  гораздо быстрее и эффективнее, так как при каждом изменение страницы, браузер вынужден перерисовывать ее полностью
  */
  var table = document.createDocumentFragment();
  for (var i = 0; i < m; i++) {
      var tr = document.createElement('tr');
      tr.id = 'str';
      for(var j = 0; j < n; j++) {
          var td = document.createElement('td');
          var input=document.createElement('input');
          input.type = 'number';
          input.className = cl;
          input.value = null;
          td.appendChild(input);
          tr.appendChild(td);
      }
      table.appendChild(tr);
  }
  document.getElementById(id).appendChild(table);
}
function GetMatrix(m, n){
for(let i = 0; i < m; i++){
  matrix1[i] = [];
  for(let j = 0; j < n; j++){
    let array = document.getElementsByClassName('Elements1')[i*n+j];
    matrix1[i][j] = array.value;
  }
}
for(let i = 0; i < m; i++){
  matrix2[i] = [];
  for(let j = 0; j < n; j++){
    let array = document.getElementsByClassName('Elements2')[i*n+j];
    matrix2[i][j] = array.value;
  }
}
}

function PrintResult(matr, m, n){
  let div = document.createDocumentFragment();
  let p1 = document.createElement('p');
  p1.innerText += 'Разностью матриц одинакового размера называется матрица того же размера, каждый элемент которой равен разности соответствующих элементов исходных матриц.';
  let p2 = document.createElement('p');
  p2.innerText += 'Разность исходных матриц равна: '
  let table1 = document.createElement('table');
  for (var i = 0; i < m; i++) {
    var tr1 = document.createElement('tr');
    for(var j = 0; j < n; j++) {
        var td1 = document.createElement('td');
        td1.innerHTML = matr[i][j];
        tr1.appendChild(td1);
    }
    table1.appendChild(tr1);
  }
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(table1);
  document.getElementById("result").appendChild(div);
}
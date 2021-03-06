let Size = document.querySelector(".SizeMatrix");
let N = Size.value;
let matrix = [];
CreateMatrix(N);
Size.oninput = function(){
  for(let i = 0; i < N; i++){
    var elem = document.getElementById("str");
    elem.parentNode.removeChild(elem);
  }
  N = Size.value;
  CreateMatrix(N);
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
  GetMatrix(N);  
  let det = Determinant(matrix);
  if (det == 0) PrintError();
  else{
    matrix = AdjugateMatrix(matrix);
  for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) matrix[i][j] /= det; 
  }
  PrintResult(matrix, N);
  }
  count++;
}

function AdjugateMatrix(A) 
{                                        
    let N = A.length, adjA = [];
    for (let i = 0; i < N; i++)
     { adjA[i] = [];
       for (let j = 0; j < N; j++)
        { let B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (let m = 0; m < j; m++)
           { B[m] = [];
             for (let n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (let n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (let m = j+1; m < N; m++)
           { B[m-1] = [];
             for (let n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (let n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          adjA[ i ][j] = sign*Determinant(B);   // Функцию Determinant см. выше
        }
     }
    return adjA;
}

function Determinant(A)   // Используется алгоритм Барейса
{
    let N = A.length, B = [], denom = 1, exchanges = 0;
    for (let i = 0; i < N; ++i)
     { B[i] = [];
       for (let j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (let i = 0; i < N-1; ++i)
     { let maxN = i, maxValue = Math.abs(B[i][i]);
       for (let j = i+1; j < N; ++j)
        { let value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { let temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       let value1 = B[i][i];
       for (let j = i+1; j < N; ++j)
        { let value2 = B[j][i];
          B[j][ i ] = 0;
          for (let k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[ i ][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}
function CreateMatrix(n) {
  /* createDocumentFragment создает фрагмент документа, но он не будет сразу же вставлен на страницу
      благодаря этому, мы не будем совершать множество операций, по вставке на страницу строк и ячеек,
      а соберем нужный нам фрагмент, и за один раз вставим все нужные элементы 
      совершить одну вставку  гораздо быстрее и эффективнее, так как при каждом изменение страницы, браузер вынужден перерисовывать ее полностью
  */
  var table = document.createDocumentFragment();
  for (var i = 0; i < n; i++) {
      var tr = document.createElement('tr');
      tr.id = 'str';
      for(var j = 0; j < n; j++) {
          var td = document.createElement('td');
          var input=document.createElement('input');
          input.type = 'number';
          input.className = 'Elements';
          input.value = null;
          td.appendChild(input);
          tr.appendChild(td);
      }
      table.appendChild(tr);
  }
  document.getElementById('matrix').appendChild(table);
}

function GetMatrix(n){
  for(let i = 0; i < n; i++){
    matrix[i] = [];
    for(let j = 0; j < n; j++){
      let array = document.getElementsByClassName('Elements')[i*n+j];
      matrix[i][j] = array.value;
    }
  }
}
function PrintError(){
  let div = document.createDocumentFragment();
  let p1 = document.createElement('p');
  p1.innerText += 'Данная матрица не имеет обратной, т.к. её определитель равен 0.';
  div.appendChild(p1);
  document.getElementById("result").appendChild(div);
}
function PrintResult(matr, n){
  let div = document.createDocumentFragment();
  let p1 = document.createElement('p');
  p1.innerText += 'Обратная матрица — такая матрица, при умножении на которую исходная матрица даёт в результате единичную матрицу.';
  let p2 = document.createElement('p');
  p2.innerText += 'Квадратная матрица обратима тогда и только тогда, когда она невырождена, то есть её определитель не равен нулю.';
  let p3 = document.createElement('p');
  p3.innerText += 'Для неквадратных матриц и вырожденных матриц обратных матриц не существует.';
  let p4 = document.createElement('p');
  p4.innerText += 'Обратная матрица для данной матрицы равна: '
  let table = document.createElement('table');
  for (var i = 0; i < n; i++) {
    var tr = document.createElement('tr');
    for(var j = 0; j < n; j++) {
        var td = document.createElement('td');
        td.innerHTML = matr[i][j];
        tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
  div.appendChild(p4);
  div.appendChild(table);
  document.getElementById("result").appendChild(div);
}
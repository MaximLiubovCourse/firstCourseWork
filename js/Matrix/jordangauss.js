let matrix = [[1, 2, 3],[4, 5, 6],[7, 8, 10]];
let free = [1, 1, 1];
let x = [];
let s;
let n = matrix.length;
for (let k = 0; k < n; k++)
{
    for (let j = k + 1; j < n; j++)
    {
        d = matrix[j][k] / matrix[k][k];
        for (let i = k; i < n; i++)
            matrix[j][i] -= d * matrix[k][i];
        free[j] -= d * free[k];
    }
}
for (let k = n-1; k > 0; k--)
{
    for (let j = k-1; j >= 0; j--)
    {
        d = matrix[j][k] / matrix[k][k];
        for (let i = k; i < n; i++)
            matrix[j][i] -= d * matrix[k][i];
        free[j] -= d * free[k];
    }
}
for (let k = 0; k < n; k++) x[k] = free[k] / matrix[k][k];
console.log(matrix);
console.log(free);
console.log(x);
const readline = require('readline');
const main = require('./main.js');

function main()
{
    const rl = readline.createInterface({
    
    input: process.stdin,
    output: process.stdout

    });

    setInterval( function() { readline.clearScreenDown() }, 10000);
    setInterval(function () { rl.write("Liczba pokoi: " + main.Tab[0].length + main.Tab[1].length + main.Tab[2].length) }, 1000);
    setInterval(function () { rl.write("2-os: " + main.Tab[0].length) }, 10000);
    setInterval(function () { rl.write("3-os: " + main.Tab[1].length) }, 10000);
    setInterval(function () { rl.write("4-os: " + main.Tab[2].length) }, 10000);
    setInterval(function () { rl.write("2-os (PEŁNE): ") }, 10000);
    setInterval(function () { rl.write("3-os (PEŁNE): ") }, 10000);
    setInterval(function () { rl.write("4-os (PEŁNE): ") }, 10000);
    setInterval(function () { rl.write("2-os (GRANE): ") }, 10000);
    setInterval(function () { rl.write("3-os (GRANE): ") }, 10000);
    setInterval(function () { rl.write("4-os (GRANE): ") }, 10000);

}

module.exports{
    cli: main
}
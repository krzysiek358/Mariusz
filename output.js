const main = require('./main.js');

function main()
{
    var p2 = 0;
    var p3 = 0;
    var p4 = 0;


    setInterval(function () { console.log('\033c')}, 10000);
    setInterval(function () { console.log("Liczba pokoi: " + main.Tab[0].length + main.Tab[1].length + main.Tab[2].length) }, 1000);
    setInterval(function () { console.log("2-os: " + main.Tab[0].length) }, 10000);
    setInterval(function () { console.log("3-os: " + main.Tab[1].length) }, 10000);
    setInterval(function () { console.log("4-os: " + main.Tab[2].length) }, 10000);
    

    for (var i = main.Tab.length - 1; i >= 0; i--)
        if (main.Tab[0][i].active == true)
            p2++;
    for (var i = main.Tab.length - 1; i >= 0; i--)
        if (main.Tab[1][i].active == true)
            p3++;
    for (var i = main.Tab.length - 1; i >= 0; i--)
        if (main.Tab[2][i].active == true)
            p4++;

    setInterval(function () { console.log("2-os (PEŁNE): " + p2) }, 10000);
    setInterval(function () { console.log("3-os (PEŁNE): " + p3) }, 10000);
    setInterval(function () { console.log("4-os (PEŁNE): " + p4) }, 10000);


module.exports{
    cli: main
}
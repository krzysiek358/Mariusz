const readline = require('readline');
const main = require('/main.js');

const rl = readline.createInterface({
    
    input: process.stdin,
    output: process.stdout

});

    setInterval( readline.clearScreenDown(), 1000);
    setInterval( rl.write("Liczba pokoi: " main.Tab[0].length + main.Tab[1].length + main.Tab[2].length ), 1000);
    setInterval( rl.write("2-os: " main.Tab[0].length), 1000);
    setInterval( rl.write("3-os: " main.Tab[1].length), 1000);
    setInterval( rl.write("4-os: " main.Tab[2].length), 1000);
    setInterval( rl.write("2-os (PEŁNE): "), 1000);
    setInterval( rl.write("3-os (PEŁNE): "), 1000);
    setInterval( rl.write("4-os (PEŁNE): "), 1000);
    setInterval( rl.write("2-os (GRANE): "), 1000);
    setInterval( rl.write("3-os (GRANE): "), 1000);
    setInterval( rl.write("4-os (GRANE): "), 1000);
//mariusz to debil
    

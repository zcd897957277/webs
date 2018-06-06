setTimeout(function cb() { console.log('5 seconds timeout'); }, 5000);
setTimeout(function cb() { console.log('9 seconds timeout'); }, 9000);
setTimeout(function cb() { console.log('7 seconds timeout'); }, 7000);
setTimeout(function cb() { console.log('3 seconds timeout'); }, 3000);

for(var start = +new Date; +new Date - start <= 10000; ) {}
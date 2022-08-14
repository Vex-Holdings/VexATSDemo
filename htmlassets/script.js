function changeButtonText(value) {
	var submit = document.getElementById('submitbutton');
    var registeraction = document.getElementById('register-action');
    var personalbutton = document.getElementById('personalbutton');
    var corporatebutton = document.getElementById('corporatebutton');
    if (value === "Next: Personal Details") {
        submit.value = value;
        registeraction.action = "personal.html";
        personalbutton.style.display = "block";
        corporatebutton.style.display = "none";
    } else if (value === "Next: Corporate Details") {
        submit.value = value;
        registeraction.action = "corporate.html";
        personalbutton.style.display = "none";
        corporatebutton.style.display = "block";
    };
}

// const Chart = require('chart.js');

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [10.00,
            10.01,
            10.02,
            10.03,
            10.04,
            10.05,
            10.06,
            10.07,
            10.08
        ],
        datasets: [{
            label: 'Shares',
            data: [0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            backgroundColor: ['gray',
                            'gray',
                            'gray',
                            'gray',
                            'gray',
                            'gray',
                            'gray',
                            'gray',
                            'gray'
        ]
        }]
    },
    options:{}
});

/*
let px01 = myChart.data.labels[0]
let px02 = myChart.data.labels[1]
let px03 = myChart.data.labels[2]
let px04 = myChart.data.labels[3]
let px05 = myChart.data.labels[4]
let px06 = myChart.data.labels[5]
let px07 = myChart.data.labels[6]
let px08 = myChart.data.labels[7]
let px09 = myChart.data.labels[8]
let sh01 = myChart.data.datasets[0].data[0]
let sh02 = myChart.data.datasets[0].data[1]
let sh03 = myChart.data.datasets[0].data[2]
let sh04 = myChart.data.datasets[0].data[3]
let sh05 = myChart.data.datasets[0].data[4]
let sh06 = myChart.data.datasets[0].data[5]
let sh07 = myChart.data.datasets[0].data[6]
let sh08 = myChart.data.datasets[0].data[7]
let sh09 = myChart.data.datasets[0].data[8]
let cl01 = myChart.data.datasets[0].backgroundColor[0]
let cl02 = myChart.data.datasets[0].backgroundColor[1]
let cl03 = myChart.data.datasets[0].backgroundColor[2]
let cl04 = myChart.data.datasets[0].backgroundColor[3]
let cl05 = myChart.data.datasets[0].backgroundColor[4]
let cl06 = myChart.data.datasets[0].backgroundColor[5]
let cl07 = myChart.data.datasets[0].backgroundColor[6]
let cl08 = myChart.data.datasets[0].backgroundColor[7]
let cl09 = myChart.data.datasets[0].backgroundColor[8]
*/
function placeBid(){
    let bidPrice = document.getElementById('bidprice').value;
    let bidShares = document.getElementById('bidshares').value;
    let sh01 = myChart.data.datasets[0].data[0]
    let sh02 = myChart.data.datasets[0].data[1]
    let sh03 = myChart.data.datasets[0].data[2]
    let sh04 = myChart.data.datasets[0].data[3]
    let sh05 = myChart.data.datasets[0].data[4]
    let sh06 = myChart.data.datasets[0].data[5]
    let sh07 = myChart.data.datasets[0].data[6]
    let sh08 = myChart.data.datasets[0].data[7]
    let sh09 = myChart.data.datasets[0].data[8]
    let cl01 = myChart.data.datasets[0].backgroundColor[0]
    let cl02 = myChart.data.datasets[0].backgroundColor[1]
    let cl03 = myChart.data.datasets[0].backgroundColor[2]
    let cl04 = myChart.data.datasets[0].backgroundColor[3]
    let cl05 = myChart.data.datasets[0].backgroundColor[4]
    let cl06 = myChart.data.datasets[0].backgroundColor[5]
    let cl07 = myChart.data.datasets[0].backgroundColor[6]
    let cl08 = myChart.data.datasets[0].backgroundColor[7]
    let cl09 = myChart.data.datasets[0].backgroundColor[8]
    if (bidPrice == 10 && cl01 == 'gray') {
        let update1 = parseInt(bidShares);
        myChart.data.datasets[0].data[0] = update1;
        myChart.data.datasets[0].backgroundColor[0] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10 && cl01 == 'green') {
        let update1 = parseInt(bidShares) + sh01;
        myChart.data.datasets[0].data[0] = update1;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10 && cl01 == 'red') {
        let update1 = sh01 - parseInt(bidShares);
        myChart.data.datasets[0].data[0] = update1;
        if(update1 == 0) {
            myChart.data.datasets[0].backgroundColor[0] = 'gray';
        }
        buylog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.01 && cl02 == 'gray') {
        let update2 = parseInt(bidShares);
        myChart.data.datasets[0].data[1] = update2;
        myChart.data.datasets[0].backgroundColor[1] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.01 && cl02 == 'green') {
        let update2 = parseInt(bidShares) + sh02;
        myChart.data.datasets[0].data[1] = update2;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.01 && cl02 == 'red') {
        let update2 = sh02 - parseInt(bidShares);
        myChart.data.datasets[0].data[1] = update2;
        if(update2 == 0) {
            myChart.data.datasets[0].backgroundColor[1] = 'gray';
        }
        buylog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.02 && cl03 == 'gray') {
        let update3 = parseInt(bidShares) + sh03;
        myChart.data.datasets[0].data[2] = update3;
        myChart.data.datasets[0].backgroundColor[2] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.02 && cl03 == 'green') {
        let update3 = parseInt(bidShares) + sh03;
        myChart.data.datasets[0].data[2] = update3;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.02 && cl03 == 'red') {
        let update3 = sh03 - parseInt(bidShares);
        myChart.data.datasets[0].data[2] = update3;
        if(update3 == 0) {
            myChart.data.datasets[0].backgroundColor[2] = 'gray';
        }
        buylog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.03 && cl04 == 'gray') {
        let update4 = parseInt(bidShares) + sh04;
        myChart.data.datasets[0].data[3] = update4;
        myChart.data.datasets[0].backgroundColor[3] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.03 && cl04 == 'green') {
        let update4 = parseInt(bidShares) + sh04;
        myChart.data.datasets[0].data[3] = update4;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.03 && cl04 == 'red') {
        let update4 = sh04 - parseInt(bidShares);
        myChart.data.datasets[0].data[3] = update4;
        if(update4 == 0) {
            myChart.data.datasets[0].backgroundColor[3] = 'gray';
        }
        buylog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.04 && cl05 == 'gray') {
        let update5 = parseInt(bidShares) + sh05;
        myChart.data.datasets[0].data[4] = update5;
        myChart.data.datasets[0].backgroundColor[4] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.04 && cl05 == 'green') {
        let update5 = parseInt(bidShares) + sh05;
        myChart.data.datasets[0].data[4] = update5;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.04 && cl05 == 'red') {
        let update5 = sh05 - parseInt(bidShares);
        myChart.data.datasets[0].data[4] = update5;
        if(update5 == 0) {
            myChart.data.datasets[0].backgroundColor[4] = 'gray';
        }
        buylog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.05 && cl06 == 'gray') {
        let update6 = parseInt(bidShares) + sh06;
        myChart.data.datasets[0].data[5] = update6;
        myChart.data.datasets[0].backgroundColor[5] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.05 && cl06 == 'green') {
        let update6 = parseInt(bidShares) + sh06;
        myChart.data.datasets[0].data[5] = update6;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.05 && cl06 == 'red') {
        let update6 = sh06 - parseInt(bidShares);
        myChart.data.datasets[0].data[5] = update6;
        if(update6 == 0) {
            myChart.data.datasets[0].backgroundColor[5] = 'gray';
        }
        buylog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.06 && cl07 == 'gray') {
        let update7 = parseInt(bidShares) + sh07;
        myChart.data.datasets[0].data[6] = update7;
        myChart.data.datasets[0].backgroundColor[6] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.06 && cl07 == 'green') {
        let update7 = parseInt(bidShares) + sh07;
        myChart.data.datasets[0].data[6] = update7;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.06 && cl07 == 'red') {
        let update7 = sh07 - parseInt(bidShares);
        myChart.data.datasets[0].data[6] = update7;
        if(update7 == 0) {
            myChart.data.datasets[0].backgroundColor[6] = 'gray';
        }
        buylog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.07 && cl08 == 'gray') {
        let update8 = parseInt(bidShares) + sh08;
        myChart.data.datasets[0].data[7] = update8;
        myChart.data.datasets[0].backgroundColor[7] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.07 && cl08 == 'green') {
        let update8 = parseInt(bidShares) + sh08;
        myChart.data.datasets[0].data[7] = update8;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.07 && cl08 == 'red') {
        let update8 = sh08 - parseInt(bidShares);
        myChart.data.datasets[0].data[7] = update8;
        if(update8 == 0) {
            myChart.data.datasets[0].backgroundColor[7] = 'gray';
        }
        buylog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.08 && cl09 == 'gray') {
        let update9 = parseInt(bidShares) + sh09;
        myChart.data.datasets[0].data[8] = update9;
        myChart.data.datasets[0].backgroundColor[8] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.08 && cl09 == 'green') {
        let update9 = parseInt(bidShares) + sh09;
        myChart.data.datasets[0].data[8] = update9;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.08 && cl09 == 'red') {
        let update9 = sh09 - parseInt(bidShares);
        myChart.data.datasets[0].data[8] = update9;
        if(update9 == 0) {
            myChart.data.datasets[0].backgroundColor[8] = 'gray';
        }
        buylog(bidShares,bidPrice);
        myChart.update();
    }
}

function placeOffer(){
    let askPrice = document.getElementById('askprice').value;
    let askShares = document.getElementById('askshares').value;
    let sh01 = myChart.data.datasets[0].data[0]
    let sh02 = myChart.data.datasets[0].data[1]
    let sh03 = myChart.data.datasets[0].data[2]
    let sh04 = myChart.data.datasets[0].data[3]
    let sh05 = myChart.data.datasets[0].data[4]
    let sh06 = myChart.data.datasets[0].data[5]
    let sh07 = myChart.data.datasets[0].data[6]
    let sh08 = myChart.data.datasets[0].data[7]
    let sh09 = myChart.data.datasets[0].data[8]
    let cl01 = myChart.data.datasets[0].backgroundColor[0]
    let cl02 = myChart.data.datasets[0].backgroundColor[1]
    let cl03 = myChart.data.datasets[0].backgroundColor[2]
    let cl04 = myChart.data.datasets[0].backgroundColor[3]
    let cl05 = myChart.data.datasets[0].backgroundColor[4]
    let cl06 = myChart.data.datasets[0].backgroundColor[5]
    let cl07 = myChart.data.datasets[0].backgroundColor[6]
    let cl08 = myChart.data.datasets[0].backgroundColor[7]
    let cl09 = myChart.data.datasets[0].backgroundColor[8]
    if (askPrice == 10 && cl01 == 'gray') {
        let update1 = parseInt(askShares);
        myChart.data.datasets[0].data[0] = update1;
        myChart.data.datasets[0].backgroundColor[0] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10 && cl01 == 'red') {
        let update1 = parseInt(askShares) + sh01;
        myChart.data.datasets[0].data[0] = update1;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10 && cl01 == 'green') {
        let update1 = sh01 - parseInt(askShares);
        myChart.data.datasets[0].data[0] = update1;
        if(update1 == 0) {
            myChart.data.datasets[0].backgroundColor[0] = 'gray';
        }
        soldlog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.01 && cl02 == 'gray') {
        let update2 = parseInt(askShares);
        myChart.data.datasets[0].data[1] = update2;
        myChart.data.datasets[0].backgroundColor[1] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.01 && cl02 == 'red') {
        let update2 = parseInt(askShares) + sh02;
        myChart.data.datasets[0].data[1] = update2;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.01 && cl02 == 'green') {
        let update2 = sh02 - parseInt(askShares);
        myChart.data.datasets[0].data[1] = update2;
        if(update2 == 0) {
            myChart.data.datasets[0].backgroundColor[1] = 'gray';
        }
        soldlog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.02 && cl03 == 'gray') {
        let update3 = parseInt(askShares) + sh03;
        myChart.data.datasets[0].data[2] = update3;
        myChart.data.datasets[0].backgroundColor[2] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.02 && cl03 == 'red') {
        let update3 = parseInt(askShares) + sh03;
        myChart.data.datasets[0].data[2] = update3;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.02 && cl03 == 'green') {
        let update3 = sh03 - parseInt(askShares);
        myChart.data.datasets[0].data[2] = update3;
        if(update3 == 0) {
            myChart.data.datasets[0].backgroundColor[2] = 'gray';
        }
        soldlog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.03 && cl04 == 'gray') {
        let update4 = parseInt(askShares) + sh04;
        myChart.data.datasets[0].data[3] = update4;
        myChart.data.datasets[0].backgroundColor[3] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.03 && cl04 == 'red') {
        let update4 = parseInt(askShares) + sh04;
        myChart.data.datasets[0].data[3] = update4;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.03 && cl04 == 'green') {
        let update4 = sh04 - parseInt(askShares);
        myChart.data.datasets[0].data[3] = update4;
        if(update4 == 0) {
            myChart.data.datasets[0].backgroundColor[3] = 'gray';
        }
        soldlog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.04 && cl05 == 'gray') {
        let update5 = parseInt(askShares) + sh05;
        myChart.data.datasets[0].data[4] = update5;
        myChart.data.datasets[0].backgroundColor[4] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.04 && cl05 == 'red') {
        let update5 = parseInt(askShares) + sh05;
        myChart.data.datasets[0].data[4] = update5;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.04 && cl05 == 'green') {
        let update5 = sh05 - parseInt(askShares);
        myChart.data.datasets[0].data[4] = update5;
        if(update5 == 0) {
            myChart.data.datasets[0].backgroundColor[4] = 'gray';
        }
        soldlog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.05 && cl06 == 'gray') {
        let update6 = parseInt(askShares) + sh06;
        myChart.data.datasets[0].data[5] = update6;
        myChart.data.datasets[0].backgroundColor[5] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.05 && cl06 == 'red') {
        let update6 = parseInt(askShares) + sh06;
        myChart.data.datasets[0].data[5] = update6;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.05 && cl06 == 'green') {
        let update6 = sh06 - parseInt(askShares);
        myChart.data.datasets[0].data[5] = update6;
        if(update6 == 0) {
            myChart.data.datasets[0].backgroundColor[5] = 'gray';
        }
        soldlog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.06 && cl07 == 'gray') {
        let update7 = parseInt(askShares) + sh07;
        myChart.data.datasets[0].data[6] = update7;
        myChart.data.datasets[0].backgroundColor[6] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.06 && cl07 == 'red') {
        let update7 = parseInt(askShares) + sh07;
        myChart.data.datasets[0].data[6] = update7;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.06 && cl07 == 'green') {
        let update7 = sh07 - parseInt(askShares);
        myChart.data.datasets[0].data[6] = update7;
        if(update7 == 0) {
            myChart.data.datasets[0].backgroundColor[6] = 'gray';
        }
        soldlog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.07 && cl08 == 'gray') {
        let update8 = parseInt(askShares) + sh08;
        myChart.data.datasets[0].data[7] = update8;
        myChart.data.datasets[0].backgroundColor[7] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.07 && cl08 == 'red') {
        let update8 = parseInt(askShares) + sh08;
        myChart.data.datasets[0].data[7] = update8;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.07 && cl08 == 'green') {
        let update8 = sh08 - parseInt(askShares);
        myChart.data.datasets[0].data[7] = update8;
        if(update8 == 0) {
            myChart.data.datasets[0].backgroundColor[7] = 'gray';
        }
        soldlog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.08 && cl09 == 'gray') {
        let update9 = parseInt(askShares) + sh09;
        myChart.data.datasets[0].data[8] = update9;
        myChart.data.datasets[0].backgroundColor[8] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.08 && cl09 == 'red') {
        let update9 = parseInt(askShares) + sh09;
        myChart.data.datasets[0].data[8] = update9;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.08 && cl09 == 'green') {
        let update9 = sh09 - parseInt(askShares);
        myChart.data.datasets[0].data[8] = update9;
        if(update9 == 0) {
            myChart.data.datasets[0].backgroundColor[8] = 'gray';
        }
        soldlog(askShares,askPrice);
        myChart.update();
    }
}

function bidlog(bidShares,bidPrice){
    let tradelog = document.getElementById('tradelog');
    let today = new Date();
    let time = today.getHours() + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');
    let message = time + ": " + "Bid " + bidShares + "@ $" + bidPrice;
    tradelog.innerHTML += `<li class="greentext">${message}</li>`
}

function buylog(bidShares,bidPrice){
    let tradelog = document.getElementById('tradelog');
    let today = new Date();
    let time = today.getHours() + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');
    let message = time + ": " + "Bought " + bidShares + "@ $" + bidPrice;
    tradelog.innerHTML += `<li class="greentext">${message}</li>`
}

function asklog(askShares,askPrice){
    let tradelog = document.getElementById('tradelog');
    let today = new Date();
    let time = today.getHours() + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');
    let message = time + ": " + "Offer " + askShares + "@ $" + askPrice;
    tradelog.innerHTML += `<li class="redtext">${message}</li>`
}

function soldlog(askShares,askPrice){
    let tradelog = document.getElementById('tradelog');
    let today = new Date();
    let time = today.getHours() + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');
    let message = time + ": " + "Sold " + askShares + "@ $" + askPrice;
    tradelog.innerHTML += `<li class="redtext">${message}</li>`
}




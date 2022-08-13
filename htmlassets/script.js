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
                200,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            backgroundColor: ['gray',
                            'red',
                            'gray',
                            'gray',
                            'gray',
                            'gray',
                            'red',
                            'red',
                            'red'
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
    // let sh09 = myChart.data.datasets[0].data[8]
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
        myChart.update();
    } else if (bidPrice == 10 && cl01 == 'green') {
        let update1 = parseInt(bidShares) + sh01;
        myChart.data.datasets[0].data[0] = update1;
        myChart.update();
    } else if (bidPrice == 10.01 && cl02 == 'gray') {
        let update2 = parseInt(bidShares);
        myChart.data.datasets[0].data[1] = update2;
        myChart.data.datasets[0].backgroundColor[1] = 'green';
        myChart.update();
    } else if (bidPrice == 10.01 && cl02 == 'green') {
        let update2 = parseInt(bidShares) + sh02;
        myChart.data.datasets[0].data[1] = update2;
        myChart.update();
    } else if (bidPrice == 10.01 && cl02 == 'red') {
        let update2 = sh02 - parseInt(bidShares);
        myChart.data.datasets[0].data[1] = update2;
        if(update2 == 0) {
            myChart.data.datasets[0].backgroundColor[1] = 'gray';
        }
        console.log(`Buy ${bidShares} shares at $${bidPrice}`);
        myChart.update();
    } else if (bidPrice == 10.02) {
        let update3 = parseInt(bidShares) + sh03;
        myChart.data.datasets[0].data[2] = update3;
        myChart.update();
    } else if (bidPrice == 10.03) {
        let update4 = parseInt(bidShares) + sh04;
        myChart.data.datasets[0].data[3] = update4;
        myChart.update();
    } else if (bidPrice == 10.04) {
        let update5 = parseInt(bidShares) + sh05;
        myChart.data.datasets[0].data[4] = update5;
        myChart.update();
    } else if (bidPrice == 10.05) {
        let update6 = parseInt(bidShares) + sh06;
        myChart.data.datasets[0].data[5] = update6;
        myChart.update();
    } else if (bidPrice == 10.06) {
        let update7 = parseInt(bidShares) + sh07;
        myChart.data.datasets[0].data[6] = update7;
        myChart.update();
    } else if (bidPrice == 10.07) {
        let update8 = parseInt(bidShares) + sh08;
        myChart.data.datasets[0].data[7] = update8;
        myChart.update();
    }
}
// myChart.update();


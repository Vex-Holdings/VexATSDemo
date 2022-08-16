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
// for when we do it in Node.js

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
            10.08,
            10.09,
            10.10
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
                            'gray',
                            'gray',
                            'gray'
        ]
        }]
    },
    options:{}
});

function placeBid(){
    let bidPrice = document.getElementById('bidprice').value;
    let bidShares = document.getElementById('bidshares').value;
    let shrs = myChart.data.datasets[0].data;
    let color = myChart.data.datasets[0].backgroundColor;
    
    if (bidPrice == 10+(0/100) && color[0] == 'gray') {
        let update = parseInt(bidShares);
        shrs[0] = update;
        color[0] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10+(0/100) && color[0] == 'green') {
        let update = parseInt(bidShares) + shrs[0];
        shrs[0] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10+(0/100) && color[0] == 'red') {
        let update = shrs[0] - parseInt(bidShares);
        if(update > 0) {
            shrs[0] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[0] = 0;
            color[0] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[0] = 0 - update;
            color[0] = 'green';
            let botshares = bidShares - shrs[0];
            let bidshares = shrs[0];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    } else if (bidPrice == 10+(1/100) && color[1] == 'gray') {
        let update = parseInt(bidShares);
        shrs[1] = update;
        color[1] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10+(1/100) && color[1] == 'green') {
        let update = parseInt(bidShares) + shrs[1];
        shrs[1] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10+(1/100) && color[1] == 'red') {
        let update = shrs[1] - parseInt(bidShares);
        if(update > 0) {
            shrs[1] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[1] = 0;
            color[1] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[1] = 0 - update;
            color[1] = 'green';
            let botshares = bidShares - shrs[1];
            let bidshares = shrs[1];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    } else if (bidPrice == 10.02 && color[2] == 'gray') {
        let update = parseInt(bidShares);
        shrs[2] = update;
        color[2] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.02 && color[2] == 'green') {
        let update = parseInt(bidShares) + shrs[2];
        shrs[2] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.02 && color[2] == 'red') {
        let update = shrs[2] - parseInt(bidShares);
        if(update > 0) {
            shrs[2] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[2] = 0;
            color[2] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[2] = 0 - update;
            color[2] = 'green';
            let botshares = bidShares - shrs[2];
            let bidshares = shrs[2];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    } else if (bidPrice == 10.03 && color[3] == 'gray') {
        let update = parseInt(bidShares);
        shrs[3] = update;
        color[3] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.03 && color[3] == 'green') {
        let update = parseInt(bidShares) + shrs[3];
        shrs[3] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.03 && color[3] == 'red') {
        let update = shrs[3] - parseInt(bidShares);
        if(update > 0) {
            shrs[3] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[3] = 0;
            color[3] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[3] = 0 - update;
            color[3] = 'green';
            let botshares = bidShares - shrs[3];
            let bidshares = shrs[3];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    } else if (bidPrice == 10.04 && color[4] == 'gray') {
        let update = parseInt(bidShares);
        shrs[4] = update;
        color[4] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.04 && color[4] == 'green') {
        let update = parseInt(bidShares) + shrs[4];
        shrs[4] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.04 && color[4] == 'red') {
        let update = shrs[4] - parseInt(bidShares);
        if(update > 0) {
            shrs[4] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[4] = 0;
            color[4] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[4] = 0 - update;
            color[4] = 'green';
            let botshares = bidShares - shrs[4];
            let bidshares = shrs[4];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    } else if (bidPrice == 10.05 && color[5] == 'gray') {
        let update = parseInt(bidShares);
        shrs[5] = update;
        color[5] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.05 && color[5] == 'green') {
        let update = parseInt(bidShares) + shrs[5];
        shrs[5] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.05 && color[5] == 'red') {
        let update = shrs[5] - parseInt(bidShares);
        if(update > 0) {
            shrs[5] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[5] = 0;
            color[5] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[5] = 0 - update;
            color[5] = 'green';
            let botshares = bidShares - shrs[5];
            let bidshares = shrs[5];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    } else if (bidPrice == 10.06 && color[6] == 'gray') {
        let update = parseInt(bidShares);
        shrs[6] = update;
        color[6] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.06 && color[6] == 'green') {
        let update = parseInt(bidShares) + shrs[6];
        shrs[6] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.06 && color[6] == 'red') {
        let update = shrs[6] - parseInt(bidShares);
        if(update > 0) {
            shrs[6] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[6] = 0;
            color[6] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[6] = 0 - update;
            color[6] = 'green';
            let botshares = bidShares - shrs[6];
            let bidshares = shrs[6];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    } else if (bidPrice == 10.07 && color[7] == 'gray') {
        let update = parseInt(bidShares);
        shrs[7] = update;
        color[7] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.07 && color[7] == 'green') {
        let update = parseInt(bidShares) + shrs[7];
        shrs[7] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.07 && color[7] == 'red') {
        let update = shrs[7] - parseInt(bidShares);
        if(update > 0) {
            shrs[7] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[7] = 0;
            color[7] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[7] = 0 - update;
            color[7] = 'green';
            let botshares = bidShares - shrs[7];
            let bidshares = shrs[7];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    } else if (bidPrice == 10.08 && color[8] == 'gray') {
        let update = parseInt(bidShares);
        shrs[8] = update;
        color[8] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.08 && color[8] == 'green') {
        let update = parseInt(bidShares) + shrs[8];
        shrs[8] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.08 && color[8] == 'red') {
        let update = shrs[8] - parseInt(bidShares);
        if(update > 0) {
            shrs[8] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[8] = 0;
            color[8] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[8] = 0 - update;
            color[8] = 'green';
            let botshares = bidShares - shrs[8];
            let bidshares = shrs[8];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    } else if (bidPrice == 10.09 && color[9] == 'gray') {
        let update = parseInt(bidShares);
        shrs[9] = update;
        color[9] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.09 && color[9] == 'green') {
        let update = parseInt(bidShares) + shrs[9];
        shrs[9] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.09 && color[9] == 'red') {
        let update = shrs[9] - parseInt(bidShares);
        if(update > 0) {
            shrs[9] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[9] = 0;
            color[9] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[9] = 0 - update;
            color[9] = 'green';
            let botshares = bidShares - shrs[9];
            let bidshares = shrs[9];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    } else if (bidPrice == 10.10 && color[10] == 'gray') {
        let update = parseInt(bidShares);
        shrs[10] = update;
        color[10] = 'green';
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.10 && color[10] == 'green') {
        let update = parseInt(bidShares) + shrs[10];
        shrs[10] = update;
        bidlog(bidShares,bidPrice);
        myChart.update();
    } else if (bidPrice == 10.10 && color[10] == 'red') {
        let update = shrs[10] - parseInt(bidShares);
        if(update > 0) {
            shrs[10] = update;
            buylog(bidShares,bidPrice);
        } else if(update == 0) {
            shrs[10] = 0;
            color[10] = 'gray';
            buylog(bidShares,bidPrice);
        } else if(update < 0){
            shrs[10] = 0 - update;
            color[10] = 'green';
            let botshares = bidShares - shrs[10];
            let bidshares = shrs[10];
            buylog(botshares,bidPrice);
            bidlog(bidshares,bidPrice);
        }
        myChart.update();
    }  
}

function placeOffer(){
    let askPrice = document.getElementById('askprice').value;
    let askShares = document.getElementById('askshares').value;
    let shrs = myChart.data.datasets[0].data;
    let color = myChart.data.datasets[0].backgroundColor;
    
    if (askPrice == 10 && color[0] == 'gray') {
        let update = parseInt(askShares);
        shrs[0] = update;
        color[0] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10 && color[0] == 'red') {
        let update = parseInt(askShares) + shrs[0];
        shrs[0] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10 && color[0] == 'green') {
        let update = shrs[0] - parseInt(askShares);
        if(update > 0) {
            shrs[0] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[0] = 0;
            color[0] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[0] = 0 - update;
            color[0] = 'red';
            let soldshares = askShares - shrs[0];
            let askshares = shrs[0];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
        myChart.update();
    } else if (askPrice == 10.01 && color[1] == 'gray') {
        let update = parseInt(askShares);
        shrs[1] = update;
        color[1] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.01 && color[1] == 'red') {
        let update = parseInt(askShares) + shrs[1];
        shrs[1] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.01 && color[1] == 'green') {
        let update = shrs[1] - parseInt(askShares);
        if(update > 0) {
            shrs[1] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[1] = 0;
            color[1] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[1] = 0 - update;
            color[1] = 'red';
            let soldshares = askShares - shrs[1];
            let askshares = shrs[1];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
        myChart.update();
    } else if (askPrice == 10.02 && color[2] == 'gray') {
        let update = parseInt(askShares);
        shrs[2] = update;
        color[2] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.02 && color[2] == 'red') {
        let update = parseInt(askShares) + shrs[2];
        shrs[2] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.02 && color[2] == 'green') {
        let update = shrs[2] - parseInt(askShares);
        if(update > 0) {
            shrs[2] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[2] = 0;
            color[2] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[2] = 0 - update;
            color[2] = 'red';
            let soldshares = askShares - shrs[2];
            let askshares = shrs[2];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
        myChart.update();
    } else if (askPrice == 10.03 && color[3] == 'gray') {
        let update = parseInt(askShares);
        shrs[3] = update;
        color[3] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.03 && color[3] == 'red') {
        let update = parseInt(askShares) + shrs[3];
        shrs[3] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.03 && color[3] == 'green') {
        let update = shrs[3] - parseInt(askShares);
        if(update > 0) {
            shrs[3] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[3] = 0;
            color[3] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[3] = 0 - update;
            color[3] = 'red';
            let soldshares = askShares - shrs[3];
            let askshares = shrs[3];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
        myChart.update();
    } else if (askPrice == 10.04 && color[4] == 'gray') {
        let update = parseInt(askShares);
        shrs[4] = update;
        color[4] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.04 && color[4] == 'red') {
        let update = parseInt(askShares) + shrs[4];
        shrs[4] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.04 && color[4] == 'green') {
        let update = shrs[4] - parseInt(askShares);
        if(update > 0) {
            shrs[4] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[4] = 0;
            color[4] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[4] = 0 - update;
            color[4] = 'red';
            let soldshares = askShares - shrs[4];
            let askshares = shrs[4];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
        myChart.update();
    } else if (askPrice == 10.05 && color[5] == 'gray') {
        let update = parseInt(askShares);
        shrs[5] = update;
        color[5] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.05 && color[5] == 'red') {
        let update = parseInt(askShares) + shrs[5];
        shrs[5] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.05 && color[5] == 'green') {
        let update = shrs[5] - parseInt(askShares);
        if(update > 0) {
            shrs[5] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[5] = 0;
            color[5] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[5] = 0 - update;
            color[5] = 'red';
            let soldshares = askShares - shrs[5];
            let askshares = shrs[5];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
        myChart.update();
    } else if (askPrice == 10.06 && color[6] == 'gray') {
        let update = parseInt(askShares);
        shrs[6] = update;
        color[6] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.06 && color[6] == 'red') {
        let update = parseInt(askShares) + shrs[6];
        shrs[6] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.06 && color[6] == 'green') {
        let update = shrs[6] - parseInt(askShares);
        if(update > 0) {
            shrs[6] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[6] = 0;
            color[6] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[6] = 0 - update;
            color[6] = 'red';
            let soldshares = askShares - shrs[6];
            let askshares = shrs[6];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
        myChart.update();
    } else if (askPrice == 10.07 && color[7] == 'gray') {
        let update = parseInt(askShares);
        shrs[7] = update;
        color[7] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.07 && color[7] == 'red') {
        let update = parseInt(askShares) + shrs[7];
        shrs[7] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.07 && color[7] == 'green') {
        let update = shrs[7] - parseInt(askShares);
        if(update > 0) {
            shrs[7] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[7] = 0;
            color[7] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[7] = 0 - update;
            color[7] = 'red';
            let soldshares = askShares - shrs[7];
            let askshares = shrs[7];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
        myChart.update();
    } else if (askPrice == 10.08 && color[8] == 'gray') {
        let update = parseInt(askShares);
        shrs[8] = update;
        color[8] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.08 && color[8] == 'red') {
        let update = parseInt(askShares) + shrs[8];
        shrs[8] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.08 && color[8] == 'green') {
        let update = shrs[8] - parseInt(askShares);
        if(update > 0) {
            shrs[8] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[8] = 0;
            color[8] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[8] = 0 - update;
            color[8] = 'red';
            let soldshares = askShares - shrs[8];
            let askshares = shrs[8];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
        myChart.update();
    } else if (askPrice == 10.09 && color[9] == 'gray') {
        let update = parseInt(askShares);
        shrs[9] = update;
        color[9] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.09 && color[9] == 'red') {
        let update = parseInt(askShares) + shrs[9];
        shrs[9] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.09 && color[9] == 'green') {
        let update = shrs[9] - parseInt(askShares);
        if(update > 0) {
            shrs[9] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[9] = 0;
            color[9] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[9] = 0 - update;
            color[9] = 'red';
            let soldshares = askShares - shrs[9];
            let askshares = shrs[9];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
        myChart.update();
    } else if (askPrice == 10.10 && color[10] == 'gray') {
        let update = parseInt(askShares);
        shrs[10] = update;
        color[10] = 'red';
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.10 && color[10] == 'red') {
        let update = parseInt(askShares) + shrs[10];
        shrs[10] = update;
        asklog(askShares,askPrice);
        myChart.update();
    } else if (askPrice == 10.10 && color[10] == 'green') {
        let update = shrs[10] - parseInt(askShares);
        if(update > 0) {
            shrs[10] = update;
            soldlog(askShares,askPrice);
        } else if(update == 0) {
            shrs[10] = 0;
            color[10] = 'gray';
            soldlog(askShares,askPrice);
        } else if(update < 0){
            shrs[10] = 0 - update;
            color[10] = 'red';
            let soldshares = askShares - shrs[10];
            let askshares = shrs[10];
            soldlog(soldshares,askPrice);
            asklog(askshares,askPrice);
        }
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




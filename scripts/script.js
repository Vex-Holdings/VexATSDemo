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
            data: [0,0,0,0,0,0,0,0,0,0,0],
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
    
    for(let i = 0; i < shrs.length; i++) {
        if (bidPrice == 10+(i/100) && color[i] == 'gray') {
            let update = parseInt(bidShares);
            shrs[i] = update;
            color[i] = 'green';
            bidlog(bidShares,bidPrice);
            myChart.update();
        } else if (bidPrice == 10+(i/100) && color[i] == 'green') {
            let update = parseInt(bidShares) + shrs[i];
            shrs[i] = update;
            bidlog(bidShares,bidPrice);
            myChart.update();
        } else if (bidPrice == 10+(i/100) && color[i] == 'red') {
            let update = shrs[i] - parseInt(bidShares);
            if(update > 0) {
                shrs[i] = update;
                buylog(bidShares,bidPrice);
            } else if(update == 0) {
                shrs[i] = 0;
                color[i] = 'gray';
                buylog(bidShares,bidPrice);
            } else if(update < 0){
                shrs[i] = 0 - update;
                color[i] = 'green';
                let botshares = bidShares - shrs[i];
                let bidshares = shrs[i];
                buylog(botshares,bidPrice);
                bidlog(bidshares,bidPrice);
            }
        }
    }
    myChart.update();
    limitbid();
    limitoffer();
}

function placeOffer(){
    let askPrice = document.getElementById('askprice').value;
    let askShares = document.getElementById('askshares').value;
    let shrs = myChart.data.datasets[0].data;
    let color = myChart.data.datasets[0].backgroundColor;
    
    for(let i = 0; i < shrs.length; i++) {
        if (askPrice == 10+(i/100) && color[i] == 'gray') {
            let update = parseInt(askShares);
            shrs[i] = update;
            color[i] = 'red';
            asklog(askShares,askPrice);
            myChart.update();
        } else if (askPrice == 10+(i/100) && color[i] == 'red') {
            let update = parseInt(askShares) + shrs[i];
            shrs[i] = update;
            asklog(askShares,askPrice);
            myChart.update();
        } else if (askPrice == 10+(i/100) && color[i] == 'green') {
            let update = shrs[i] - parseInt(askShares);
            if(update > 0) {
                shrs[i] = update;
                soldlog(askShares,askPrice);
            } else if(update == 0) {
                shrs[i] = 0;
                color[i] = 'gray';
                soldlog(askShares,askPrice);
            } else if(update < 0){
                shrs[i] = 0 - update;
                color[i] = 'red';
                let soldshares = askShares - shrs[i];
                let askshares = shrs[i];
                soldlog(soldshares,askPrice);
                asklog(askshares,askPrice);
            }   
        } 
    }
    myChart.update();
    limitbid();
    limitoffer();
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

function limitbid(){
    let color = myChart.data.datasets[0].backgroundColor;
    let price = myChart.data.labels;
    let isRed = (element) => element == "red";
    let i = color.findIndex(isRed);
    if(i > -1) {
        document.querySelector("#bidprice").setAttribute("value", price[i]);
        document.querySelector("#bidprice").setAttribute("max", price[i]);
        // console.log('Set max to ' + price[i]);
    } else {
        document.querySelector("#bidprice").setAttribute("max", 10.1);
    }
}

function limitoffer(){
    let color = myChart.data.datasets[0].backgroundColor;
    let price = myChart.data.labels;
    let isGreen = (element) => element == "green";
    let i = color.findLastIndex(isGreen);
    if(i > -1) {
        document.querySelector("#askprice").setAttribute("value", price[i]);
        document.querySelector("#askprice").setAttribute("min", price[i]);
        // console.log('Set min to ' + price[i]);
    } else {
        document.querySelector("#askprice").setAttribute("min", price[0]);
    }
}
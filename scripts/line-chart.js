// Array that contains the complete information of the coins
const coinsArray = [];

//Fetching API
let url = "https://my-json-server.typicode.com/dheeraj2428/coin-list/coins";

const data = fetch(url).then((value) => {
    return value.json();
}).then((value) => {

    for (let coin of value) {

        // Adding the USD price to each coins's object
        coin.usdPrice = coin.price * coin.btcPrice;

        //Populating the coins array
        coinsArray.push(coin);
    }

    //calling the makingCHartInfoArray function which collects the data for the chart to be shown
    makingChartInfoArray();

})

//This array contains all the labels (Coin Name) of the chart
const labelsArray = [];

//This array contains all data (USD Price) of the coins 
const dataArray = [];

//This function fugure outs the data for the chart
function makingChartInfoArray() {

    //Sorting the coins array to descending order to get all the names and price data in the descending order
    const sortedArray = coinsArray.sort((a, b) => {
        return b.usdPrice - a.usdPrice;
    });

    //Populating the lable array and the data array
    for (let coin of sortedArray) {
        labelsArray.push(coin.name);
        dataArray.push(coin.usdPrice);
    }

    //Calling the render chart function which shows the data on the line-chart page 
    renderChart();
}

//This function renders the chart
//To render the chart I am using a CDN from chart.js 
function renderChart() {

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {

        //setting the chart type as line chart
        type: 'line',
        data: {

            //These are the names of the coins
            labels: labelsArray,

            datasets: [{
                label: 'Line Chart Based on USD Price',

                //These are the prices of the coins 
                data: dataArray,
                borderWidth: 2,
                borderColor: 'red',
                color: '#00FCA8'
            }]
        },
        options: {
            scales: {
                y: {
                    type: 'logarithmic', // Use logarithmic scaling for y-axis
                    suggestedMin: 0, // Set the minimum value for the axis
                    suggestedMax: Math.max(...dataArray) * 2,

                    //Setting the grid color
                    grid: {
                        color: '#1CDAFF'
                    },
                    title: {
                        display: true,
                        text: 'USD Price (Logarithmic Scale)',// Y-axis label
                        color: '#00FCA8'
                    }, ticks: {
                        color: '#00FCA8' // Change x-axis tick marks color
                    }
                },
                x: {

                    //Setting the grid color
                    grid: {
                        color: '#1CDAFF'
                    },
                    title: {
                        display: true,
                        text: 'Coins', // X-axis label
                        color: '#00FCA8'
                    },
                    ticks: {
                        color: '#00FCA8' // Change x-axis tick marks color
                    }
                }
            }
        }
    });


}
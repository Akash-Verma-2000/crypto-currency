// Array that contains the complete information of the coins
const coinsArray = [];

//Fetching API
let url = "https://my-json-server.typicode.com/dheeraj2428/coin-list/coins";
let response = fetch(url);

response.then((value) => {
    return value.json();
}).then((value) => {

    for (let coin of value) {

        // Adding the USD price to each coins's object
        coin.usdPrice = coin.price * coin.btcPrice;

        //Populating the coins array
        coinsArray.push(coin);
    }

    // This function displays all the coins of the home page
    displayCoinList();
});

//This function rearrages the coins based on the user's choice (Ascending or Descending)
document.getElementById("order").addEventListener("change", displayCoinList);

// This function displays all the coin's data on the home page 
function displayCoinList() {

    // Figuring out the value of the filter (Ascending or Descending)
    const order = document.getElementById("order").value;

    // Making a copy of the coins Array using spread operator
    const sortedCoinsArray = [...coinsArray];

    // If the selected order is ascending sort the complete array in ascending order according to USD price
    if (order === "ascending") {
        sortedCoinsArray.sort((a, b) => {
            return a.usdPrice - b.usdPrice;
        })
    }

    // If the selected order id descending sort the complete array in descending order according to USD price
    else if (order === "descending") {
        sortedCoinsArray.sort((a, b) => {
            return b.usdPrice - a.usdPrice;
        })
    }

    //Preparing the string to showcase the coins on the home page 
    let coinsList = "";
    for (let coin of sortedCoinsArray) {
        coinsList += `  <div class="card p-3 col-md-4 my-3" style="width: 20rem;">
                            <img src="${coin.iconUrl}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Name: ${coin.name} </h5>
                                <p class="card-text">Symbol: ${coin.symbol}</p>
                                <p class="card-text">Price: ${coin.price}</p>
                                <p class="card-text">BTC Price: ${coin.btcPrice}</p>
                                <p class="card-text">USD Price: ${coin.usdPrice}</p>
                                <p class="card-text">Listed At: ${coin.listedAt}</p>
                            </div>
                        </div>`
    }

    //Putting the content on the home page
    document.getElementById("my-bitcoin-list").innerHTML = coinsList;
}


//This function is for the search bar of the application 
//this function works each time the user enters something in the search bar
const searchBar = document.getElementById("my-search-bar");
searchBar.addEventListener("input", () => {

    //Converting the search value to the uppercase for case insensetive search results
    const searchBarValue = searchBar.value.toUpperCase();
    const resultArray = coinsArray.filter((coin) => {
        if (searchBarValue == "") {
            return null;
        }

        //Checking if the coin name contains the search value in it
        //if it contains the search value the put it in the resultArray 
        return coin.name.toUpperCase().indexOf(searchBarValue) > -1;
    });

    //Preparing the string to showcase the search results on the home page
    let searchCoins = "";
    for (let coin of resultArray) {
        searchCoins += ` <div class="card p-3 col-md-4 my-3" style="width: 20rem;">
                            <img src="${coin.iconUrl}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Name: ${coin.name} </h5>
                                <p class="card-text">Symbol: ${coin.symbol}</p>
                                <p class="card-text">Price: ${coin.price}</p>
                                <p class="card-text">BTC Price: ${coin.btcPrice}</p>
                                <p class="card-text">USD Price: ${coin.price * coin.btcPrice}</p>
                                <p class="card-text">Listed At: ${coin.listedAt}</p>
                            </div>
                        </div>`
    }
     //Showcasing the search results on the home page
    document.getElementById("my-search-result").innerHTML = searchCoins;

})













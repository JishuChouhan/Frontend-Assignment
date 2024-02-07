let ctx = document.getElementById('chart').getContext('2d');

let chart;

const initial_data = {
    labels: [],
    datasets: [
        {
            label: "Coin Price",
            data: [],
            borderColor: "lightGreen",
            borderWidth: 1,
            fill: false,
        }
    ]
}

let chart_Value = {
    type: 'line',
    data: initial_data,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
        animation: false,
    }
}

chart = new Chart(ctx, chart_Value);

// async function getDataFromApi() {
//     try{
//         const res = await fetch('https://api.coingecko.com/api/v3/search/trending');
//         const data = await res.json();
//         console.log(parseFloat(data.coins[1].item.data.price_btc) * 43061 * 80);

//         let chart_data = parseFloat(data.coins[chart.data.labels.length].item.data.price_btc) * 43061 * 80;

//         chart.data.datasets.push(chart.data.labels.length);
//         chart.data.datasets[0].data.push(chart_data);

//         chart.update();
//     }
//     catch(error){
//         console.log(error);
//     }
// }

// function addData(){
//     try{
//         let chart_data = Maths.random() * 100;

//         chart.data.labels.push(chart.data.labels.length)
//         chart.data.datasets[0].data.push(chart_data)
//         chart.update();
//     }
//     catch(error){
//         console.log(error);
//     }
// }

function addData() {
    const newData = Math.random() * 100; // Generate random data
    chart.data.labels.push(chart.data.labels.length);
    chart.data.datasets[0].data.push(newData);
    chart.update(); // Update the chart
}

// Add data at regular intervals (e.g., every 1 second)
setInterval(addData, 1000);

// setInterval(getDataFromApi, 1000);
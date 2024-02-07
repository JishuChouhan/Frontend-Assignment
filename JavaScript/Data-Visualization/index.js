const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Monthly Sales',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [85, 48, 66, 57, 95, 30, 50, 70, 20, 90, 10, 100],
    }],
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugnis: {
            title: {
                display: true,
                text: 'Monthly Sales Data',
            },
        },
    },
};

const ctx = document.getElementById("chart").getContext('2d');
const myChart = new Chart(ctx, config);

myChart.options.plugnis.tooltip = {
    callbacks: {
        label: function(context){
            return `Sales: ${context.parsed.y}`;
        },
    },
};

const chartAnimation = anime({
    targets: myChart.data.datasets[0].data,
    easing: 'linear',
    delay: anime.stagger(200),
    duration: 1000,
    loop: true,
    direction: 'alternate',
    update: function(anim){
        myChart.update();
    },
})
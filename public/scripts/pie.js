window.onload = function () {
        
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "State Operating Funds"
        },
        legend:{
            cursor: "pointer",
        },
        data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "{name}: <strong>{y}%</strong>",
            indexLabel: "{name} - {y}%",
            dataPoints: [
                { y: 26, name: "School Aid" },
                { y: 20, name: "Medical Aid" },
                { y: 5, name: "Debt/Capital" },
                { y: 3, name: "Elected Officials" },
            ]
        }]
    });
    chart.render();
    }
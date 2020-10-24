// Read the JSON file 
d3.json("samples.json").then((importedData) => {
    console.log(importedData);
    let data = importedData;
    console.log(data);
    let names = data.names;
    names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    })
});

// set data to variables with a default id
function plotData() {
    d3.json("samples.json").then((data) => {
        console.log(data)

        defaultData = data.samples.filter(sample => sample.id === "940")[0];
        console.log(defaultData);

        defaultValues = defaultData.sample_values.slice(0, 10).reverse();
        defaultIDs = defaultData.otu_ids.slice(0, 10).reverse();
        defaultLabel = defaultData.otu_labels.slice(0, 10).reverse();

        console.log(defaultValues);
        console.log(defaultIDs);
        console.log(defaultLabel);

        // create bar chart
        let barTrace = {
            x: defaultValues,
            y: defaultIDs.map(defaultIDs => `OTU ${defaultIDs}`),
            text: defaultLabel,
            type: "bar",
            orientation: "h"
        };

        let barData = [barTrace];

        let barLayout = {
            title: "Top 10 OTUs",
            yaxis: {
                tickmode: "linear"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        Plotly.newPlot("bar", barData, barLayout);

        // create bubble chart
        let bubbleTrace = {
            x: defaultIDs,
            y: defaultValues,
            text: defaultLabel,
            mode: "markers",
            marker: {
                color: defaultIDs,
                size: defaultValues
            }
        };

        let bubbleData = [bubbleTrace];

        let bubbleLayout = {
            title: "Top 10 OTUs",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" },
            showlegend: false,
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });

    // show demographic info
    d3.json("samples.json").then((data) => {
        console.log(data);

        defaultDemo = data.metadata.filter(sample => sample.id === 940)[0];
        console.log(defaultDemo);

        Object.entries(defaultDemo).forEach(
            ([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
        )
    });
};

d3.select("#selDataset").on("change", updatePlotly);

// Update plots when ID changes
function updatePlotly() {
    d3.json("samples.json").then((data) => {
        console.log(data);

        let inputElement = d3.select("#selDataset");
        let inputValue = inputElement.property("value");

        console.log(inputValue);

        dataset = data.samples.filter(sample => sample.id === inputValue)[0];
        console.log(dataset);

        allValues = dataset.sample_values;
        allIds = dataset.otu_ids;
        allLabels = dataset.otu_labels;

        top10Values = allValues.slice(0, 10).reverse();
        top10Ids = allIds.slice(0, 10).reverse();
        top10Labels = allLabels.slice(0, 10).reverse();

        Plotly.restyle("bar", "x", [top10Values]);
        Plotly.restyle("bar", "y", [top10Ids.map(defaultIDs => `OTU ${defaultIDs}`)]);
        Plotly.restyle("bar", "text", [top10Labels]);
    })
};

function init() {
    let inputSelection = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        inputSelection.append("option").text("sample").property("value")
    });

    let initialSample = inputSelection;
    plotData(initialSample);
    updatePlotly(initialSample);
};

init();

function optionChanged(newSample) {
    plotData(newSample);
    updatePlotly(newSample);
};


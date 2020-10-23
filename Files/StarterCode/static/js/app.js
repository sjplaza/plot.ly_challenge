// Read the JSON file 
d3.json("samples.json").then((importedData) => {
    let names = importedData.names;
    names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    })
});

// set data to variables with a default id
function init() {
    defaultData = importedData.samples.filter(sample => sample.id === "940")[0];
    defaultValues = defaultData.sample_values;
    defaultID = defaultData.otu_ids;
    defaultLabel = defaultData.otu_labels;

    // display the top 10 OTUs for default ID
    sampleValues = defaultValues.slice(0, 10).reverse();
    otuIds = defaultID.slice(0, 10).reverse();
    otuLabels = defaultLabel.slice(0, 10).reverse();

    // create bar chart for default ID
    let barTrace = {
        x: sampleValues,
        y: otuIds.map(outId => `OTU ${otuId}`),
        text: otuLabels,
        type: "bar",
        orientation: "h"
    };

    let barData = [barTrace];

    let barLayout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU Id" },
    };

    Plotly.newPlot("bar", barData, barLayout);
}

init();

d3.select("#selDataset").on("change", updatePlotly);

// Update plots when ID changes
function updatePlotly() {
    let inputElement = d3.select("#selDataset");
    let inputValue = inputElement.property("value");

    dataset = importedData.samples.filter(sample => sample.id === inputValue)[0];

    allValues = dataset.sample_values;
    allIds = dataset.otu_ids;
    allLabels = dataset.otu_labels;

    top10Values = allValues.slice(0, 10).reverse();
    top10Ids = allIds.slice(0, 10).reverse();
    top10Labels = allLabels.slice(0, 10).reverse();

    Plotly.restyle("bar", "x", [top10Values]);
    Plotly.restyle("bar", "y", [top10Ids.map(outId => `OTU ${otuId}`)]);
    Plotly.restyle("bar", "text", [top10Labels]);

}
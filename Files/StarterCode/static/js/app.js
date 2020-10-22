function updatePlotly(id) {
    d3.json("samples.json").then((data) => {
        let ids = data.samples[0].otu_ids;
        let sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
        let labels = data.samples[0].otu_labels.slice(0, 10);
    })
};

function getTestSubject(id) {
    d3.json("samples.json").then((data) => {
        let metadata = data.metadata;
        let results = metadata.filter(meta => meta.id.toString() === id)[0];
        let demographics = d3.select("#sample-metadata");
        demographics.html("");
    })
};


console.log(updatePlotly);

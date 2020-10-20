// use the D3 library to read json file
d3.json("data/samples.json").then(function (data) {
    let ids = data.out_ids;
    let labels = data.otu_labels;
    let x = data.sample_values;
    let y = data.otu_labels
});

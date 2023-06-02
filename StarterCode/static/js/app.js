// Define the URL for the JSON file
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

loadOptions();
// Display the sample metadata, i.e., an individual's demographic information.
demographic(0);
top10data();
function loadOptions() {
  d3.json(url).then(data => {
    var options = data.names;
    var select = document.getElementById("selDataset");
    for (var i = 0; i < options.length; i++) {
      var option = document.createElement("option");
      option.text = options[i];
      select.add(option);
    }
  }).catch(error => {
    console.log('Error loading data:', error);
  })
}

// Display the sample metadata, i.e., an individual's demographic information. Display each key-value pair from the metadata JSON object somewhere on the page.
function demographic(selectedMetadataIndex) {
  d3.json(url).then(data => {
    const metadata = data.metadata; // Access the metadata from the JSON response
    console.log(metadata[selectedMetadataIndex]);
    // Select the metadata element using its id
    const metadataElement = d3.select("#sample-metadata");
    // Clear the existing contents (if any)
    metadataElement.html("");
    // Iterate over the metadata object and append the information to the element
    Object.entries(metadata[selectedMetadataIndex]).forEach(([key, value]) => {
      metadataElement
        .append("p")
        .text(`${key}: ${value}`);
    });
  });
}
// Update all the plots when a new sample is selected:
// function optionChanged(selectedId) {
//   d3.json(url).then(data => {
//     const metadata = data.metadata;
//     selectedMetadataIndex = findValue(metadata, parseInt(selectedId));
//     demographic(selectedMetadataIndex)});
// };
function optionChanged(selectedId) {
  // Update the demographic information
  demographic(parseInt(selectedId));
  // Update the bar chart
  updateBarChart(selectedId);
  // Update the bubble chart
  updateBubbleChart(selectedId);
}


function findValue(metadata, target) {
  for (let i = 0; i < metadata.length; i++) {
    if (metadata[i].id === target) {
      return i; // Match found
    }
  }
  return -1; // Match not found
}
function top10data() {
  // Use D3 to make the AJAX request
  d3.json(url).then(data => {
    const samples = data.samples;
    // Get the top 10 OTUs
    const top10OTUs = samples[0].sample_values.slice(0, 10);
    const top10IDs = samples[0].otu_ids.slice(0, 10);
    const top10Labels = samples[0].otu_labels.slice(0, 10);
    // Create the trace object
    const trace = {
      x: top10OTUs,
      y: top10IDs.map(id => `OTU ${id}`),
      type: 'bar',
      orientation: 'h',
    };
    // Create the data array
    const top10data = [trace];
    // Create the layout object
    const layout = {
      title: 'Top 10 OTUs',
      xaxis: {
        title: 'Sample Values',
      },
      yaxis: {
        title: 'OTU IDs',
        automargin: true,
      },
    };
    // Plot the chart
    Plotly.newPlot('plot', top10data, layout);
  }).catch(error => {
    console.log('Error loading data:', error);
  })
};

function updateBarChart(selectedSample) {
  d3.json(url).then(data => {
    const samples = data.samples;
    // Find the selected sample
    const selectedSampleData = samples.find(sample => sample.id === selectedSample);
    // Get the top 10 OTUs for the selected sample
    const top10OTUs = selectedSampleData.sample_values.slice(0, 10);
    const top10IDs = selectedSampleData.otu_ids.slice(0, 10);
    const top10Labels = selectedSampleData.otu_labels.slice(0, 10);
    // Update the trace object
    const updatedTrace = {
      x: top10OTUs,
      y: top10IDs.map(id => `OTU ${id}`),
      type: 'bar',
      orientation: 'h',
    };
    // Update the data array
    const updatedData = [updatedTrace];
    // Update the layout object (if needed)
    const updatedLayout = {
      title: 'Top 10 OTUs',
      xaxis: {
        title: 'Sample Values',
      },
      yaxis: {
        title: 'OTU IDs',
        automargin: true,
      },
    };
    // Update the chart
    Plotly.newPlot('plot', updatedData, updatedLayout);
  }).catch(error => {
    console.log('Error loading data:', error);
  });
}

// Use D3 to make the AJAX request
d3.json(url).then(data => {
  const samples = data.samples;
  const otuIDs = samples[0].otu_ids;
  const sampleValues = samples[0].sample_values;
  const otuLabels = samples[0].otu_labels;
  // Create the trace object
  const trace = {
    x: otuIDs,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampleValues,
      color: otuIDs,
      colorscale: 'Viridis',
    },
  };
  // Create the data array
  const bubbledata = [trace];
  // Create the layout object
  const layout = {
    title: 'Bubble Chart',
    xaxis: {
      title: 'OTU IDs',
    },
    yaxis: {
      title: 'Sample Values',
    },
    showlegend: false,
  };
  // Plot the chart
  Plotly.newPlot('plot2', bubbledata, layout);
}).catch(error => {
  console.log('Error loading data:', error);
});
function updateBubbleChart(selectedSample) {
  d3.json(url).then(data => {
    const samples = data.samples;
    // Find the selected sample
    const selectedSampleData = samples.find(sample => sample.id === selectedSample);
    const otuIDs = selectedSampleData.otu_ids;
    const sampleValues = selectedSampleData.sample_values;
    const otuLabels = selectedSampleData.otu_labels;
    // Update the trace object
    const updatedTrace = {
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: 'Viridis',
      },
    };
    // Update the data array
    const updatedData = [updatedTrace];
    // Update the layout object (if needed)
    const updatedLayout = {
      title: 'Bubble Chart',
      xaxis: {
        title: 'OTU IDs',
      },
      yaxis: {
        title: 'Sample Values',
      },
      // height: 600,
      // width: 600,
      showlegend: false,
    };
    // Update the chart
    Plotly.newPlot('plot2', updatedData, updatedLayout);
  }).catch(error => {
    console.log('Error loading data:', error);
  });
}

// Add an event listener to the dropdown menu
document.getElementById("selDataset").addEventListener("change", function() {
  const selectedSample = this.value;
  optionChanged(selectedSample);
});

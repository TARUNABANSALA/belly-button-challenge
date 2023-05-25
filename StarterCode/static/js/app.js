npm init -y

// Import the D3 library
import * as d3 from 'd3'

// Define the URL for the JSON file
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Use D3 to make the AJAX request
d3.json(url).then(function(data) {
  // Access the JSON data
  console.log(data);
}).catch(function(error) {
  // Handle any errors that occur during the request
  console.error('Error loading the JSON file:', error);
});

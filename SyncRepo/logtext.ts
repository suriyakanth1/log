import fetch from 'node-fetch';
const owner = 'suriyakanth1';
const repo = 'sample';
const runId = 7406288154; // Replace with the actual workflow run ID
const token = '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';
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/logs`;

const options = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3.raw+json',
  },
};

fetch(apiUrl, options)
  .then(response => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response.text());
    return response.text();
  })
  .then(logContent => {
    // Handle the log content
    console.log(logContent);
  })
  .catch(error => {
    // Handle errors
    console.error('Fetch error:', error);
  });

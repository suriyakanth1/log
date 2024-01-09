const axios = require('axios');

// Replace these values with your GitHub repository details and a personal access token
const owner = 'suriyakanth1';
const repo = 'sample';
const runId = 7406288154; // Replace with the actual run ID

const token = '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';

async function getWorkflowLog() {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/logs`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      maxRedirects: 5,
    });
    console.log('Workflow Log:\n', response.data.text);
    if (response.data && response.data.getWorkflowLog) {
      console.log('Workflow Log:\n', response.data.text);
    } else {
      console.error('Failed to fetch workflow logs.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getWorkflowLog();

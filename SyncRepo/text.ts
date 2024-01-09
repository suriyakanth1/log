import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';
const AdmZip = require("adm-zip");
const fs = require('fs');

// Replace these values with your GitHub repository details
const owner = 'suriyakanth1';
const repo = 'sample';
const workflowRunId = 7406288154; // Replace with the actual workflow run ID

// Replace this value with your GitHub personal access token
const token = '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';

// Initialize Octokit
const octokit = new Octokit({
  auth: token,
  request: {
    fetch,
  }, params: {
    job_id: 20155661838,
  },
});

// Function to get the workflow run details
async function getWorkflowRunDetails() {
  try {
    const response = await octokit.actions.getWorkflowRun({
      owner,
      repo,
      run_id: Number(workflowRunId),
    });

    // Extract log URL from the response
    const logUrl = response.data?.logs_url;
    console.log('Workflow logUrl:\n', logUrl);

    // Make a request to the log URL to get the raw log content
    const logResponse = await octokit.request('GET ' + logUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(logResponse.data)
    console.log("inoverked")
    const zip = new AdmZip(logResponse.data);
    const zipEntries = zip.getEntries();
    console.log("zipEntries",zipEntries);

   zipEntries.forEach((zipEntry:any) => {
  if (!zipEntry.isDirectory) {
    const entryContent = zip.readAsText(zipEntry);
    console.log("inoverked",entryContent);
  }
});


const uint8Array = new Uint8Array(logResponse.data);
const textDecoder = new TextDecoder('utf-8'); // Specify the encoding
const decodedString = textDecoder.decode(uint8Array);
   //Log the workflow log content to the console
    console.log('Workflow Log Content:\n', logResponse.data);
   
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to get the workflow run details
getWorkflowRunDetails();

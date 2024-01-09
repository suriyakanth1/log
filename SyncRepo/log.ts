const AdmZip = require("adm-zip");
import axios from 'axios';


async function getWorkflowRunLog(owner: string, repo: string, runId: number): Promise<string> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/logs`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer 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`,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching workflow run log:', error);
    throw error;
  }
}
// Replace 'OWNER', 'REPO', and 'RUN_ID' with your GitHub repository details
const owner = 'suriyakanth1';
const repo = 'sample';
const runId = 7406288154; // Replace with the actual run ID

// Call the function to get the workflow run log
getWorkflowRunLog(owner, repo, runId)
  .then((workflowLog) => {
    //console.log('Workflow Run Log:', workflowLog);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

/*
import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';

async function getWorkflowRunLogs(owner: string, repo: string, runId: number): Promise<void> {
  const octokit = new Octokit({
    auth: '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', // Replace with your personal access token
    request: {
        fetch,
      },
  });


  try {
    // Get workflow run logs
    const { data: workflowLogs } = await octokit.actions.getWorkflowRun({
      owner,
      repo,
      run_id: runId,
    });

    console.log('Workflow Run Logs:', workflowLogs);
  } catch (error) {
    console.error('Error fetching workflow run logs:', error);
  }
}

// Replace 'OWNER', 'REPO', and 'RUN_ID' with your GitHub repository details
const owner = 'suriyakanth1';
const repo = 'sample';
const runId = 7406288154; // Replace with the actual run ID
 // Replace with the actual run ID

// Call the function to get the workflow run logs
getWorkflowRunLogs(owner, repo, runId);
*/

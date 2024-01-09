import axios from 'axios';

interface WorkflowLogs {
  logs: string;
  error: string;
}

const getWorkflowLogs = async (owner: string, repo: string, runId: number): Promise<WorkflowLogs> => {
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/logs`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
      },
    });

    return { logs: response.data, error: '' };
  } catch (error) {
    return { logs: '', error: 'Failed to fetch logs.' };
  }
};

// Example usage:
const owner = 'suriyakanth1';
const repo = 'cicd-sample';
const runId = 7446276225; // Replace with the actual run ID

try {
  const { logs, error } = await getWorkflowLogs(owner, repo, runId);
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Logs:', logs);
  }
} catch (error) {
  console.error('Error:', error);
}


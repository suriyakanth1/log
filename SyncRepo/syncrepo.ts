// getRepositories.ts
import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';
const express = require('express');


// GitHub access token
const token = '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';
const owner = 'suriyakanth1';
const orgName = 'hariniaaludra';

//for webhook
const app = express();
const port = 3006;
const webhookUrl = 'https://devapi-esko.cloudmatiq.com/cloudmatiq/base/webhook/test';
app.use(express.json());




// Function to get a list of repositories
async function getRepositories() {
  const octokit = new Octokit({
    auth: token,
    request: {
      fetch,
    },
  });


  try {
    // Get the list of repositories for the authenticated user
    const { data: repositories } = await octokit.repos.listForUser(
        {username:owner}
    );
    console.log(repositories.length);
    const { data: organ } = await octokit.repos.listForOrg({
        org: orgName,
      });

   

     for (const repo of organ) {
        // Display repository names
            console.log("OrganizationName:"+repo.name);
 
          // Get the list of branches for each repository
          const { data: branches } = await octokit.repos.listBranches({
             owner:orgName,
             repo:repo.name,
          });
          // Display branch names
        console.log(`Branches for ${owner}/${repo.name}:`);
        branches.forEach((branch) => {
          console.log(branch.name);
        });
        }

    for (const repo of repositories) {
        // Display repository names
            console.log("Repository name:",repo.name);
 
          // Get the list of branches for each repository
          const { data: branches } = await octokit.repos.listBranches({
            owner,
            repo:repo.name,
          });
          // Display branch names
        console.log(`Branches for ${owner}/${repo.name}:`);
        branches.forEach((branch) => {
        console.log(branch.name);
        });

            app.listen(port, () => {
             console.log(`Server is running at http://localhost:${port}`);
          });

          
/*  const { data: webhook } = await octokit.repos.createWebhook({
            owner,
            repo:repo.name,
            name: 'web',
            active: true,
            events: ['push'],
            config: {
              url: webhookUrl,
              content_type: 'json',
            },
          });*/

          const response = await octokit.rest.repos.createWebhook({
            owner,
            repo:repo.name,
            name: 'web',
            config: {
              url: webhookUrl, // Replace with your actual webhook endpoint
              content_type: 'json',
            },
            events: ['workflow_run'],
            active: true,
          });

        }
        
  } catch (error:any) {
    console.error('Error getting repositories:', error.message);
  }
}

// Run the function
getRepositories();







  
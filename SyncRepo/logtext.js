"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var owner = 'suriyakanth1';
var repo = 'sample';
var runId = 7406288154; // Replace with the actual workflow run ID
var token = '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';
var apiUrl = "https://api.github.com/repos/".concat(owner, "/").concat(repo, "/actions/runs/").concat(runId, "/logs");
var options = {
    method: 'GET',
    headers: {
        'Authorization': "Bearer ".concat(token),
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3.raw+json',
    },
};
(0, node_fetch_1.default)(apiUrl, options)
    .then(function (response) {
    // Check if the request was successful
    if (!response.ok) {
        throw new Error("HTTP error! Status: ".concat(response.status));
    }
    console.log(response.text());
    return response.text();
})
    .then(function (logContent) {
    // Handle the log content
    console.log(logContent);
})
    .catch(function (error) {
    // Handle errors
    console.error('Fetch error:', error);
});

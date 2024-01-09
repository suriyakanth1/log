"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rest_1 = require("@octokit/rest");
var node_fetch_1 = require("node-fetch");
var AdmZip = require("adm-zip");
var fs = require('fs');
// Replace these values with your GitHub repository details
var owner = 'suriyakanth1';
var repo = 'sample';
var workflowRunId = 7406288154; // Replace with the actual workflow run ID
// Replace this value with your GitHub personal access token
var token = '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';
// Initialize Octokit
var octokit = new rest_1.Octokit({
    auth: token,
    request: {
        fetch: node_fetch_1.default,
    }, params: {
        job_id: 20155661838,
    },
});
// Function to get the workflow run details
function getWorkflowRunDetails() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, logUrl, logResponse, zip_1, zipEntries, uint8Array, textDecoder, decodedString, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, octokit.actions.getWorkflowRun({
                            owner: owner,
                            repo: repo,
                            run_id: Number(workflowRunId),
                        })];
                case 1:
                    response = _b.sent();
                    logUrl = (_a = response.data) === null || _a === void 0 ? void 0 : _a.logs_url;
                    console.log('Workflow logUrl:\n', logUrl);
                    return [4 /*yield*/, octokit.request('GET ' + logUrl, {
                            headers: {
                                Authorization: "Bearer ".concat(token),
                            },
                            params: {
                                job_id: 20155661838,
                            },
                        })];
                case 2:
                    logResponse = _b.sent();
                    console.log(logResponse.data);
                    console.log("inoverked");
                    zip_1 = new AdmZip(logResponse.data);
                    zipEntries = zip_1.getEntries();
                    console.log("zipEntries", zipEntries);
                    zipEntries.forEach(function (zipEntry) {
                        if (!zipEntry.isDirectory) {
                            var entryContent = zip_1.readAsText(zipEntry);
                            console.log("inoverked", entryContent);
                        }
                    });
                    uint8Array = new Uint8Array(logResponse.data);
                    textDecoder = new TextDecoder('utf-8');
                    decodedString = textDecoder.decode(uint8Array);
                    //Log the workflow log content to the console
                    console.log('Workflow Log Content:\n', logResponse.data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Call the function to get the workflow run details
getWorkflowRunDetails();

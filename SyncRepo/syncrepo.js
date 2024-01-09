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
// getRepositories.ts
var rest_1 = require("@octokit/rest");
var node_fetch_1 = require("node-fetch");
var express = require('express');
// GitHub access token
var token = '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';
var owner = 'suriyakanth1';
var orgName = 'hariniaaludra';
//for webhook
var app = express();
var port = 3006;
var webhookUrl = 'https://devapi-esko.cloudmatiq.com/cloudmatiq/base/webhook/test';
app.use(express.json());
// Function to get a list of repositories
function getRepositories() {
    return __awaiter(this, void 0, void 0, function () {
        var octokit, repositories, organ, _i, organ_1, repo, branches, _a, repositories_1, repo, branches, response, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    octokit = new rest_1.Octokit({
                        auth: token,
                        request: {
                            fetch: node_fetch_1.default,
                        },
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 13, , 14]);
                    return [4 /*yield*/, octokit.repos.listForUser({ username: owner })];
                case 2:
                    repositories = (_b.sent()).data;
                    console.log(repositories.length);
                    return [4 /*yield*/, octokit.repos.listForOrg({
                            org: orgName,
                        })];
                case 3:
                    organ = (_b.sent()).data;
                    _i = 0, organ_1 = organ;
                    _b.label = 4;
                case 4:
                    if (!(_i < organ_1.length)) return [3 /*break*/, 7];
                    repo = organ_1[_i];
                    // Display repository names
                    console.log("OrganizationName:" + repo.name);
                    return [4 /*yield*/, octokit.repos.listBranches({
                            owner: orgName,
                            repo: repo.name,
                        })];
                case 5:
                    branches = (_b.sent()).data;
                    // Display branch names
                    console.log("Branches for ".concat(owner, "/").concat(repo.name, ":"));
                    branches.forEach(function (branch) {
                        console.log(branch.name);
                    });
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    _a = 0, repositories_1 = repositories;
                    _b.label = 8;
                case 8:
                    if (!(_a < repositories_1.length)) return [3 /*break*/, 12];
                    repo = repositories_1[_a];
                    // Display repository names
                    console.log("Repository name:", repo.name);
                    return [4 /*yield*/, octokit.repos.listBranches({
                            owner: owner,
                            repo: repo.name,
                        })];
                case 9:
                    branches = (_b.sent()).data;
                    // Display branch names
                    console.log("Branches for ".concat(owner, "/").concat(repo.name, ":"));
                    branches.forEach(function (branch) {
                        console.log(branch.name);
                    });
                    app.listen(port, function () {
                        console.log("Server is running at http://localhost:".concat(port));
                    });
                    return [4 /*yield*/, octokit.rest.repos.createWebhook({
                            owner: owner,
                            repo: repo.name,
                            name: 'web',
                            config: {
                                url: webhookUrl, // Replace with your actual webhook endpoint
                                content_type: 'json',
                            },
                            events: ['workflow_run'],
                            active: true,
                        })];
                case 10:
                    response = _b.sent();
                    _b.label = 11;
                case 11:
                    _a++;
                    return [3 /*break*/, 8];
                case 12: return [3 /*break*/, 14];
                case 13:
                    error_1 = _b.sent();
                    console.error('Error getting repositories:', error_1.message);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
// Run the function
getRepositories();

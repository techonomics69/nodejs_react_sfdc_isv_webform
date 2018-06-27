let force = require('nforce');

const username = process.env.SALESFORCE_USERNAME;
const password = process.env.SALESFORCE_PASSWORD;
const clientId = process.env.SALESFORCE_CLIENT_ID;
const clientSecret = process.env.SALESFORCE_CLIENT_SECRET;
const securityToken = process.env.SALESFORCE_SECURITY_TOKEN;

if (!clientId) { missing("SALESFORCE_CLIENT_ID"); }
if (!clientSecret) { missing("SALESFORCE_CLIENT_SECRET"); }


let org = force.createConnection({
    clientId,
    clientSecret,
    environment: (process.env.NODE_ENV == "production" ? "production" : "sandbox"),
    redirectUri: "http://localhost:3000/oauth/_callback",
    mode: "single",
    version: "40.0",
    autoRefresh: true
});


module.exports = { org, force };
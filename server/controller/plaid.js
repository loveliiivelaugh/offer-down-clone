//refer to docs
//? https://plaid.com/docs/quickstart/#quickstart-setup
const plaid = require('plaid');
require('dotenv');

// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
const plaidClient = new plaid.Client({
  clientID: "5f24224a1a28650011da0ed6" || process.env.PLAID_CLIENT_ID,
  secret: "86c0f5e0f5b785f1f25c60e278c738" || process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
  options: {
    version: '2020-09-14',
  },
});

module.exports = plaidClient;
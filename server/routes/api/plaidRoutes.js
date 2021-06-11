const express = require('express');
const router = express.Router();
const client = require('../../controller/plaid.js');
const User = require('../../models/User.js');


// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;

let PLAID_COUNTRY_CODES = "US";//Or any supported country (US, CA, ES, FR, GB, IE, NL)
PLAID_REDIRECT_URI="http://localhost:3000/";

router.post('/api/info', (request, response, next) => {
  response.json({
    item_id: ITEM_ID,
    access_token: ACCESS_TOKEN,
    products: ["auth"]
  });
});

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
router.post('/create_link_token', (request, response, next) => {
  console.log("This token route is being tapped.")
  const configs = {
    'user': {
      // This should correspond to a unique id for the current user.
      'client_user_id': 'user-id',
    },
    'client_name': "Plaid Quickstart",
    'products': ["auth"],
    'country_codes': ['US'],
    'language': "en",
  };

  if (PLAID_REDIRECT_URI !== '') {
    configs.redirect_uri = PLAID_REDIRECT_URI;
  }
  
  client.createLinkToken(configs, (error, createTokenResponse) => {
      if (error != null) {
        console.log(error);
        return response.json({
          error: error,
        });
      }
      response.json(createTokenResponse);
  });
});

router.post('/exchange_public_token', async (request, response) => {
  try {
    const publicToken = request.body.public_token;
    // Exchange the client-side public_token for a server access_token
    const tokenResponse = await client.exchangePublicToken(publicToken);
    // Save the access_token and item_id to a persistent database
    const accessToken = tokenResponse.access_token;
    const itemId = tokenResponse.item_id;

    // User.findOneAndUpdate({ _id: request.body.id }, { $set: { 
    //   plaid_accessToken: accessToken,
    //   plaid_itemId: itemId
    // }}, (err, doc, res) => {
    //   if (err) throw err;

    //   console.info(doc, res, err);

      // err 
      //   ? res.status(500).json({ error: err }) 
      //   : res.status(200).json(res);
    // });
    
    console.log({ item: itemId, token: accessToken });
    res.status(200).json({ item: itemId, token: accessToken });
  } catch (e) {
    // Display error on client
    return response.status(500).json({ error: e.message });
  }
});

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#payment-initiation-create-link-token-request
router.post('/api/create_link_token_for_payment', function(request, response, next) {
    client.createPaymentRecipient(
      'Harry Potter',
      'GB33BUKB20201555555555',
      {
        'street':      ['4 Privet Drive'],
        'city':        'Little Whinging',
        'postal_code': '11111',
        'country':     'GB'
      },
      function(error, createRecipientResponse) {
        const recipientId = createRecipientResponse.recipient_id

        client.createPayment(
          recipientId,
          'payment_ref',
          {
            'value': 12.34,
            'currency': 'GBP'
          },
          function(error, createPaymentResponse) {
            prettyPrintResponse(createPaymentResponse)
            const paymentId = createPaymentResponse.payment_id
            PAYMENT_ID = paymentId;
            const configs = {
              'user': {
                // This should correspond to a unique id for the current user.
                'client_user_id': 'user-id',
              },
              'client_name': "Plaid Quickstart",
              'products': PLAID_PRODUCTS,
              'country_codes': PLAID_COUNTRY_CODES,
              'language': "en",
              'payment_initiation': {
              'payment_id': paymentId
              }
            };
            if (PLAID_REDIRECT_URI !== '') {
              configs.redirect_uri = PLAID_REDIRECT_URI;
            }
            client.createLinkToken(
            {
              'user': {
                 // This should correspond to a unique id for the current user.
                'client_user_id': 'user-id',
              },
              'client_name': "Plaid Quickstart",
              'products': PLAID_PRODUCTS,
              'country_codes': PLAID_COUNTRY_CODES,
              'language': "en",
              'redirect_uri': PLAID_REDIRECT_URI,
              'payment_initiation': {
                'payment_id': paymentId
              }
            }, function(error, createTokenResponse) {
              if (error != null) {
                prettyPrintResponse(error);
                return response.json({
                  error: error,
                });
              }
              response.json(createTokenResponse);
            })
          }
        )
      }
    )
});

// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
router.get('/api/accounts', function(request, response, next) {
  client.getAccounts(ACCESS_TOKEN, function(error, accountsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(accountsResponse);
    response.json(accountsResponse);
  });
});

// Retrieve ACH or ETF Auth data for an Item's accounts
// https://plaid.com/docs/#auth
router.get('/api/auth', function(request, response, next) {
  client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(authResponse);
    response.json(authResponse);
  });
});

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
router.get('/api/transactions', function(request, response, next) {
  // Pull transactions for the Item for the last 30 days
  const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
  client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0,
  }, function(error, transactionsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    } else {
      prettyPrintResponse(transactionsResponse);
      response.json(transactionsResponse);
    }
  });
});

// Retrieve Identity for an Item
// https://plaid.com/docs/#identity
router.get('/api/identity', function(request, response, next) {
  client.getIdentity(ACCESS_TOKEN, function(error, identityResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(identityResponse);
    response.json({identity: identityResponse.accounts});
  });
});

// Retrieve real-time Balances for each of an Item's accounts
// https://plaid.com/docs/#balance
router.get('/api/balance', function(request, response, next) {
  client.getBalance(ACCESS_TOKEN, function(error, balanceResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(balanceResponse);
    response.json(balanceResponse);
  });
});


// Retrieve Holdings for an Item
// https://plaid.com/docs/#investments
router.get('/api/holdings', function(request, response, next) {
  client.getHoldings(ACCESS_TOKEN, function(error, holdingsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(holdingsResponse);
    response.json({error: null, holdings: holdingsResponse});
  });
});

// Retrieve Investment Transactions for an Item
// https://plaid.com/docs/#investments
router.get('/api/investment_transactions', function(request, response, next) {
  const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
  client.getInvestmentTransactions(ACCESS_TOKEN, startDate, endDate, function(error, investmentTransactionsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(investmentTransactionsResponse);
    response.json({error: null, investment_transactions: investmentTransactionsResponse});
  });
});

// Create and then retrieve an Asset Report for one or more Items. Note that an
// Asset Report can contain up to 100 items, but for simplicity we're only
// including one Item here.
// https://plaid.com/docs/#assets
router.get('/api/assets', function(request, response, next) {
  // You can specify up to two years of transaction history for an Asset
  // Report.
  const daysRequested = 10;

  // The `options` object allows you to specify a webhook for Asset Report
  // generation, as well as information that you want included in the Asset
  // Report. All fields are optional.
  const options = {
    client_report_id: 'Custom Report ID #123',
    // webhook: 'https://your-domain.tld/plaid-webhook',
    user: {
      client_user_id: 'Custom User ID #456',
      first_name: 'Alice',
      middle_name: 'Bobcat',
      last_name: 'Cranberry',
      ssn: '123-45-6789',
      phone_number: '555-123-4567',
      email: 'alice@example.com',
    },
  };
  client.createAssetReport(
    [ACCESS_TOKEN],
    daysRequested,
    options,
    function(error, assetReportCreateResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error,
        });
      }
      prettyPrintResponse(assetReportCreateResponse);

      const assetReportToken = assetReportCreateResponse.asset_report_token;
      respondWithAssetReport(20, assetReportToken, client, response);
    });
});

// This functionality is only relevant for the UK Payment Initiation product.
// Retrieve Payment for a specified Payment ID
router.get('/api/payment', function(request, response, next) {
  client.getPayment(PAYMENT_ID, function(error, paymentGetResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(paymentGetResponse);
    response.json({error: null, payment: paymentGetResponse});
  });
});

// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
router.get('/api/item', function(request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
      if (err != null) {
        const msg = 'Unable to pull institution information from the Plaid API.';
        console.log(msg + '\n' + JSON.stringify(error));
        return response.json({
          error: msg
        });
      } else {
        prettyPrintResponse(itemResponse);
        response.json({
          item: itemResponse.item,
          institution: instRes.institution,
        });
      }
    });
  });
});

// This is a helper function to poll for the completion of an Asset Report and
// then send it in the response to the client. Alternatively, you can provide a
// webhook in the `options` object in your `/asset_report/create` request to be
// notified when the Asset Report is finished being generated.
const respondWithAssetReport = (
  numRetriesRemaining,
  assetReportToken,
  client,
  response
) => {
  if (numRetriesRemaining == 0) {
    return response.json({
      error: 'Timed out when polling for Asset Report',
    });
  }

  const includeInsights = false;
  client.getAssetReport(
    assetReportToken,
    includeInsights,
    function(error, assetReportGetResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        if (error.error_code == 'PRODUCT_NOT_READY') {
          setTimeout(
            () => respondWithAssetReport(
              --numRetriesRemaining, assetReportToken, client, response),
            1000
          );
          return
        }

        return response.json({
          error: error,
        });
      }

      client.getAssetReportPdf(
        assetReportToken,
        function(error, assetReportGetPdfResponse) {
          if (error != null) {
            return response.json({
              error: error,
            });
          }

          response.json({
            error: null,
            json: assetReportGetResponse.report,
            pdf: assetReportGetPdfResponse.buffer.toString('base64'),
          })
        }
      );
    }
  );
};


module.exports = router;
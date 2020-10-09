var express = require("express");
var router = express.Router();
var braintree = require("braintree");

router.post("/", function (req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: "9p5qb2pnnmrkqy2x",
    publicKey: "sj7hmjxgzn6qy2zp",
    privateKey: "d47e8884ee8ad69cb6b006a4853d1c87",
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale(
    {
      amount: "10.00",
      paymentMethodNonce: nonceFromTheClient,
      options: {
        // This option requests the funds from the transaction
        // once it has been authorized successfully
        submitForSettlement: true,
      },
    },
    function (error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
    }
  );
});

module.exports = router;

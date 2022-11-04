const express = require("express");
const app = express();
require("dotenv").config();

const {accessList, accessProduct, accessStyles, accessRelated} = require("./models.js")



app.use(express.json());


app.get('/products', (req, res) => {
  const {page, count} = req.query;
  accessList(page, count, (err, results) => {
    if (err) {
      res.sendStatus(500);
      return err;
    }

    console.log(results)
  })
})
app.get('/products/:product_id', (req, res) => {
  const {product_id} = req.params;
  accessProduct(product_id)
    .then((results) => {
      res.send(results)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
})
app.get('/products/:product_id/styles', (req, res) => {
  const {product_id} = req.params;
  accessStyles(product_id, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(err)
      return err;
    }
    console.log(results)
    // var currentResult = results[0].results
    // console.log('BEFORE PARSE',result.results)
    // JSON.stringify(result.results)
    // JSON.parse(result.results)
    // JSON.parse(result.results)
    // console.log('AFTER PARSE',result.results)
    // console.log('AFTER PARSE',result)



    res.send(results)
  })
})
app.get('/:product_id/related', (req, res) => {
  const {product_id} = req.params;
  accessRelated(product_id)
    .then((results) => {
      res.send(results)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
})



app.listen(process.env.LOCAL_SERVER_PORT, () =>
console.log('LISTENING AT HTTP://localhost:' +
 process.env.LOCAL_SERVER_PORT
));
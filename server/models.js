const pool = require("./connect.js");
var mysql = require('mysql');
const { promisify } = require('util')



pool.query = promisify(pool.query).bind(pool);
pool.getConnection = promisify(pool.getConnection)

var cleanNestedJSON = (object) => {


  for(var key in object) {
    if (typeof object[key]  === 'string' && object[key].includes("http")) {

      object[key] = object[key].slice(1, object[key].length - 1)
    }
    if (typeof object[key]  === 'array' || typeof object[key]  === 'object') {
      cleanNestedJSON(object[key])
    }
  }

  return object
}



module.exports = {
  accessList: function (page = 1, count = 5, cb) {
    return pool.getConnection().then((db) => {


      const currentPage = page * count - count
      const query = `SELECT * FROM products LIMIT ${count} OFFSET ${currentPage}`;
      return pool
        .query(query)
        .then((res) => {
          db.release();
          cb(null,res)
        })
        .catch((err) => {
          cb(err,null)
        })

    })

  },
  accessProduct: function (productId, cb) {
    return pool.getConnection().then((db) => {
      const query = `SELECT JSON_OBJECT(
        "id", id,
        "name", name,
        "slogan", slogan,
        "description", description,
        "category", category,
        "default_price", default_price,
        "features", (SELECT JSON_ARRAYAGG(JSON_OBJECT('feature',feature,'value',value)) from features where product_id = ${productId})

      ) as result from products where id = ${productId};`

      return pool
        .query(query)
        .then((res) => {

          // var resultArray = JSON.parse(res[0])

          var resultObject = JSON.parse(res[0].result)

          db.release();
          cb(null,resultObject)
        })
        .catch((err) => {
          cb(err,null)
        })
    })
  },
  accessStyles: function (productId, cb) {
    return pool.getConnection().then((db) => {

      const query = `SELECT id_products, JSON_ARRAYAGG(JSON_OBJECT(
        'style_id', style_id,
        'name', name,
        'original_price', original_price,
        'sale_price', sale_price,
        'default_style', default_style,
        'photos', (SELECT JSON_ARRAYAGG(JSON_OBJECT('url',url,'thumbnail_url',thumbnail_url)) from photos where styleId = style_id),
        'skus', (SELECT JSON_OBJECTAGG(sku, JSON_OBJECT('quantity',quantity,'size', size)) from skus where styleId = style_id))) as results
      from styles where id_products = ${productId};`
      return pool
        .query(query)
        .then((res) => {

          var resultArray = cleanNestedJSON(JSON.parse(res[0].results))

          var resultObject = {product_id: productId, results: resultArray};

          db.release();

          cb(null,resultObject)
        })
        .catch((err) => {
          cb(err,null)
        })

    })

  },
  accessRelated: function (productId, cb) {
    return pool.getConnection().then((db) => {

      const query = `SELECT JSON_ARRAYAGG(related_product_id) AS result FROM related where id_products = ${productId};`
      return pool
        .query(query)
        .then((res) => {
          db.release();

          var result = res[0].result
          cb(null, result)
        })
        .catch((err) => {
          cb(err,null)
        })

    })

  }
}
const pool = require("./connect.js");
var mysql = require('mysql');
const { promisify } = require('util')



pool.query = promisify(pool.query).bind(pool);
pool.getConnection = promisify(pool.getConnection)



module.exports = {
  accessList: function (page = 1, count = 5, cb) {
    return pool.getConnection().then((db) => {
      console.log('hello')

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
  accessStyles: function (productId, cb) {
    return pool.getConnection().then((db) => {
      console.log('hello')

      const query = `SELECT id_products, JSON_UNQUOTE(JSON_UNQUOTE(JSON_ARRAYAGG(JSON_OBJECT(
        'style_id', style_id,
        'name', name,
        'original_price', original_price,
        'sale_price', sale_price,
        'default_style', default_style,
        'photos', (SELECT JSON_ARRAYAGG(JSON_OBJECT('url',url,'thumbnail_url',thumbnail_url)) from photos where styleId = style_id))))) as results
      from styles where id_products = ${productId};`
      return pool
        .query(query)
        .then((res) => {
          console.log(res[0].results)

          var resultArray = JSON.parse(res[0].results)

          console.log(resultArray)



          var resultObject = {product_id: productId, results: resultArray}
          console.log(resultArray)
          db.release();

          cb(null,resultObject)
        })
        .catch((err) => {
          cb(err,null)
        })

    })

  }
}
module.exports = function(app, dbs) {
  app.get('/', (req, res) => {
    dbs.db.collection('products').find({}).toArray((err, docs) => {
      if(err){
        res.error(err)
      } else {
        res.json(docs)
      }
    })
  })

  return app
}

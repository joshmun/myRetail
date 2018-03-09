if(!process.env.mongoURI){
  const env = require('./env.json');
}

exports.config = function() {
  const dbConnection = process.env.mongoURI || env['development'].mongoURI;
  return dbConnection;
};

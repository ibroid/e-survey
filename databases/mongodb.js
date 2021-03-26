let mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'survey';

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error(err)
      })
  }

  static connection() {
    return mongoose.connection;
  }

  static objectID() {
    return mongoose.objectID
  }
}

module.exports = new Database()
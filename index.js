const express = require('express')
const server = express()
const layout = require('express-ejs-layouts')
const router = require('./router/web')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('./databases/mongodb')
const session = require('express-session')

server.use(session({
  name: "genuid",
  resave: false,
  saveUninitialized: false,
  secret: "rff1712",
  cookie: {
    maxAge : 1000 * 60 * 30,
    sameSite: true
  }
}))

server.use(layout)
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(cookieParser())
server.use(express.static(__dirname + '/public'))
server.use(express.static('assets'))

server.use('/sweetalert2.js', express.static(__dirname + `/node_modules/sweetalert2/dist/sweetalert2.all.js`));


server.use(router) 
server.set('view engine', 'ejs')


server.locals.valueColor = (params) => {
  switch (params) {
    case 1:
      return 'danger';
      break;
    case 2:
      return 'warning';
      break;
    case 3:
      return 'success';
      break;
    case 4:
      return 'primary';
      break;
  }
}

server.listen(8080, () => {
  console.log("SERVER RUNNING ON 8080")
})


let express = require('express');
let app = express();
let dotenv = require('dotenv');
let bodyParser = require("body-parser");

//  ENGINE TEMPLATE
app.set("view engine", "ejs");

//   Config dotenv 
dotenv.config()
let PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/assets" ,express.static('public'));
app.use('/bootstrap', express.static('node_modules/bootstrap'));
app.use('/fontawesome', express.static('node_modules/@fortawesome/fontawesome-free'));

// ROUTES MIDLLEWARE
app.get('/', (req,res, next) => {
    res.render('pages/index')
})



app.listen(PORT, () => {
    console.log("Port listening on 3000")
})
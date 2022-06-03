const express = require("express");
const app = express();
const cors = require('cors');
const formidableMiddleware = require('express-formidable');

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(['/user/update'], formidableMiddleware());
const routerUsers = require("./routes/users");
app.use("/user",routerUsers);

const routerQuotes = require("./routes/quotes");
app.use("/quote",routerQuotes);

const routerOffers = require("./routes/offers");
app.use("/offer",routerOffers);
const routerEmail = require("./routes/email");
app.use("/email",routerEmail);

app.use('/uploads', express.static(process.cwd() + '/uploads')
)

app.listen(5000, ()=>console.log('app listening on port 5000'));
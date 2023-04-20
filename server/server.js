const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 8000;
const dotenv = require("dotenv");


dotenv.config({path:'.env'});
dotenv.config({path:'mongoVar.env'});
app.use(cookieParser());
app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require("./config/candy.config.js");
require("./routes/candy.route")(app);
require("./routes/user.route")(app);

app.listen(port,() => console.log(`listening on port: ${port}`));
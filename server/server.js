const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8000;
const dotenv = require("dotenv");


dotenv.config({path:'.env'});
dotenv.config({path:'mongoVar.env'});
require("./config/candy.config");
app.use(cookieParser());
app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require("./routes/candy.route")(app);
require("./routes/user.route")(app);
require("./routes/category.route")(app);

app.listen(port,() => console.log(`listening on port: ${port}`));
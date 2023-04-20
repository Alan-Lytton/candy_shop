const mongoose = require('mongoose');

const dbUserName = process.env.dbUserName;
const dbPassword = process.env.dbPassword;
const dbCluster = process.env.dbCluster;

// commented section below is for local instance of MongoDB

// mongoose.connect("mongodb://127.0.0.1:27017/candy-shop", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("Established a connection to the database"))
//     .catch(err => console.log("Something went wrong when connecting to the database", err));


// code block below is for connection to MongoDB Atlas cloud cluster
mongoose.connect(`mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}.mongodb.net/candy-shop?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));

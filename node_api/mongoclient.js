const exp = require('express');
const MongoClient = require('mongodb').MongoClient;

const port = 1452;
const app = exp();

const url = 'mongodb://localhost:27017/utbl';

MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log('Sorry unable to connect to MongoDB Error:', err);
    } else {
        db.collection('emp').save({}).then((data) =>{
            console.log(data)
        })
    }
})




app.listen(port, (err) => {
    if (err) {
        console.log("server is not started");
    }
    console.log("server is started with port no.:-  " + port);

})
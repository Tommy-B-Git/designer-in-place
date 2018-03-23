console.log('May Node be with you');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db;


// Connect to DB...
MongoClient.connect('mongodb://orbital676:lemonbook676@ds119049.mlab.com:19049/designer-in-place', (err, client) => {
    if (err) return console.log(err);
    db = client.db('designer-in-place');
    //...start the server
    app.listen(3000, () => {
        console.log('Listening on Port 3000');
    })
})

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

//GET serve the homepage + (entries from the DB..commented out part)
app.get('/', (req, res) => {
    // db.collection('users').find().toArray((err, result) => {
    //     if (err) return console.log(err)
    //     res.render('index.html', { users: result })
    // })
    res.sendFile(__dirname + '/index.html');
})

//  POST entries to the endpoint '/DIP' and the DB...
app.post('/DesignerInPlace', (req, res) => {
    //console.log(req.body);
    const click = { clickTime: new Date() };
    console.log(click);
    //console.log(db);
    db.collection('users').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('Saved to MongoDB!');
        res.sendFile(__dirname +'/thanks.html');
    })
})
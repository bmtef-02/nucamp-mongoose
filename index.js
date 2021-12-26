const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

// sets up connection to nucampsitedb in the mongodb server
const url = 'mongodb://localhost:27017/nucampsite';

// connects mongodb client to nucampsitedb
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// connect return promise
connect.then(() => {
    
    console.log('Connected correctly to server');

    // instantiate new document based on Campsite mongoose model
    const newCampsite = new Campsite({
        name: 'React Lake Campground',
        description: 'test'
    });

    // saves document to campsite's collection and returns promise
    newCampsite.save()
    .then(campsite => {
        console.log(campsite);

        // find() returns a promise with all documents based on the Campsite model in an array of objects
        return Campsite.find();
    })
    .then(campsites => {
        // log the array of objects with documents based on Campsite model
        console.log(campsites);

        // deleteMany() method called on all documents using Campsite model
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});
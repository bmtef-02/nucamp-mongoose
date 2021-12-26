const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

// sets up connection to nucampsitedb in the mongodb server
const url = 'mongodb://localhost:27017/nucampsite';

// connects mongodb client to nucampsitedb
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// connect return promise
connect.then(() => {
    
    console.log('Connected correctly to server');

    // create() instantiate new document based on Campsite mongoose model and auto saves it
    // create() returns a promise that resolves to the new document
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    .then(campsite => {
        // logs the original campsite document
        console.log(campsite);

        // findByIdAndUpdate() updates the campsite document and adds a comment subdoc
        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: { description: 'Update Test Document' }
        }, {
            // this will return the updated document
            new: true
        });
    })
    .then(campsite => {
        // logs the updated campsite document
        console.log(campsite);

        // adds the comments subdocument
        campsite.comments.push({
            rating: 5, 
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });

        // saves document and returns promise with the campsite that was saved with the new comments subdoc
        return campsite.save();
    })
    .then(campsite => {
        // log the campsite document updated with the comments subdoc
        console.log(campsite);

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
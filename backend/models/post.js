const mongoose = require('mongoose');

// in nodeJS, String is a capital S
// We can set the tyoe to an object that has contraints as arguments
// The schema is a blueprint and mongoose needs a model
const postSchema = mongoose.Schema({
    title: {type: String, required: true },
    content: {type: String, required: true },
});

// This turns the schema into an actual model
module.exports = mongoose.model('Post', postSchema);
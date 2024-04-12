const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/people');

const personSchema = mongoose.Schema({
    name: String,
    age: Number
});

const person = mongoose.model('Person', personSchema);

const david = new person({
    name: 'david',
    age: 19,
});

const penny = new person({
    name: 'penny',
    age: 23
});

const leonard = new person({
    name: 'leonard',
    age: 24
});

const sheldon = new person({
    name: 'sheldon',
    age: 23
});

person.insertMany([david, penny, leonard, sheldon])
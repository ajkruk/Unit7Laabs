// Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne({ first_name: 'Natasha', last_name: 'Romanoff', email: 'blackwidow85@avengers.org', gender:'Female', children: []})

//Add another person. They should have at least two children.
db.people.insertOne({ first_name: 'Clint', last_name: 'Barton', email: 'hawkeye80@avengers.org', gender:'Male', children: [{name: 'Lila', age: '13'}, {name: 'Cooper', age: '10'}]})

//Update one person named Clarence. He moved from North Dakota to South Dakota.
db.people.updateOne({first_name: 'Clarence'},
{ $set: {state: 'South Dakota'}})

//Update Rebecca Hayes. Remove her email address.
db.people.updateOne({first_name: 'Rebecca', last_name: 'Hayes'},
{ $set: {email: ''}})

// Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)

db.people.updateMany({state: 'Missouri'},
{ $inc: {age: 1 }})

//Jerry Baker has updated information. Replace with a new document:
//{ first_name: "Jerry", last_name: "Baker-Mendez", email: "jerry@classic.ly", gender:"Male", age: 28, state: "Vermont", "children": [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] }
db.people.replaceOne({ _id: ObjectId('659765248b1f4a88b8e3c0f7'), first_name: 'Jerry', last_name: 'Baker', email: null, gender: 'Male', age: 24, state: 'Illinois', children: [ { name: 'Alan', age: 13 } ] }, { 
    first_name: "Jerry", 
    last_name: "Baker-Mendez", 
    email: "jerry@classic.ly", 
    gender:"Male", 
    age: 28, 
    state: "Vermont", 
    "children": [
        {name: "Alan", age: 18}, 
        {name: "Jenny", age: 3}] })

//Delete Wanda Bowman.
db.people.deleteOne({first_name: 'Wanda', last_name: 'Bowman'})

//Delete everyone who does not have an email address specified. (expect 36 matches - maybe more depending what you added above)
db.people.deleteMany({email: null})

//Create a single field index on the email field.

db.people.createIndex({email: +1})

//Create a compound index on the first_name and last_name fields.

db.people.createIndex({
    first_name: 1,
    last_name: 1
})

//Add several documents to a new submissions collection. Do it all in one command. (Remember, MongoDB will create the collection for you. Just start adding documents.)

db.submissions.insertMany([
    {
        title: "The River Bend", 
        upvotes: 10, 
        downvotes: 2, 
        artist: ObjectId('659765248b1f4a88b8e3c0ea'),
    },
    {
        title: "Nine Lives", 
        upvotes: 7, 
        downvotes: 0, 
        artist: ObjectId('659765248b1f4a88b8e3c0a6'),
    },
    {
        title: "Star Bright", 
        upvotes: 19, 
        downvotes: 3, 
        artist: ObjectId('659765248b1f4a88b8e3c129'),
    },
    {
        title: "Why Like This?", 
        upvotes: 1, 
        downvotes: 5, 
        artist: ObjectId('659765248b1f4a88b8e3c0af'),

    },
    {
        title: "Non Sequitur", 
        upvotes: 11, 
        downvotes: 1, 
        artist: ObjectId('659765248b1f4a88b8e3c076'),

    }
])

//Add 2 upvotes for "The River Bend".

db.submissions.updateOne({artist: ObjectId('659765248b1f4a88b8e3c0ea')},
{ $inc: {upvotes: 2 }})

//Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)

db.submissions.updateMany({upvotes: {$gte: 10}}, {$set: {round2: true}})
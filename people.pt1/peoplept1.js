db.people.find( { age:{ $and: [
    { gender: 'Female' },
    { state: 'Florida'},
    { age: { $lt: 46 }},
    { age: { $gt: 39 }},
]}})

db.people.find({age: {$gte: 40, $lte: 45}, gender: "Female", state: "Florida"})

db.people.find({first_name: /^H/})

db.people.find({ state: 'Michigan'}).sort({first_name: -1})

db.people.find( { $or: [

    { first_name: "Virginia" }, 
    { state: "Virginia" }
]})

db.people.find({ age: {$lt: 30 }}, {
    first_name: 1, last_name: 1 })

db.people.find({ state: "Montana"}, {  
    age: 0, })

db.people.find({email: /.edu$/}, {email: true})
// All About mongodb powershell
const usersCollections = [
  {
    _id: ObjectId("640c80a294b62605527666e6"),
    name: "Saad",
    age: 22,
  },
  {
    _id: ObjectId("640c814a94b62605527666e7"),
    name: "Ahmed",
    age: 26,
    skills: ["C++", "Javascript"],
  },
  {
    _id: ObjectId("640c82c894b62605527666e9"),
    name: "Jabir",
    age: 19,
    address: {
      city: "Dhaka",
      district: "Dhaka",
    },
  },
  {
    _id: ObjectId("640c82c894b62605527666ea"),
    name: "Jarif",
    friends: [
      {
        name: "Muaj",
        age: 20,
      },
      {
        name: "Saad",
        age: 20,
      },
    ],
  },
  {
    _id: ObjectId("640c98dd94b62605527666eb"),
    name: "Jabir",
    age: 19,
    address: {
      city: "Ctg",
      districe: "Ctg",
    },
  },
];
1; //Insert a document in users table
db.users.insertOne({ name: "Saad", age: 22 });

2; //Inserts multiple documents
db.users.insertMany([
  {
    _id: ObjectId("640c82c894b62605527666e9"),
    name: "Jabir",
    age: 19,
    address: {
      city: "Dhaka",
      district: "Dhaka",
    },
  },
  {
    _id: ObjectId("640c82c894b62605527666ea"),
    name: "Jarif",
    friends: [
      {
        name: "Muaj",
        age: 20,
      },
      {
        name: "Saad",
        age: 20,
      },
    ],
  },
]);

3; //Number of row in collections
db.users.find({}).count();

4; // get only two document from users collections
db.users.find({}).limit(2);

5; //skip fist two document and get 3 document from users collections
db.users.find({}).skip(2).limit(3);

6; //Sort users collection according to age property
db.users.find({}).sort({ age: 1 }); //ascending order
db.users.find({}).sort({ age: -1 }); //descending order
//if two documents age properties are same then we can apply another property
db.users.find({}).sort({ age: 1, name: 1 });

7; //Skip some property of a document
db.users.find({}).projection({ name: 1, _id: 0 }); // return a collections of a document that has only one name property
db.users.find({}).projection({ password: 0 }); // Return an collections of document that has all property except password

8; // Get users collections on specific _id, name, and so on.
db.users.find({ _id: ObjectId("221322213122121") });
db.users.find({ name: "Saad" });

9; //Get users collections that skills array contain "Javascript".
db.users.find({ skills: "Javascript" });

9; //Get users collections that skills array match exact array.
db.users.find({ skills: ["C++", "Javascript"] });

10; //Get users collections that has city dhaka in address object property.
db.users.find({ "address.city": "Dhaka" });

11; //Get users collections that has city dhaka in friends array property.
db.users.find({ "friends.name": "Muaj" });

const output = {
  _id: ObjectId("640c82c894b62605527666ea"),
  name: "Jarif",
  friends: [
    {
      name: "Muaj",
      age: 20,
    },
    {
      name: "Saad",
      age: 20,
    },
  ],
};

// Operator

1; //Comparison operator
db.users.find({ age: { $gt: 22 } }); //Get all users whose age is greater than 22
db.users.find({ age: { $gte: 22 } }); //Get all users whose age is greater than or equal to 22
db.users.find({ age: { $eq: 22 } }); //Get all users whose age is equal to 22
db.users.find({ age: { $lt: 22 } }); //Get all users whose age is less than 22
db.users.find({ age: { $lte: 22 } }); //Get all users whose age is less than or equal to 22
db.users.find({ age: { $ne: 22 } }); //Get all users whose age is not equal to 22

2; //
db.users.find({ name: { $in: ["Sadd", "Jarif"] } }); //If users array's name property has "Saad" and "Jarif" its return
db.users.find({ name: { $nin: ["Sadd", "Jarif"] } }); //If users array's name property has not "Saad" and "Jarif" its return
db.users.find({ $and: [{ name: "Sadd" }, { age: 22 }] }); //Both condition satisfied then return alternative {name:"Saad", age:22}
db.users.find({ $or: [{ name: "Sadd" }, { age: 22 }] }); // if one condition satisfied then return
db.users.find({ age: { $not: { $gt: 22 } } }); //$lt
db.users.find({ $and: [{ name: "Saad" }, { age: { $gt: 22, $lt: 26 } }] });
db.users.find({ $and: [{ name: "Saad" }, { age: { $gte: 22, $lt: 26 } }] });

3;
db.users.find({ age: { $exists: true } });
db.users.find({ age: { $exists: false } });
db.users.find({ address: { $type: "object" } });
db.users.find({ name: { $regex: /sa/i } }); //case insensitive
db.users.find({ name: { $regex: /sa/ } }); //case sensitive
db.users.find({ name: { $regex: /ja/ } }); //case sensitive
db.users.find({ name: { $regex: /ja/i } }); //case insensitive
db.users.find({ name: { $regex: /^\w{4}$/i } }); //4 char

4; //Expression
//[({ budget: 400, spent: 450 }, { budget: 200, spent: 150 })];
db.users.find({ $expr: { $gt: ["$budget", "$spent"] } });

5; //Updating and deleting
db.users.updateMany({ age: { $gt: 22 } }, { $set: { age: 26 } });
db.users.updateMany({ age: { $gt: 22 } }, { $inc: { age: 2 } }); //Increment age by 2 whose age greater than 22
db.users.updateMany(
  { skills: { $exists: true } },
  { $set: { "skills.1": "JS" } }
);
db.users.updateMany(
  { skills: { $exists: true } },
  { $push: { skills: "Python" } }
);
db.users.updateMany(
  { skills: { $exists: true } },
  { $push: { skills: { $each: ["React", "Angular"] } } }
);

db.users.updateMany(
  { skills: { $exists: true } },
  { $pull: { skills: "Angular" } }
);
db.users.updateMany(
  { skills: { $exists: true } },
  { $pullAll: { skills: ["Python", "React"] } }
);
db.users.updateMany(
  { address: { $exists: true } },
  { $set: { "address.city": "Khulna" } }
);

db.users.updateMany({ name: "Saad" }, { $inc: { age: 2 } }); //adding by 2
db.users.updateMany({ name: "Saad" }, { $inc: { age: -2 } }); //subtract by 2
db.users.updateMany({ name: "Saad" }, { $mul: { age: 2 } }); //multiply by 2
db.users.updateMany({ name: "Saad" }, { $mul: { age: 1 / 2 } }); //divided by 2

6; //rename property name of a documents

db.users.updateOne({ name: "Saad" }, { $rename: { age: "base" } });

7; //Delete

db.users.deleteMany({ address: { $exists: true } });

//Indexing Mongodb

// collestion test

db.test.createIndex({ age: 1 }); //age_1 created index
db.test.createIndex({ name: 1 }, { name: "nameIndex" }); // nameIndex created
db.test.greateIndex(); //get all index
db.test.dropIndex("age_1");
db.test.dropIndex(); //all index will be dropped

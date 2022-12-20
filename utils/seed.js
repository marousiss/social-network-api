const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = [
  {
    "username": "Brenda",
    "email": "brenda@gmail.com"
  },
  {
    "username": "Steven",
    "email": "steven@yahoo.com"
  },
  {
    "username": "Emily",
    "email": "emily@gmail.com"
  },
  {
    "username": "Alex",
    "email": "alex@gmail.com"
  },
  {
    "username": "Stephanie",
    "email": "stephanie@yahoo.com"
  }
];

// Start the seeding runtime timer
console.time('seeding');

connection.once('open', async () => {
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});
  await User.collection.insertMany(userData);

  // log out a pretty table for users
  console.table(userData);
  console.timeEnd('seeding complete');
  process.exit(0);

});


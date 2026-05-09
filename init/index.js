require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const categories =[
      "trending",
      "rooms",
      "iconic Cities",
      "mountains",
      "castles",
      "amazing Pools",
      "camping",
      "arctic",
      "igloo",
      "dome",
 ];

async function main() {
  await mongoose.connect(MONGO_URL);
}

// const initDB = async () => {
//   await Listing.deleteMany({});
//   let randomCategory=""
//   initData.data = initData.data.map((obj) => {
//     randomCategory =
//       categories[Math.floor(Math.random() * categories.length)];
//   })

//   initData.data=initData.data.map((obj)=>({...obj,owner:"68f0cd7f45d5e0ec3e30c825",category:randomCategory}))
//   await Listing.insertMany(initData.data);  //initData is an object from data.js
//   console.log("data was initialized");
// };

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    return {
      ...obj,
      category: randomCategory,
    };
  });

  await Listing.insertMany(initData.data);
  console.log("✅ Data initialized successfully with random categories!");
};

initDB();




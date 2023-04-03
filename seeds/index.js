const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedhelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/YelpCamp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)} `,
      image: "https://picsum.photos/400",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, reprehenderit nisi. Rem eveniet maiores, error molestiae sed at quod alias vero ab debitis vel! Nulla quo nemo minus in itaque.",
      price,
    });
    await camp.save();
  }

  // const c = new Campground({title: 'purple field'});
  // await c.save();
};
seedDB().then(() => {
  mongoose.connection.close();
});

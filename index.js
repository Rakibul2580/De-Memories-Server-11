const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hjhvnge.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const services = client.db("photoData").collection("service");
  const reviews = client.db("photoData").collection("review");

  try {
    app.get("/", async (req, res) => {
      const query = {};
      const result = await services.find(query).limit(3).toArray();
      res.send(result);
    });

    app.get("/services", async (req, res) => {
      const query = {};
      const result = await services.find(query).toArray();
      res.send(result);
    });

    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await services.findOne(query);
      res.send(result);
    });
    app.post("/review", async (req, res) => {
      const query = req.body;
      const result = await reviews.insertOne(query);
      res.send(result);
    });
    app.get("/reviews/:name", async (req, res) => {
      const title = req.params.name;
      const query = { title };
      const result = await reviews.find(query).toArray();
      res.send(result);
    });
    app.get("/myreviews/:email", async (req, res) => {
      const reviewEmail = req.params.email;
      const query = { reviewEmail };
      const result = await reviews.find(query).toArray();
      res.send(result);
    });
  } catch {
    (error) => console.log(error.message);
  }
}
run();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const x = [
//   {
//     "price": "1500",
//     "title": "Birthday Party",
//     "details":
//       "By booking a Birthday Party you and all of your guests must agree to follow Museum rules, and fill out a registration form upon arrival. That registration form can be found here, as the host of the Birthday Party it is your responsibility to share the form with your guests. Please have them filled out and ready when you check-in, or we will have copies available for people to fill out when they arrive. You and your guests have access to the classroom from 3-3:30pm at the END of your party. The time in the classroom cannot be adjusted.",
//     "picture":
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_0rZiuYhoRuCay84d5emq-_Xm9x7-3WU9FCSrId2on5ROb08ztYcPcYI3oL1lwodHco&usqp=CAU"
//   },
//   {
//     "price": 5000,
//     "title": "Modeling Photo",
//     "details":
//       "When you are first starting out as a model it is not necessary to have professional photos and a modeling resume. Simple snapshots are all you need in order to find out if a modeling agency is interested in representing you.However, if an agency is interested in you, but it is not quite ready to sign on the dotted line, the agency may ask you to build your book a little bit more or work on developing your look. For a new model, this can be very confusing if they have no idea what the agency is looking for or what it all really means.Agencies like modeling photos that show the model’s versatility and their ability to express themselves. They also like to see how well the model can actually tell a story or portray a feeling or emotion in their photos. ",
//     "picture":
//       "https://career.webindia123.com/career/options/images/modeling.jpg"
//   },
//   {
//     "price": "2000",
//     "title": "Action Photo",
//     "details":
//       "Action photography is a great genre to try out if you want to broaden your photography skills. Practicing action shots can deepen your knowledge of your camera, open up more creative possibilities, and make you a more effective photographer overall.To take good action photos, you first need to understand the exposure triangle (ISO, aperture, and shutter speed). That’s because most action shots require a short shutter speed like 1/1000 second. This fast exposure can capture a split-second moment, but it also changes the lighting of your image.If your image is too dark because of your fast shutter speed, you can widen your aperture and/or bump up your ISO speed to increase your lighting. Widening your aperture is typically better because increasing the ISO will also increase the noise of your image, but if you want a specific depth of field, you’ll need to change the ISO instead of the aperture.",
//     "picture":
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqTazIS1-pSY1FEDtR6Dqf62NgBwZMn54Ei7OqrRqr8A&s"
//   },
//   {
//     "price": 2500,
//     "title": "Product Photo",
//     "details":
//       "There’s far more to product photography than showing potential customers what your product looks like. Well-considered photos can put your product in context, helping a customer see how it might fit into their own life. In fact, researchers found that vivid and detailed imagery of a product increases a customer’s psychological sense of ownership of that product. Photography can also help boost your brand, reinforcing what you stand for and what you’re all about. All of these things increase the likelihood of inspiring a purchase.",
//     "picture":
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVbhJVjfEO0p8pV5nz-Zfol5q6USdowqh7IA&usqp=CAU"
//   },
//   {
//     "price": "3000",
//     "title": "Real Estate Photo",
//     "details":
//       "I Deliver More – I pride myself on going the extra mile for every project. To me, that means always visiting the location to make sure we capture the perfect shots, taking charge of handling all permissions needed for aerial or any other requested shots, and always working to create a space’s perfect atmosphere through the artful combination of natural and artificial lighting. I Offer Architectural and Interior Films – Not only do I provide you with industry-best Architectural and Interior Photography Services, I also specialize in Architectural Filmmaking. With a variety of top-quality story options, I can get great a series of videos for that perfect story of a building’s best aesthetic features and to show the entire property in a way not possible with Still shots.",
//     "picture":
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpeOe1hr8DymzrOg4t3nLhDFLZrVNMkT13Cg&usqp=CAU"
//   },
//   {
//     "price": "4000",
//     "title": "Travel Photo",
//     "details":
//       "Photography (Φωτογραφία in Greek) is a compound of the Greek words φως (light) and γράφω (write or draw). Wikipedia defines photography as the art, application, and practice of creating durable images by recording light. It’s crazy to think that all we see when we look at photos is light. Crazy yet fascinating.If we tried to give a definition of travel photography, it would be something along these lines: travel photography is the documentation of all those components that make up any given destination. These include the landscape, both natural and human-made, the people, the culture, the food, and, ultimately, the very history of this place.",
//     "picture":
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WU8CCIETzzBPMH5F7_-jORjFaD6yvAvnog&usqp=CAU"
//   },
//   {
//     "price": "1000",
//     "title": "Baby and Family Photo",
//     "details":
//       "Children really do grow up incredibly fast – blink and you’ll have a pre-schooler standing where your tiny newborn once lay.There’ll be so many phases that are adorable where you’ll think “We really should get family photographs sorted out soon.Did you know, though, that there are particular ages and stages that work particularly well for photographs?.Based on my years of experience, here are my recommendations on the ideal ages for a photo session in baby’s first year.Rest assured that I can take beautiful photographs at any age. As part of the pre-session consultation, we’ll discuss your baby and how he / she is getting on, and any games or toys they especially enjoy so we can get the most out of them on the day.",
//     "picture":
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP68qGakUJOtbs926kNabyeGzkIijcJjBlvw&usqp=CAU"
//   },
//   {
//     "price": "4500",
//     "title": "Wedding Photo",
//     "details":
//       "Couples spend a long time planning their weddings and pay a lot of attention to even the smallest details. The flowers, the cake, the reception set-up, the table settings – they are all planned with purpose and bonus! they make for amazing pictures too. Even though every wedding is different, there are some detail photos that are common at most weddings. From the rings to the dress, there’s likely something in these details that are personally connected to the couple that, when captured, will help you tell a better story.",
//     "picture":
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Mjz0UuicrWs_qdlBZx692RH1CobMBEcupA&usqp=CAU"
//   },
//   {
//     "price": "4500",
//     "title": "Fashion Photo",
//     "details":
//       "Although it looks pretty spectacular, there is a lot of research involved in identifying the correct photographer and posing as the model, making fashion photography a challenging job. The foremost thing is to build an extraordinary portfolio of your work, which implies that one must work with aspiring models to establish their work. In addition, the portfolios help advertise the photographer’s skills in the career.The photographer must ensure that he chooses the right platform, the portfolio website, to achieve the distinctive style that reflects your personality well. On the shoot, you must organize your team and turn the scenario into high spirits since it is necessary to manage the model and their personality for some period. It is wearing both physically as well as mentally. Finally comes the editing, which will extend the process further.",
//     "picture":
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKeRL1hzBFPCs1ae24PeBr7Qff9LYL6cZ0wgjmzQiaA5Nw-J1CWJnO-Cz571IvbahfxHw&usqp=CAU"
//   },
//   {
//     "price": "5500",
//     "title": "Architectural Photo",
//     "details":
//       "I Deliver More – I pride myself on going the extra mile for every project. To me, that means always visiting the location to make sure we capture the perfect shots, taking charge of handling all permissions needed for aerial or any other requested shots, and always working to create a space’s perfect atmosphere through the artful combination of natural and artificial lighting.I Offer Architectural and Interior Films – Not only do I provide you with industry-best Architectural and Interior Photography Services, I also specialize in Architectural Filmmaking. With a variety of top-quality story options, I can get great a series of videos for that perfect story of a building’s best aesthetic features and to show the entire property in a way not possible with Still shots.",
//     "picture":
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5B2XmlgRsBZMNAXnlgiMG8mMJKdCUDPIIxQ&usqp=CAU"
//   },
//   {
//     "price": "6000",
//     "title": "Sports Events photo",
//     "details":
//       "The medium has remained popular for all these years, and that’s no surprise when you consider the significance of architecture. Buildings do much more than provide us with shelter. They are also works of art and long-lasting cultural symbols.Building photography may have first taken off as a way to document buildings, but along the way, it has evolved into its own diverse art form. This guide will teach you about the basics of and give you some architecture photography tips so that you can put together an outstanding online architecture portfolio.",
//     "picture":
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdsCNiwKur6Tf3bDyfP6H6_J5k4pI5f-ezA&usqp=CAU"
//   },
//   {
//     "price": "2500",
//     "title": "Portrait and Macro",
//     "details":
//       "Macro photography is a form of close-up photography, originally developed for scientific research. The strictest definition of macro photography is that the subject is photographed at 1:1 magnification—in other words, the subject is life-sized in the photo.However, most people use the term “macro photography” to refer to any photograph that depicts a close-up and extremely detailed image of a small subject.Macro photography as we know it began in the early 1900s, when F. Percy Smith began photographing insects using much of the same equipment we use today: bellows and extension tubes. These devices placed the lens further away from the film negative, creating a closer focal point and allowing for more close-up images.",
//     "picture":
//       "https://www.masterclass.com/cdn-cgi/image/width=828,quality=75,format=webp/https://images.ctfassets.net/3s5io6mnxfqz/6mZ7SDUFVeGMKMAsGcQKSg/2121f23acd2fb6f44debbc762e9d02e2/animal-animal-photography-blur-87027.jpg"
//   }
// ]

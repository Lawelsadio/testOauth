const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoute = require("./app/routes/authRoute");
const FactureRoute = require("./app/routes/facture.route");
const Role = require("./app/models/role.model");

// faire en sorte que la redirection donne sur ma page de 
// telechargement d image.
// puis faire en sorte que le client ne puisse telecharger l image 
// sans s authentifier
// puis ajouter le id pour chaque action qu un client effectura.
// ainsi recuperer les images

const app = express();
app.use(express.static('./public'));
app.use('/images', express.static('images'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/Deep_bill`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Depp bill application." });
});

// routes
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// midllewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
);
app.use(cors());

app.use("/users", authRoute);
// upload partie

app.use('/factures', FactureRoute);

app.use((req, res) => {
  res.status(404).json({
      errors: "page not found"
  })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "assistant",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'assistant' to roles collection");
      });

      new Role({
        name: "admin",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

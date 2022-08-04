const express = require('express');
const cors = require("cors")
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
// app.use(express.json());
app.use(cors());

// Body parser middleware

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit: '100mb',parameterLimit: 50000  }));

dotenv.config();

// Define Routes

app.use('/botapi/users', require('./routes/botapi/users'));
app.use('/botapi/auth', require('./routes/botapi/auth'));
app.use('/botapi/profile', require('./routes/botapi/profile'));
app.use('/botapi/posts', require('./routes/botapi/posts'));
app.use('/botapi/datas', require('./routes/botapi/datas'));
app.use('/botapi/instances', require('./routes/botapi/instance'));
app.use("/wa/bot",require("./routes/botapi/webhook"));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`ServerHeroku started on port ${PORT}`));

const express = require('express')
const path = require('path');
const db = require('./models');
const bcrypt = require("bcrypt");
const db_filter_films = require('./controllers/films_controller.js');
const db_filter_plays = require('./controllers/plays_controller.js');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

module.exports = {
    validatePassword,
    express
}

const app = express();
const PORT = 3000;
const saltRounds = 10;

app.use(cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/index.html'));
});

//JSON API for homepage
app.get('/api/homepage', async (req, res) => {
    try {
        const homepage = await db.Homepage.findAll({
            include: [{model: db.Films, as: "films"}]
        });
        res.send(homepage);
    } catch (err) {
        res.send(err);
    }
});

//JSON for about description
app.get('/api/homepage/about_description', async (req, res) => {
    try {
        const homepage = await db.Homepage.findAll({
            attributes: ['id', 'about_des']
        });
        res.send(homepage);
    } catch (err) {
        res.send(err);
    }
});

//JSON for client photo
app.get('/api/homepage/client_photo', async (req, res) => {
    try {
        const homepage = await db.Homepage.findAll({
            attributes: ['id', 'client_photo']
        });
        res.send(homepage);
    } catch (err) {
        res.send(err);
    }
});

//Post method for homepage
app.post("/api/homepage", async (req, res) => {
    const data = req.body;
    try {
        const homepage = await db.Homepage.create({
            about_des: data.about_des,
            client_photo: data.client_photo
        });
        res.send(homepage);
    } catch (err) {
        res.send(err);
    }
});

// JSON for all attributes of Biopage table
app.get('/api/biopage', async (req, res) => {
    try {
        const biopage = await db.Biopage.findAll();
        res.send(biopage);
    } catch (err) {
        res.send(err);
    }
});

// Post method for Biopage table
app.post("/api/biopage", async (req, res) => {
    const data = req.body;
    try {
        const biopage = await db.Biopage.create(data);
        res.send(biopage);
    } catch (err) {
        res.send(err);
    }
});

// Search for film by title and display for all attributes of Films table
app.get('/api/films', async (req, res) => {
    const search = req.query;

    try {
        if (Object.keys(search)) {
            db_filter_films.getByTitle(req, res);
        }
        else {
            const films = await db.Films.findAll({
                include: [{model: db.Buy_links, as: "buy_links"},
                          {model: db.Videos, as: "videos"},
                          {model: db.Still_photos, as: "still_photos"}]
            });
            res.send(films);
        }
    } catch (err) {
        res.send(err.toString());
    }
});

// Post method for Films
app.post("/api/films", async (req, res) => {
    const data = req.body;
    try {
        const homepage = await db.Homepage.findByPk(data.homeId);

        db.Films.create({
            title: data.title,
            film_photo: data.film_photo,
            director: data.director,
            screenplay: data.screenplay,
            stars: data.stars,
            status: data.status,
            description: data.description,
            type_film: data.type_film,
            homeId: homepage?.id || null
        })
        .then(film => {
            if (data.buy_links != null) {
                data.buy_links.forEach(linkObject => {
                    db.Buy_links.create({
                        link: linkObject.link,
                        link_photo: linkObject.link_photo,
                        filmId: film.id
                    });
                });
            }

            if (data.videos != null) {
                data.videos.forEach(videoObject => {
                    db.Videos.create({
                        video: videoObject.video,
                        filmId: film.id
                    });
                });
            }

            if (data.still_photos != null) {
                data.still_photos.forEach(photoObject => {
                    db.Still_photos.create({
                        photo: photoObject.photo,
                        filmId: film.id
                    });
                });
            }

            res.send(film);
        })
    } catch (err) {
        res.send(err);
    }
});

app.get("/api/films/getImage/:title", async (req, res) => {
    var title = req.params['title'];
    try {
        const film = db.film.getByTitle(title);
        const film_photo = film.film_photo;
        res.send(film_photo);
    }
    catch (err) {
        res.send(err);
    }
});

// Search for plays by title and display attributes of plays table
app.get('/api/plays', async (req, res) => {
    const search = req.query;

    try {
        if (Object.keys(search)) {
            db_filter_plays.getByTitle(req, res);
        }
        else {
            const plays = await db.Plays.findAll({
                include: [{model: db.Buy_links, as: "buy_links"},
                          {model: db.Videos, as: "videos"},
                          {model: db.Still_photos, as: "still_photos"}]
            });
            res.send(plays);
        }
    } catch (err) {
        res.send(err);
    }
});

// Post method for plays
app.post("/api/plays", async (req, res) => {
    const data = req.body;
    try {
        db.Plays.create({
            title: data.title,
            play_photo: data.play_photo,
            writer: data.writer,
            productions: data.productions,
            development: data.development,
            description: data.description,
            type_play: data.type_play
        })
        .then(play => {
            if (data.buy_links != null) {
                data.buy_links.forEach(linkObject => {
                    db.Buy_links.create({
                        link: linkObject.link,
                        link_photo: linkObject.link_photo,
                        playId: play.id
                    });
                });
            }

            if (data.videos != null) {
                data.videos.forEach(videoObject => {
                    db.Videos.create({
                        video: videoObject.video,
                        playId: play.id
                    });
                });
            }

            if (data.still_photos != null) {
                data.still_photos.forEach(photoObject => {
                    db.Still_photos.create({
                        photo: photoObject.photo,
                        playId: play.id
                    });
                });
            }

            res.send(play);
        })
    } catch (err) {
        res.send(err);
    }
});

app.get("/api/plays/getImage/:title", async (req, res) => {
    var title = req.params['title'];
    try {
        const play = db.play.getByTitle(title);
        const play_photo = play.play_photo;
        res.send(play_photo);
    }
    catch (err) {
        res.send(err);
    }
});

//Press api for all attributes
app.get("/api/press", async (req,res)=>{
    const data= req.body;
    try{
        const press = await db.Press.findAll();
        res.send(press);
    } catch (err) {
        res.send(err);
    }
})

//Press api for quotes
app.get("/api/press/quote", async (req,res)=>{
    const data= req.body;
    try{
        const quote = await db.Press.findAll({
            attributes: ['id', 'quote']
        });
        res.send(quote);
    } catch (err) {
        res.send(err);
    }
})

//Press api for press image
app.get("/api/press/press_image", async (req,res)=>{
    const data= req.body;
    try{
        const press_image = await db.Press.findAll({
            attributes: ['id', 'press_image']
        });
        res.send(press_image);
    } catch (err) {
        res.send(err);
    }
})

//Press api for author
app.get("/api/press/author", async (req,res)=>{
    const data= req.body;
    try{
        const author = await db.Press.findAll({
            attributes: ['id', 'author']
        });
        res.send(author);
    } catch (err) {
        res.send(err);
    }
})

app.post("/api/press", async (req, res) => {
    const data = req.body;
    try {
        const press = await db.Press.create(data);
        res.send(press);
    } catch (err) {
        res.send(err);
    }
});

// JSON for contact page
app.get('/api/contactpage', async (req, res) => {
    try {
        const contactpage = await db.Contactpage.findAll();
        res.send(contactpage);
    } catch (err) {
        res.send(err);
    }
});

// Post method for contact page
app.post('/api/contactpage', async (req, res) => {
    const data = req.body;
    try {
        const contactpage = await db.Contactpage.create(data);
        res.send(contactpage);
    } catch (err) {
        res.send(err);
    }
});


//For contactPage email
const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (!validator.validate(email)) {
      res.status(400).send('Invalid email address');
    } else {
      next();
    }
  };

  // contact page send email *UNFINISHED*
app.post('http://localhost:3000/api/sendEmail', cors(),validateEmail,async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: email,
      to: req.query.to,
      subject: 'New email from contact form',
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send('Failed to send email2');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });

// updates password if the user exists in database
app.put("/api/admin/:id/password", async (req, res) => {
    const enteredPass = req.body.password;
    const adminId = req.params.id;

    try {
        db.Admin.findByPk(adminId)
        .then(admin => {
            admin.password = enteredPass;
            return admin.save();
        })
        .then(() => {
            res.sendStatus(200);
        })
    } catch (err) {
        res.send(err);
    }
});

// Hashes password before it is updated to the database
db.Admin.beforeUpdate((admin, options) => {
    admin.password = bcrypt.hashSync(admin.password, saltRounds);
});

// Hashes password before it is created in the database
db.Admin.beforeCreate((admin, options) => {
    return bcrypt.hash(admin.password, saltRounds).then(hashedPassword => {
        admin.password = hashedPassword;
    });
});

// Validates password and if the admin exists
async function validatePassword(email, password) {
    const admin = await db.Admin.findByEmail(email);
    if (!admin) {
        throw new Error("Admin not found");
    }
    const passwordMatch = await bcrypt.compareSync(password, admin.password);
    if (!passwordMatch) {
        throw new Error("Incorrect password");
    }
    return true;
}

db.sequelize.sync().then(
    (result) => {
    app.use(express.static(__dirname + '/assets'));
    app.listen(PORT, (() => {
        console.log('Server started on port 3000');
    }))
})
.catch((err) => {
    console.log(err);
});

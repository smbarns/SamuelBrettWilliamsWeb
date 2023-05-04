const express = require('express')
const path = require('path');
const db = require('./models');
const bcrypt = require("bcrypt");
const db_filter_films = require('./controllers/films_controller.js');
const db_filter_plays = require('./controllers/plays_controller.js');

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const { Op } = require('sequelize');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors')

// uuid
const {v4:uuidv4} = require('uuid')

const sendEmail  =require('./utils/sendEmail')
const recieveEmail = require('./utils/recieveEmail')
require('dotenv').config({ path: './config/config.env' });

module.exports = {
    validatePassword,
    express
}

const app = express();
const PORT = 3000;
const saltRounds = 10;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.session_secret_key,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_access_key_id,
    secretAccessKey: process.env.AWS_secret_access_key,
    region: process.env.AWS_region
});

// Set destination directory and filename of each uploaded file
const storage = multerS3({
    s3: s3,
    bucket: 'samuel-brett-williams',
    acl: 'public-read',
    key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
    }
})

// Set maximum number of files that can be uploaded at once
const upload = multer({
    storage: storage
});

// Handle file upload and then delete (for testing purposes)
app.post('/upload', upload.array('files', 5), (req, res) => {
    const uploadedPhotos = req.files;
    const urls = [];

    for (let i = 0; i < uploadedPhotos.length; i++) {
        const url = `https://s3-${s3.config.region}.amazonaws.com/${uploadedPhotos[i].bucket}/${uploadedPhotos[i].key}`;
        urls.push(url);
    }

    console.log(urls);

    const uploadedFileKeys = req.files.map(file => file.key);

    const params = {
        Bucket: 'samuel-brett-williams',
        Delete: {
            Objects: uploadedFileKeys.map(key => ({ Key: key })),
            Quiet: false
        }
    };

    s3.deleteObjects(params, function (err, data) {
        if (err) {
            console.log('Error deleting files:', err);
        } else {
            console.log('Files deleted successfully:', data);
        }
    });

    return res.status(200).json({ message: 'Files uploaded and deleted successfully' });
});

// Delete file at specific key
app.delete('/delete/:objectKey', (req, res) => {
    const objectKey = req.params.objectKey;

    const params = {
        Bucket: 'samuel-brett-williams',
        Key: objectKey,
    };

    s3.deleteObject(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting object from S3');
        } else {
            console.log(`Successfully deleted object: ${data}`);
            res.status(200).send(`Deleted object: ${data}`);
        }
    });
});

app.get('/list-objects', function(req, res) {
    // Set the parameters for listing objects in the bucket
    const params = {
        Bucket: 'samuel-brett-williams'
    };

    // Use the AWS SDK to list all the objects in the bucket
    s3.listObjects(params, function(err, data) {
        if (err) {
        console.log(err, err.stack);
        res.status(500).send('Error listing objects in S3 bucket');
        } else {
        // Loop through the objects and generate URLs for each object
        const objectUrls = data.Contents.map(function(object) {
            const objectParams = { Bucket: 'samuel-brett-williams', Key: object.Key };
            return s3.getSignedUrl('getObject', objectParams);
        });

        // Send the generated URLs as a response to the HTTP request
        res.send(objectUrls);
        }
    });
});

app.use(cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
            include: [{ model: db.Films, attributes: ['id', 'title', 'photo'], as: "films",
                        include: { model: db.Videos, as: "videos"}}]
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
app.post("/api/biopage", ensureAuthenticated, async (req, res) => {
    const data = req.body;
    try {
        const biopage = await db.Biopage.create(data);
        res.send(biopage);
    } catch (err) {
        res.send(err);
    }
});

// Put method for updating client photo
app.put('/api/bio/photo', ensureAuthenticated, async (req, res) => {
    const photo = req.body.photo;

    try {
        const biopage = await db.Biopage.findOne({where: {id: 1}});
        if (!biopage) {
            return res.status(404).send('Biopage not found');
        }

        biopage.client_photo = photo;
        await biopage.save();
        return res.status(200).json(biopage);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
})

app.put('/api/biopage/bio', ensureAuthenticated, async (req, res) => {
    const bio = req.body.bio_des;

    try {
        const biopage = await db.Biopage.findOne({where: {id: 1}});
        if (!biopage) {
            return res.status(404).send('Biopage not found');
        }

        biopage.bio_des = bio;
        await biopage.save();
        return res.status(200).json(biopage);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
})

// Search for film by title and display for all attributes of Films table
app.get('/api/films', async (req, res) => {
    const search = req.query;

    try {
        if (Object.values(search).join()) {
            db_filter_films.getByTitle(req, res);
        }
        else {
            const films = await db.Films.findAll({
                include: [{ model: db.Buy_links, as: "buy_links" },
                { model: db.Videos, as: "videos" },
                { model: db.Still_photos, as: "still_photos" }]
            });
            res.send(films);
        }
    } catch (err) {
        res.send(err.toString());
    }
});

// Gets film by query exact title name
app.get('/api/feature/film', async (req, res) => {
    const search = req.query;
    const title = Object.values(search).join();

    try {
        if (title) {
            const film = await db.Films.findOne({ where: {title: title}, 
                include: [{ model: db.Buy_links, as: "buy_links" }, 
                          { model: db.Videos, as: "videos" }, 
                          { model: db.Still_photos, as: "still_photos" }]
            });
            res.send(film);
        }
    } catch (err) {
        res.send(err);
    }

})

// Returns list of film titles
app.get('/api/films/titles', async (req, res) => {
    const data = req.body;
    try {
        const titles = await db.Films.findAll({
            attributes: ['title']
        });
        res.send(titles);
    } catch (err) {
        res.send(err);
    }
});

// Post method for Films
app.post("/api/films", ensureAuthenticated, async (req, res) => {
    const data = req.body;
    try {
        const homepage = await db.Homepage.findByPk(data.homeId);

        db.Films.create({
            title: data.title,
            photo: data.photo,
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
                            filmId: film.id,
                            featured: false
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

// Search for plays by title and display attributes of plays table
app.get('/api/plays', async (req, res) => {
    const search = req.query;

    try {
        if (Object.keys(search).join()) {
            db_filter_plays.getByTitle(req, res);
        }
        else {
            const plays = await db.Plays.findAll({
                include: [{ model: db.Buy_links, as: "buy_links" },
                { model: db.Videos, as: "videos" },
                { model: db.Still_photos, as: "still_photos" }]
            });
            res.send(plays);
        }
    } catch (err) {
        res.send(err);
    }
});

// Post method for plays
app.post("/api/plays", ensureAuthenticated, async (req, res) => {
    const data = req.body;
    try {
        db.Plays.create({
            title: data.title,
            photo: data.photo,
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
                            playId: play.id,
                            featured: false
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

//Press api for all attributes
app.get("/api/press", async (req, res) => {
    const data = req.body;
    try {
        const press = await db.Press.findAll();
        res.send(press);
    } catch (err) {
        res.send(err);
    }
})

//Press api for quotes
app.get("/api/press/quote", async (req, res) => {
    const data = req.body;
    try {
        const quote = await db.Press.findAll({
            attributes: ['id', 'quote']
        });
        res.send(quote);
    } catch (err) {
        res.send(err);
    }
})

//Press api for press image
app.get("/api/press/press_image", async (req, res) => {
    const data = req.body;
    try {
        const press_image = await db.Press.findAll({
            attributes: ['id', 'press_image']
        });
        res.send(press_image);
    } catch (err) {
        res.send(err);
    }
})

//Press api for author
app.get("/api/press/author", async (req, res) => {
    const data = req.body;
    try {
        const author = await db.Press.findAll({
            attributes: ['id', 'author']
        });
        res.send(author);
    } catch (err) {
        res.send(err);
    }
})

app.post("/api/press", ensureAuthenticated, async (req, res) => {
    const data = req.body;
    try {
        const press = await db.Press.create({
            press_title: data.press_title,
            project_name: data.project_name,
            author: data.author,
            quote: data.quote,
            press_image: data.logo || null
        });
        res.send(press);
    } catch (err) {
        res.send(err);
    }
});

app.put('/api/press/edit/press_title', ensureAuthenticated, async (req, res) => {
    const pressId = req.body.id;
    const pressTitle = req.body.press_title;

    try {
        const press = await db.Press.findOne({where: {id: pressId}});
        if (!press) {
            return res.status(404).send('Press not found');
        }

        press.press_title = pressTitle;
        await press.save();

        return res.status(200).json(press);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.put('/api/press/edit/details', ensureAuthenticated, async (req, res) => {
    const pressId = req.body.id;
    const project_title = req.body.project_title;
    const quote = req.body.quote;
    const author = req.body.author;

    try {
        const press = await db.Press.findOne({where: {id: pressId}});
        if (!press) {
            return res.status(404).send('Press not found');
        }

        press.project_name = project_title;
        press.quote = quote;
        press.author = author;
        await press.save();

        return res.status(200).json(press);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
})

app.put('/api/press/edit/image', ensureAuthenticated, async (req, res) => {
    const pressId = req.body.id;
    const newImage = req.body.logo;

    try {
        const press = await db.Press.findOne({where: {id: pressId}});
        if (!press) {
            return res.status(404).send('Press not found');
        }

        press.press_image = newImage;
        await press.save();

        return res.status(200).json(press);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.put('/api/contact/edit/client_info', ensureAuthenticated, async (req, res) => {
    const newClientInfo = req.body.client_info;

    try {
        const contactpage = await db.Contactpage.findOne({where: {id: 1}});
        if (!contactpage) {
            return res.status(404).send('Contact page not found');
        }

        contactpage.client_info = newClientInfo;
        await contactpage.save();

        return res.status(200).json(contactpage);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
})

app.put('/api/contact/edit/agent_info', ensureAuthenticated, async (req, res) => {
    const newAgentInfo = req.body.agent_info;

    try {
        const contactpage = await db.Contactpage.findOne({where: {id: 1}});
        if (!contactpage) {
            return res.status(404).send('Contact page not found');
        }

        contactpage.agent_info = newAgentInfo;
        await contactpage.save();

        return res.status(200).json(contactpage);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
})

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
app.post('/api/contactpage', ensureAuthenticated, async (req, res) => {
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

// contact page send email
app.post('/api/sendEmail', async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    try{
        const response = await recieveEmail({
            email,
            firstName,
            lastName,
            message,
        })
        res.send(response);
    }catch (err){
        console.log('Email sent unsuccessfully.')
        res.status(500).send(err);
    }
});

app.get('/api/video/featured/film', async (req, res) => {
    const search = req.query;
    const title = Object.values(search).join();

    try {
        if (title) {
            const film = await db.Films.findOne({where: {title: title}});
            const video = await db.Videos.findOne({
                where: {
                    [Op.and]: [
                        {filmId: film.id},
                        {featured: true}
                    ]
                }
            });
            res.send(video);
        }
    } catch (err) {
        res.send(err);
    }
})

app.post('/api/film/homeSet', ensureAuthenticated, async (req, res,) => {
    const title = req.body.title;
    const url = req.body.url;

    try {
        await db.Films.update({homeId: 1}, {where: {title: title}});
        const film = await db.Films.findOne({where: {title: title}, attributes: ['id', 'title']});
        await db.Videos.update({ featured: false }, {where: {[Op.and]: [{featured: true}, {filmId: film.id}]}} )
        videoUpdated = await db.Videos.update({featured: true}, {where: {[Op.and]: [{video: url}, {filmId: film.id}]}})
        res.send(videoUpdated);
    } catch (err) {
        res.send(err);
    }
})

app.get('/api/feature/delete/film', ensureAuthenticated, async (req, res) => {
    const search = req.query;
    const id = Object.values(search).join();

    try {
        if (id) {
            const removedFeature = await db.Films.update({homeId: null}, {where: {id: id}});
            await db.Videos.update({ featured: false }, 
                { where: {
                    [Op.and]: [
                        {filmId: id},
                        {featured: true}
                    ]
                }
            });
            res.send(removedFeature);
        }
    } catch (err) {
        res.send(err);
    }
})

app.get('/api/delete/play', ensureAuthenticated, async (req, res) => {
    const search = req.query;
    const id = Object.values(search).join();
    try {
        if (id) {
            const removedPlay = await db.Plays.findOne({
                where: {id: id},
                include: [{ model: db.Buy_links, as: "buy_links" },
                          { model: db.Videos, as: "videos" },
                          { model: db.Still_photos, as: "still_photos" }]
            });
            if (!removedPlay) {
                return res.status(404).json({ error: 'Play not found' });
            }

            await removedPlay.destroy({
                include: [{ model: db.Buy_links },
                      { model: db.Videos },
                      { model: db.Still_photos }]
            });
            res.json({ message: 'Play deleted successfully' });
        }
    } catch (err) {
        res.send(err);
    }
})

app.get('/api/delete/press', ensureAuthenticated, async (req, res) => {
    const search = req.query;
    const id = Object.values(search).join();
    
    try {
        if (id) {
            const removedPress = await db.Press.findOne({where: {id: id}});
            if (!removedPress) {
                return res.status(404).json({ error: 'Press not found' });
            }

            await removedPress.destroy();
            res.json({ message: 'Press deleted successfully' });
        }
    } catch (err) {
        res.send(err);
    }
})

app.post('/api/homepage/film/create/video', ensureAuthenticated, async (req, res) => {
    const vidAdd = req.body;

    try {
        const film = await db.Films.findOne({where: {title: vidAdd.title}, attributes: ['id', 'title']})
        await db.Videos.update({ featured: false }, {where: {[Op.and]: [{featured: true}, {filmId: film.id}]}} )
        const video = await db.Videos.create({
            video: vidAdd.videoUrl, 
            filmId: film.id,
            featured: true
        })
        .then(db.Films.update({homeId: 1}, {where: {id: film.id}}))
        res.send(video);
    } catch (err) {
        res.send(err);
    }
});

app.put('/api/homepage/photo', ensureAuthenticated, async (req, res) => {
    const photo = req.body.photo;

    try {
        const homepage = await db.Homepage.findOne({where: {id: 1}});
        if (!homepage) {
            return res.status(404).send('Homepage not found');
        }

        homepage.client_photo = photo;
        await homepage.save();
        return res.status(200).json(homepage);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.put("/api/homepage/edit/about", ensureAuthenticated, async (req, res) => {
    const desc = req.body.about_des;

    try {
        const homepage = await db.Homepage.findOne({where: {id: 1}});
        if (!homepage) {
            return res.status(404).send('Homepage not found');
        }

        homepage.about_des = desc;
        await homepage.save();
        return res.status(200).json(homepage);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

// Uploads video(s) to s3 bucket and saves the url in database
app.post('/api/upload/files', upload.array('files', 5), ensureAuthenticated, (req, res) => {
    const uploadedFiles = req.files;
    const urls = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
        const url = `https://s3-${s3.config.region}.amazonaws.com/${uploadedFiles[i].bucket}/${uploadedFiles[i].key}`;
        urls.push(url);
    }

    console.log(urls);
    res.send(urls);
});

app.put('/api/films/photo', ensureAuthenticated, async (req, res) => {
    const photo = req.body.photo;
    const filmId = req.body.id;

    try {
        const film = await db.Films.findOne({where: {id: filmId}}); 
        if (!film) {
          return res.status(404).send('Film not found');
        }
    
        // Update photo
        film.photo = photo;
        await film.save();
    
        return res.status(200).json(film); 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.put('/api/films/edit/title', ensureAuthenticated, async (req, res) => {
    const filmId = req.body.id;
    const newTitle = req.body.newTitle;

    try {
        const film = await db.Films.findOne({where: {id: filmId}});
        if (!film) {
            return res.status(404).send('Film not found');
        }

        film.title = newTitle;
        await film.save();

        return res.status(200).json(film);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.put('/api/films/edit/details', ensureAuthenticated, async (req, res) => {
    const filmId = req.body.id;
    const newDirector = req.body.newDirector;
    const newWriter = req.body.newWriter;
    const newStars = req.body.newStars;
    const newStatus = req.body.newStatus;
    const newDesc = req.body.newDesc;

    try {
        const film = await db.Films.findOne({where: {id: filmId}});
        if (!film) {
            return res.status(404).send('Film not found');
        }

        film.director = newDirector;
        film.screenplay = newWriter;
        film.stars = newStars;
        film.status = newStatus;
        film.description = newDesc;
        await film.save();

        return res.status(200).json(film);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.put('/api/films/add/buy_link', ensureAuthenticated, async (req, res) => {
    const filmId = req.body.id;
    const newBuyLink = req.body.newBuyLink;
    const newBuyLinkImg = req.body.newBuyLinkImg;

    try {
        const film = await db.Films.findOne({where: {id: filmId}});
        if (!film) {
            return res.status(404).send('Film not found');
        }

        const buy_link = db.Buy_links.create({
            link: newBuyLink, 
            link_photo: newBuyLinkImg,
            filmId: film.id
        });

        return res.status(200).json(buy_link);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.put('/api/plays/photo', ensureAuthenticated, async (req, res) => {
    const photo = req.body.photo;
    const playId = req.body.id;

    try {
        const play = await db.Plays.findOne({where: {id: playId}}); 
        if (!play) {
          return res.status(404).send('Play not found');
        }
    
        // Update photo
        play.photo = photo;
        await play.save();
    
        return res.status(200).json(play); 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.put('/api/plays/edit/title', ensureAuthenticated, async (req, res) => {
    const playId = req.body.id;
    const newTitle = req.body.newTitle;

    try {
        const play = await db.Plays.findOne({where: {id: playId}});
        if (!play) {
            return res.status(404).send('Play not found');
        }

        play.title = newTitle;
        await play.save();

        return res.status(200).json(play);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.put('/api/plays/edit/details', ensureAuthenticated, async (req, res) => {
    const playId = req.body.id;
    const newWriter = req.body.newWriter;
    const newProduction = req.body.newProduction;
    const newDev = req.body.newDev;
    const newDesc = req.body.newDesc;

    try {
        const play = await db.Plays.findOne({where: {id: playId}});
        if (!play) {
            return res.status(404).send('Play not found');
        }

        play.writer = newWriter;
        play.productions = newProduction;
        play.development = newDev;
        play.description = newDesc;
        await play.save();

        return res.status(200).json(play);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.put('/api/plays/add/buy_link', ensureAuthenticated, async (req, res) => {
    const playId = req.body.id;
    const newBuyLink = req.body.newBuyLink;
    const newBuyLinkImg = req.body.newBuyLinkImg;

    try {
        const play = await db.Plays.findOne({where: {id: playId}});
        if (!play) {
            return res.status(404).send('Play not found');
        }

        const buy_link = db.Buy_links.create({
            link: newBuyLink, 
            link_photo: newBuyLinkImg,
            playId: play.id
        });

        return res.status(200).json(buy_link);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app.get('/api/delete/buyLink', ensureAuthenticated, async (req, res) => {
    const search = req.query;
    const id = Object.values(search).join();

    try {
        if (id) {
            const buy_link = await db.Buy_links.findOne({where: {id: id}});
            if (!buy_link) {
                return res.status(404).json({ error: 'Buy link not found' });
            }

            await buy_link.destroy(); 
            res.json({ message: 'Buy link deleted successfully' });
        }
    } catch (err) {
        res.send(err);
    }
});

app.get('/api/delete/video', ensureAuthenticated, async (req, res) => {
    const search = req.query;
    const id = Object.values(search).join();

    try {
        if (id) {
            const video = await db.Videos.findOne({where: {id: id}});
            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }

            await video.destroy(); 
            res.json({ message: 'Video deleted successfully' });
        }
    } catch (err) {
        res.send(err);
    }
});

app.get('/api/delete/photo', ensureAuthenticated, async (req, res) => {
    const search = req.query;
    const id = Object.values(search).join();

    try {
        if (id) {
            const photo = await db.Still_photos.findOne({where: {id: id}});
            if (!photo) {
                return res.status(404).json({ error: 'Photo not found' });
            }

            await photo.destroy(); 
            res.json({ message: 'Photo deleted successfully' });
        }
    } catch (err) {
        res.send(err);
    }
});

app.post('/api/play/create/video', ensureAuthenticated, async (req, res) => {
    const vidAdd = req.body;

    try {
        const play = await db.Plays.findOne({where: {title: vidAdd.title}, attributes: ['id', 'title']})
        const video = await db.Videos.create({
            video: vidAdd.videoUrl, 
            playId: play.id,
            featured: false
        })

        res.send(video);
    } catch (err) {
        res.send(err);
    }
});

app.post('/api/play/create/photo', ensureAuthenticated, async (req, res) => {
    const photoAdd = req.body;

    try {
        const play = await db.Plays.findOne({where: {title: photoAdd.title}, attributes: ['id', 'title']})
        const photo = await db.Still_photos.create({
            photo: photoAdd.photoUrl, 
            playId: play.id,
            featured: false
        })

        res.send(photo);
    } catch (err) {
        res.send(err);
    }
});

app.post('/api/film/create/video', ensureAuthenticated, async (req, res) => {
    const vidAdd = req.body;

    try {
        const film = await db.Films.findOne({where: {title: vidAdd.title}, attributes: ['id', 'title']})
        const video = await db.Videos.create({
            video: vidAdd.videoUrl, 
            filmId: film.id,
            featured: false
        })

        res.send(video);
    } catch (err) {
        res.send(err);
    }
});

app.post('/api/film/create/photo', ensureAuthenticated, async (req, res) => {
    const photoAdd = req.body;

    try {
        const film = await db.Films.findOne({where: {title: photoAdd.title}, attributes: ['id', 'title']})
        const photo = await db.Still_photos.create({
            photo: photoAdd.photoUrl, 
            filmId: film.id,
            featured: false
        })

        res.send(photo);
    } catch (err) {
        res.send(err);
    }
});

// Passport authentication strategy
passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const admin = await db.Admin.findOne({ where: { email } });
      if (!admin) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (!passwordMatches) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, admin);
    } catch (err) {
      return done(err);
    }
}));

// Serialization and deserialization functions for passport
passport.serializeUser((admin, done) => {
    done(null, admin.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
      const admin = await db.Admin.findByPk(id);
      done(null, admin);
    } catch (err) {
      done(err);
    }
});

app.use(flash());

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, admin, info) => {
      if (err) { return next(err); }
      if (!admin) { 
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
      req.logIn(admin, (err) => {
        if (err) { return next(err); }
        return res.json({ message: 'Successfully authenticated.' });
      });
    })(req, res, next);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('An error occurred.');
});

app.get('/check_auth', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
};

//delete films from data and associated dependencies 
app.delete('/api/films/:id', ensureAuthenticated,(req, res) => {
    const filmId = req.params.id;
    // Delete any associated reviews first
    db.Videos.destroy({ where: { filmId : filmId } })
        .then(() => {
            // Delete any associated videos
            return db.Still_photos.destroy({ where: { filmId: filmId } });
        })
        .then(() => {
            // Delete any associated cast members
            return db.Buy_links.destroy({ where: { filmId: filmId } });
        })
        .then(() => {
            // Once all associated records have been deleted, delete the film itself
            return db.Films.destroy({ where: { id: filmId } });
        })
        .then(() => {
            res.status(204).send(); // Return a 204 No Content response if the delete was successful
        })
        .catch(error => {
            console.error("Error deleting film: ", error);
            res.status(500).json({ error: "Failed to delete film" }); // Return a 500 Internal Server Error response if there was an error
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
    const passwordMatch = bcrypt.compareSync(password, admin.password);
    if (!passwordMatch) {
        throw new Error("Incorrect password");
    }
    return true;
}

// Uses above function to see if email and password are valid
app.post("/api/admin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  try {
    const result = await validatePassword(email, password);
    res.send({ success: true, email: email, password: password });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
})

// Route to handle forget password request
// Route to handle forget password request
app.post('/api/forgot-password', async (req, res) => {
	console.log('Forgot Password', req.body.email);
	const { email } = req.body;
	try {
		const user = await db.Admin.findOne({ where: { email } });

		if (!user) {
			return res.status(404).send('User not found');
		}

		// Generate password reset token and save to database
		// const token = bcrypt.hashSync(email + Date.now(), 10);
		const token = uuidv4();
		// await db.PasswordReset.create({
		// 	email,
		// 	token,
		// });

		// udpate user token
		await user.update({ passwordResetToken: token.split('-')[4] });

		// Send password reset email to user
		const resetLink = `${process.env.FRONTEND_URL}/#/reset-password?token=${token}`;

		const response = await sendEmail({
			email,
			subject: 'Resest your password',
			message: ` <p>You have requested to reset your password. Please click the link below to reset your password:</p>
			<a href="${resetLink}">${resetLink}</a>`,
		});

		res.send('Password reset email sent');
	} catch (err) {
		console.log('this is error');
		res.status(500).send(err);
	}
});
  
// Route to handle password reset request
app.post('/api/reset-password', async (req, res) => {
	const { token, password } = req.body;

	try {
		const user = await db.Admin.findOne({
			where: { passwordResetToken: token.split('-')[4] },
		});
		if (!user) {
			return res.status(404).send('Invalid or expired token');
		}

		// Update user password in the database
		// const user = await db.User.findOne({
		// 	where: { email: passwordReset.email },
		// });
		const hashedPassword = bcrypt.hashSync(password, 10);
		await user.update({ password: password, passwordResetToken: '' });

		// Delete the password reset token from the database
		// await db.PasswordReset.destroy({ where: { passwordResetToken:token } });

		res.send('Password updated successfully');
	} catch (err) {
		res.status(500).send(err);
	}
});
  
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

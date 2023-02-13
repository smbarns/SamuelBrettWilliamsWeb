const express = require('express')
const path = require('path');
const db = require('./models');
const bcrypt = require("bcrypt");
const db_filter_films = require('./controllers/films_controller.js');
const db_filter_plays = require('./controllers/plays_controller.js');

module.exports = {
    validatePassword,
    express
}

const app = express();
const PORT = 3000;
const saltRounds = 10;

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
        const homepage = await db.Homepage.create(data);
        res.send(homepage);
    } catch (err) {
        res.send(err);
    }
});

app.get('/api/bio', async (req, res) => {
    try {
        const bio = await db.Bio.findAll({
            attributes: ['id', 'Bio']
        });
        res.send(bio);
    } catch (err) {
        res.send(err);
    }
});

app.get('/api/bio/client_photo', async (req, res) => {
    try {
        const bio = await db.Bio.findAll({
            attributes: ['id', 'client_photo']
        });
        res.send(bio);
    } catch (err) {
        res.send(err);
    }
});

app.post("/api/bio", async (req, res) => {
    const data = req.body;
    try {
        const bio = await db.Bio.create(data);
        res.send(bio);
    } catch (err) {
        res.send(err);
    }
});

app.get('/api/films', async (req, res) => {
    const search = req.query;

    try {
        if (search) {
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

app.post("/api/films", async (req, res) => {
    const data = req.body;
    try {
        const films = await db.Films.create(data);
        res.send(films);
    } catch (err) {
        res.send(err);
    }
});

app.get('/api/plays', async (req, res) => {
    const search = req.query;

    try {
        if (search) {
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

app.post("/api/plays", async (req, res) => {
    const data = req.body;
    try {
        const plays = await db.Plays.create(data);
        res.send(plays);
    } catch (err) {
        res.send(err);
    }
});

//Press api for quotes
app.get("/api/press", async (req,res)=>{
    const data= req.body;
    try{
        const quote = await db.quote.findAll({
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
        const press_image = await db.press_image.findAll({
            attributes: ['id', 'press_image']
        });
        res.send(press_image);
    } catch (err) {
        res.send(err);
    }
})

//Press api for press link
app.get("/api/press/press_link", async (req,res)=>{
    const data= req.body;
    try{
        const press_link = await db.press_link.findAll({
            attributes: ['id', 'press_link']
        });
        res.send(press_link);
    } catch (err) {
        res.send(err);
    }
})

//Press api for author
app.get("/api/press/author", async (req,res)=>{
    const data= req.body;
    try{
        const press_authorlink = await db.author.findAll({
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

db.Admin.beforeUpdate((admin, options) => {
    admin.password = bcrypt.hashSync(admin.password, saltRounds);
});

db.Admin.beforeCreate((admin, options) => {
    return bcrypt.hash(admin.password, saltRounds).then(hashedPassword => {
        admin.password = hashedPassword;
    });
});

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

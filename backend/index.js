const express = require('express')
const path = require('path');
const db = require('./models');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/index.html'));
});

app.get('/api/homepage', async (req, res) => {
    try {
        const homepage = await db.Homepage.findAll({
            include: [db.Films]
        });
        res.send(homepage);
    } catch (err) {
        res.send(err);
    }
});

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

app.post("/api/bio"), async (req, res) => {
    const data = req.body;
    try {
        const bio = await db.Bio.create(data);
        res.send(bio);
    } catch (err) {
        res.send(err);
    }
}

app.get('/api/films', async (req, res) => {
    try {
        const films = await db.Bio.findAll({
            include: [db.Films]
        });
        res.send(films);
    } catch (err) {
        res.send(err);
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const films = await db.Bio.findAll({
          attributes: ['id', 'title', 'film_photo', 'director', 'writer', 'stars', 'status', 'description', 'type_film' ]
        });
        res.send(films);
    } catch (err) {
        res.send(err);
    }
});

app.post("/api/films"), async (req, res) => {
    const data = req.body;
    try {
        const films = await db.Films.create(data);
        res.send(films);
    } catch (err) {
        res.send(err);
    }
}

app.get('/api/plays', async (req, res) => {
    try {
        const films = await db.plays.findAll({
            include: [db.Plays]
        });
        res.send(plays);
    } catch (err) {
        res.send(err);
    }
});

app.get('/api/plays', async (req, res) => {
    try {
        const films = await db.Bio.findAll({
          attributes: ['id', 'title', 'play_photo', 'writer', 'description', 'play_linkl', 'link_photo', 'type_play']
        });
        res.send(films);
    } catch (err) {
        res.send(err);
    }
});

app.post("/api/plays"), async (req, res) => {
    const data = req.body;
    try {
        const plays = await db.Plays.create(data);
        res.send(plays);
    } catch (err) {
        res.send(err);
    }
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

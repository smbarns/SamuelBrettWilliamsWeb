const express = require('express')
const db = require('./models');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get('/api/homepage', async (req, res) => {
    try {
        const homepage = await db.Homepage.findall({
            include: [db.Films]
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

db.sequelize.sync().then(
    (result) => {
    app.listen(PORT, (() => {
        console.log('Server started on port 3000');
    }))
})
.catch((err) => {
    console.log(err);
});

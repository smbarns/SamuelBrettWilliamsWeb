const express = require('express')
const db = require('./models');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.send('Hello World');
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

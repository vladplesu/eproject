let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

let app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

let router = express.Router();

router.post('/register', function (req, res) {
    let user = { table: [{ email: req.body.useremail }] };
    let obj = JSON.stringify(user);
    fs.readFile('public/subscribers.json', function (err, data) {
        if (err && err.code === 'ENOENT') {
            return fs.writeFileSync('public/subscribers.json', obj, error => console.error);
        } else if (err) {
            console.error(err);
        } else {
            try {
                const fileData = JSON.parse(data);

                fileData.table.push(obj);

                return fs.writeFileSync('public/subscribers.json', fileData, error => console.error);
            } catch (exception) {
                console.error(exception);
            }
        }
    });
});

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require('path');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

let router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
})

router.get('/products', function(req,res) {
    res.sendFile(path.join(__dirname + '/../products.html'));
})

router.post('/register', [body('useremail').isEmail().normalizeEmail(), sanitizeBody('notifyOnReply').toBoolean()], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let user = { email: req.body.useremail };
    fs.readFile('public/data/subscribers.json', function (err, data) {
        if (err && err.code === 'ENOENT') {
            let obj = [];
            obj.push(user);
            fs.writeFileSync('public/data/subscribers.json', JSON.stringify(obj), error => console.error);
        } else if (err) {
            console.error(err);
        } else {
            try {
                const fileData = JSON.parse(data);

                fileData.push(user);

                fs.writeFileSync('public/data/subscribers.json', JSON.stringify(fileData), error => console.error);
            } catch (exception) {
                console.error(exception);
            }
        }
    });
    res.send('Your mail has been successfully added to our database');
});

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
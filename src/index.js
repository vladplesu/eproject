let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

let router = express.Router();

router.post('/register', [body('useremail').isEmail().normalizeEmail(), sanitizeBody('notifyOnReply').toBoolean()], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let user = { email: req.body.useremail };
    fs.readFile('public/subscribers.json', function (err, data) {
        if (err && err.code === 'ENOENT') {
            let obj = [];
            obj.push(user);
            fs.writeFileSync('public/subscribers.json', JSON.stringify(obj), error => console.error);
        } else if (err) {
            console.error(err);
        } else {
            try {
                const fileData = JSON.parse(data);

                fileData.push(user);

                fs.writeFileSync('public/subscribers.json', JSON.stringify(fileData), error => console.error);
            } catch (exception) {
                console.error(exception);
            }
        }
    });
    res.send('success');
});

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
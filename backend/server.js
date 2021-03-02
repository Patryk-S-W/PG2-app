const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const db = require('./database/queries.js');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(compression())
app.use(helmet())

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
})

app.use(limiter)

// TODO: uporządkuj ścieżki
// TODO: dodaj authorize
app.get('/users', db.getUsers);
app.get('/users/project/:pid', db.getUsersByProject);


app.get('/comments', db.getComments);
app.get('/comments/project/:pid', db.getCommentsByProjectId);
// TODO: dodawanie komentarza do projektu

app.get('/raports', db.getRaports);
app.get('/raports/project/:pid', db.getRaportsByProject);

// api routes
app.use('/projects', require('./projects/projects.controller'))
app.use('/raports', require('./raports/raports.controller'));
app.use('/users', require('./users/users.controller'));

app.get('/', (request, response) => {
	response.json({ info: 'API' });
});


const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://projektygrupowe.ftims.pg.edu.pl' : '*',
}
app.use(cors(origin))
const port = isProduction ? 80 : 4000;
const server = app.listen(port, () => console.log('Server listening on port '+ port));

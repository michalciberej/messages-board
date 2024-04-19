import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', 'src/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { messages });
});

app.use('/new', (req, res) => {
  if (req.method === 'POST') {
    const { text, user } = req.body;
    messages.push({ text, user, added: new Date() });
    res.redirect('/');
  }

  if (req.method === 'GET') {
    res.sendFile('views/form.html', { root: '.' });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

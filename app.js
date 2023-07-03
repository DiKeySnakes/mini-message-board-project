require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

const dbURI = process.env.dbURI;
const PORT = process.env.PORT;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/messages');
});

app.use('/messages', messageRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

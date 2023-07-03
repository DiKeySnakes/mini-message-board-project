const Message = require('../models/message');

const message_index = (req, res) => {
  Message.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { messages: result, title: 'All messages' });
    })
    .catch((err) => {
      console.log(err);
    });
};

const message_create_get = (req, res) => {
  res.render('create', { title: 'Create a new message' });
};

const message_create_post = (req, res) => {
  const message = new Message(req.body);
  message
    .save()
    .then((result) => {
      res.redirect('/messages');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  message_index,
  message_create_get,
  message_create_post,
};

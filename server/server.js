// this is our server
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const imgController = require('./controllers/imgController');

app.use(express.json());
app.use(cookieParser());
app.use(express.static('assets'));

app.get('/', authController.createGeneralCookie, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.post('/images', (req, res) => {});

app.get('/imageTags', (req, res) => {});

app.get('/zip', imgController.addTaggedImages, (req, res) => {
  console.log('res.locals.zippedFolder: ', res.locals.zippedFolder);
  return res.status(200).send(res.locals.zippedFolder);
});

// use this route to test or debug individual middleware one by one
app.post('/test', userController.createUser, (req, res) => {
  res.redirect('/');
});

app.post(
  '/login',
  userController.verifyUser,
  authController.createUserCookie,
  authController.startSession,
  (req, res) => {
    res.redirect('/');
  }
);

app.post(
  '/signup',
  userController.checkUnique,
  userController.createUser,
  authController.createUserCookie,
  authController.startSession,
  (req, res) => {
    res.redirect('/');
  }
);

app.use('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
  res.status(500).send(`Error: ${err}`);
});

// app.get('/build/bundle.js', (req, res) => {
//   res.status(200).sendFile(path.resolve(__dirname, '../build/bundle.js'));
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

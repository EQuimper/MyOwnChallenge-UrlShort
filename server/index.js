import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import compression from 'compression';
import morgan from 'morgan';
import urlRoutes from './modules/url/UrlRoutes';

const app = express();

app.use(compression());

const PORT = process.env.PORT || 3000;

let mongoConf;

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');

  app.use(webpackMiddleware(webpack(webpackConfig)));
  mongoConf = 'mongodb://localhost/url';
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  mongoConf = process.env.MONGO_URL;
}

/*
* DATABASE
*/
mongoose.Promise = global.Promise;
mongoose.connect(mongoConf);
mongoose.connection
  .once('open', () => console.log(`Connected to MongoDb`)) // eslint-disable-line
  .on('error', err => console.warn('Warning', err)); // eslint-disable-line

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use([urlRoutes]);

app.listen(PORT, err => {
  if (err) return console.log(err); // eslint-disable-line
  console.log(`App listen to port: ${PORT}`); // eslint-disable-line
});

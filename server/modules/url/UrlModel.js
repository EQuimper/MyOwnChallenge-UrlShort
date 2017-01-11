import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const UrlSchema = new Schema({
  longUrl: { type: String, unique: true, required: true },
  shortUrl: {
    type: String,
    maxlength: [6, 'Error with the length!'],
    unique: true
  }
}, { timestamps: true });

// function for make a unique shortUrl
const makeUniqueUrl = len =>
  crypto
    .randomBytes(Math.ceil(len * (3 / 4)))
    .toString('base64')
    .slice(0, len)
    .replace(/\+/g, '0')
    .replace(/\//g, '0');

// function for add http in front of url who don't have it
// we need that for redirect external
const addHtpp = url => {
  const pattern = /^((http|https|ftp):\/\/)/;

  if (!pattern.test(url)) {
    url = `http://${url}`; // eslint-disable-line
  }
  return url;
};

const Url = mongoose.model('Url', UrlSchema);

// make a unique short url + add http if not before saving
UrlSchema.pre('save', true, function(next, done) {
  this.shortUrl = makeUniqueUrl(6);
  this.longUrl = addHtpp(this.longUrl);
  // if we have already this shortUrl we just keep doing until we have a random one
  mongoose.models.Url.findOne({ shortUrl: this.shortUrl })
    .then(url => {
      if (url) {
        this.shortUrl = makeUniqueUrl(6);
      }
      return done();
    })
    .catch(err => done(err));
  next();
});

export default Url;

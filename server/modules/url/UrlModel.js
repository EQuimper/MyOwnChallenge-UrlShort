import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const UrlSchema = new Schema({
  longUrl: { type: String, unique: true, required: true },
  shortUrl: {
    type: String,
    maxlength: [6, 'Error with the length!'],
    unique: true
  }
});

const makeUniqueUrl = len => {
  return crypto
    .randomBytes(Math.ceil(len * (3 / 4)))
    .toString('base64')
    .slice(0, len)
    .replace(/\+/g, '0')
    .replace(/\//g, '0');
};

const Url = mongoose.model('Url', UrlSchema);

UrlSchema.pre('save', true, function(next, done) {
  this.shortUrl = makeUniqueUrl(6);
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

import mongoose, { Schema } from 'mongoose';

const UrlSchema = new Schema({
  longUrl: { type: String, unique: true, required: true },
  shortUrl: {
    type: String,
    maxlength: [6, 'Error with the length!'],
    unique: true
  }
});

const makeUniqueUrl = url => {

}

UrlSchema.pre('save', function(next) {
  makeUniqueUrl(this.longUrl);
  this.shortUrl = '123457';
  next();
});

const Url = mongoose.model('Url', UrlSchema);

export default Url;

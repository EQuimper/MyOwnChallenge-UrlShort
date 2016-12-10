import mongoose, { Schema } from 'mongoose';

const UrlSchema = new Schema({
  real_url: {
    type: String,
    unique: true
  },
  short_url: {
    type: String,
    maxlength: [6, 'Error with the length!'],
    unique: true
  }
});

export default mongoose.model('Url', UrlSchema);

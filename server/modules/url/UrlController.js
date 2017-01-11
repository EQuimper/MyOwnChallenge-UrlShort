import { isURL } from 'validator';
import Url from './UrlModel';

export const createShort = (req, res) => {
  let longUrl = req.body.longUrl;

  // validation
  if (!longUrl) {
    return res.status(400).json({ success: false, message: 'You must provided a url!' });
  } else if (!isURL(longUrl)) {
    return res.status(400).json({ success: false, message: 'You must provided a valid url!' });
  }

  // if user send url who don't have http we need to match the db
  const pattern = /^((http|https|ftp):\/\/)/;

  if (!pattern.test(longUrl)) {
    longUrl = `http://${longUrl}`; // eslint-disable-line
  }

  // search if we have already a url save
  return Url.findOne({ longUrl })
    .then(url => {
      // if not we created a new one
      if (!url) {
        const newUrl = new Url({ longUrl });
        return newUrl.save()
          .then(u => res.status(201).json({ success: true, url: u }))
          .catch(err => {
            let errors;
            if (err.code === 11000) {
              errors = 'This url is already use';
            }
            return res.status(400).json({ success: false, errors });
          });
      }
      // if yes we return the url
      return res.status(200).json({ success: true, url });
    })
    .catch(err => res.status(400).json({ success: false, message: err }));
};

export const redirectLong = (req, res) => {
  const { shortUrl } = req.params;

  return Url.findOneAndUpdate({ shortUrl }, { $inc: { visits: 1 } })
    .then(url => {
      // if we dont find a url we redirect back to home page
      if (!url) { return res.redirect('/').json({ success: false, message: 'This url not exist in the system' }); }
      // we redirect to external url
      return res.redirect(url.longUrl);
    })
    .catch(err => res.redirect('/').json({ success: false, message: err }));
};

export const getTop5 = (req, res) =>
  Url.find({})
    .sort({ visits: -1 })
    .limit(5)
    .then(
      urls => res.status(200).json({ success: true, urls }),
      () => res.status(500).json({ success: false, error: 'Something go wrong in the server!' })
    );

import { isURL } from 'validator';
import Url from './UrlModel';

export const createShort = (req, res) => {
  const { longUrl } = req.body;

  // validation
  if (!longUrl) {
    return res.status(400).json({ success: false, message: 'You must provided a url!' });
  } else if (!isURL(longUrl)) {
    return res.status(400).json({ success: false, message: 'You must provided a valid url!' });
  }

  Url.findOne({ longUrl })
    .then(url => {
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
      return res.status(200).json({ success: true, url });
    })
    .catch(err => res.status(400).json({ success: false, message: err }));
};

import Url from './UrlModel';

export const createShort = (req, res) => {
  const { longUrl } = req.body;
  const newUrl = new Url({ real_url: longUrl });

  newUrl.save()
    .then(url => res.status(200).json({ success: true, url }))
    .catch(err => {
      let errors;
      if (err.code === 11000) {
        errors = 'This url is already use';
      }
      res.status(400).json({ success: false, errors });
    });
};

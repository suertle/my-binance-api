const hmac = require('utils/hmac');

export default function handler(req, res) {
  const { slug } = req.query;
  delete req.query.slug;

  const signedQuery = hmac.sign(req.query);

  res.status(200).json({ signedQuery });
}

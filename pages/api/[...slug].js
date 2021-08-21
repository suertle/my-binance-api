const hmac = require('utils/hmac');
const axios = require('axios');

export default function handler(req, res) {
  const { slug } = req.query;
  delete req.query.slug;

  const signedQuery = hmac.sign(req.query);

  axios.get(process.env.BINANCE_API_URL + `/api/${ slug.join('/') }`)
  .then(response => {
    res.status(200).json({ xxx: response.data });
  });
}

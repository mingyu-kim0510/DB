/**
 * Uracle Morpheus GW API 규격 처리를 위한 미들웨어
 */

const httpStatus = require('http-status');

const overwrite = (req) => {
  if (req.body.id !== undefined) {
    req.params.id = req.body.id;
  }
};

const intercept = (req, res, next) => {
  if (req.method === 'POST') {
    const { body: innerBody = {}, head: innerHead = {} } = req.body || {};
    req.body = innerBody;

    overwrite(req);

    const beforeSend = res.send;
    res.send = function interceptor(body = {}) {
      res.send = beforeSend;

      if (res.statusCode !== httpStatus.OK) {
        if (!res.statusCode === httpStatus.NO_CONTENT) {
          return res.send(body);
        }
        res.status(httpStatus.OK);
      }

      innerHead.result_code = '200';
      innerHead.result_msg = 'Success';
      res.send({
        head: innerHead,
        body,
      });
    };
  }
  next();
};

module.exports = intercept;

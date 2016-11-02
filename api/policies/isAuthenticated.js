module.exports = function (req, res, next) {

  if ( !req.headers || !req.headers.authorization )
    return res.json(401, {err: 'No Authorization header was found'});

  var parts = req.headers.authorization.split(' ');
  if ( parts.length !== 2 )
    return res.json(401, {err: 'Format is Authorization: Bearer [token]'});

  var scheme = parts[0];
  var credentials = parts[1];

  if (/^Bearer$/i.test(scheme) === false)
    return res.json(400, {err: 'Bad Authorization header'});

  var token = credentials;

  jwToken.verify(token, function (err, token) {
    if ( err )
      return res.json(401, {err: 'Invalid Token!'});
    req.token = token; // This is the decrypted token or the payload you provided
    next();
  });
  
};
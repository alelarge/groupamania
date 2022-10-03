const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  try {
    // Extract the token from the string contained in the authorization header
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    User.findOneById(userId)
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé!' });
        }
        req.auth = { userId: userId, user: user };
        if (req.body.userId && req.body.userId !== userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
      })
      .catch(error => res.status(500).json({ error }));

  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
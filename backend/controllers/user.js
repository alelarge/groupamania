const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User =  require('../models/user');

exports.signup = (req, res,next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
       .then(hash => {
           const user = {
               ...req.body,
               password : hash
           };
           User.create(user)
               .then(() => res.status(201).json({message : 'Utilisateur crée'}))
               .catch(error => res.status(400).json({error}));
       })
       .catch(error => res.status(500).json({error}));
};
   
exports.login = (req, res, next) => {
    User.findOne(req.body.email)
       .then(user =>{
           if(!user){
               return res.status(401).json({error : 'Utilisateur non trouvé!' });
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if(!valid) {
                       return res.status(401).json({error : 'Mot de passe incorrect!' });
                   }
                   res.status(200).json({
                       userId: user.id,
                       isAdmin: user.is_admin,
                       token: jwt.sign(
                           { userId: user.id },
                           'RANDOM_TOKEN_SECRET',
                           { expiresIn: '24h' }
                       )
                   });
               })
               .catch(error => res.status(500).json({error}));
       })
       .catch(error => res.status(500).json({error}));
};
const jwt = require('jsonwebtoken');

const verificarAuth = (req, res, next) => {

  const token = req.get('token');

  jwt.verify(token, 'secret', (err, decoded) => {

    if(err){
      return res.status(401).json({
        mensaje: 'Usuario no válido'
      })
    }

    req.usuario = decoded.data;

    next();

  })

}

const verificarAdministrador = (req, res, next) => {

  const rol = req.usuario.role

  if(rol === 'ADMIN'){
    next();
  }else{
    return res.status(401).json({
      mensaje: 'Usuario no válido'
    })
  }

}

module.exports = {verificarAuth, verificarAdministrador}
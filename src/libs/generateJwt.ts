import jwt from 'jsonwebtoken';

export const generateToken = (Uid: string): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    //verifico que la llave secreta exista
    if (!process.env.SECRET_KEY_JWT) {
      reject(new Error('La clave secreta no está configurada.'));
      return;
    }
    //payload y configuracion del jwt
    const payload = {
      Uid
    };
    const options = {
      expiresIn: '4h',
    };
    //genera el jwt
    jwt.sign(payload, process.env.SECRET_KEY_JWT, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};
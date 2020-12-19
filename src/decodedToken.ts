import jwt from 'jsonwebtoken';

const decodedToken = ({ req }, requireAuth = true) => {
  const header = req.headers.authorization;
  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secret');
    return decoded;
  }
  if (requireAuth) {
    throw new Error('Login!');
  }
  return null;
};

export default decodedToken;

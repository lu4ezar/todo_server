import expressJwt from 'express-jwt';

export default expressJwt({
  secret: process.env.SECRET || '',
  algorithms: ['HS256'],
  credentialsRequired: false,
});

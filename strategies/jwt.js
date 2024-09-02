const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// jwt strategy to only allow me to access protected routes
module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
  console.log("JWT Payload: ", jwt_payload);

  if (jwt_payload.username === process.env.ADMIN_USER) {
    return done(null, jwt_payload);
  }

  return done(null, false);
});

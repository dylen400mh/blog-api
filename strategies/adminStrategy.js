const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;
opts.passReqToCallback = true;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// jwt strategy to only allow me to access protected routes
module.exports = new JwtStrategy(opts, async (req, jwt_payload, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: process.env.ADMIN_USER,
      },
    });
    if (user && user.username === jwt_payload.username) {
      req.user = user;
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

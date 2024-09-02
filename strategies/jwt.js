const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: jwt_payload.email,
      },
    });

    if (user) {
      return done(null, true);
    }

    return done(null, false);
  } catch (err) {
    return next(err);
  }
});

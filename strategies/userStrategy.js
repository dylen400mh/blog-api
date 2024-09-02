const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: jwt_payload.id,  // Authenticate any valid user by ID from the JWT payload
      },
    });

    if (user) {
      return done(null, user);  // Attach the authenticated user to req.user
    } else {
      return done(null, false);  // Authentication failed
    }
  } catch (err) {
    return done(err, false);  // Handle any errors
  }
});

module.exports = userStrategy;
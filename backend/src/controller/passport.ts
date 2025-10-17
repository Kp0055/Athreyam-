import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User/user'; // Import User model

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET_ID as string,
            callbackURL: 'http://localhost:5000/api/auth/google/callback',
            passReqToCallback: true,
        },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists in the database
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // If user doesn't exist, create a new one
                    user = new User({
                        googleId: profile.id,
                        firstName: profile.name?.givenName || '',
                        lastName: profile.name?.familyName || '',
                        email: profile.emails?.[0].value || '',
                    });

                    await user.save();
                }

                // Return the user object, ensure it’s a plain object
                return done(null, user.toObject());
            } catch (error) {
                return done(error, null as any); // Handle any errors
            }
        }
    )
);

// Serialize user to store only the user ID in the session
passport.serializeUser((user: any, done) => {
    console.log('Serializing User:', user);
    done(null, user._id); // Store user._id in session
});

// Deserialize user from session using the user ID
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        console.log('Deserialized User:', user);
        done(null, user); // Return the full user object
    } catch (error) {
        console.error('Error deserializing user:', error);
        done(error, null);
    }
});
export default passport 
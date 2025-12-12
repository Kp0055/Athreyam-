import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

export const googleAuthCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
        if (err || !user) {
            console.error('Google Auth Error:', err);
            return res.redirect('/login');
        }


        // ✅ Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        // ✅ Send JWT to frontend via cookie or query param
        // Option 1: Send token as HTTP-only cookie (secure)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

          return res.redirect('http://localhost:3000/');
    })(req, res, next);
};

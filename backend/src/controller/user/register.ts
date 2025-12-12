import User from '../../models/User/user';
import bcrypt from "bcryptjs"

export const registerUser = async (req: any, res: any) => {
    const { firstName, lastName, userName, email, gender, dob, password } = req.body;

    try {
        console.log(firstName, lastName, userName, email, gender, dob, password, 'Received data');

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password,salt);

        if(!hashedPassword){
            throw new Error('password hashing failed')
        }

            const newUser = new User({
                firstName,
                lastName,
                userName,
                email,
                gender,
                wallet:0,
                dob,
                password: hashedPassword,
                 role: "user", // salted + hashed password
            });

            await newUser.save();
            return res.status(201).json({ message: 'User registered successfully' });


    } catch (error) {
        console.error('Error in registration:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

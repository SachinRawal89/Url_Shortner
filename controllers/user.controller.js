import USER from '../models/user.model.js';
import { v4 as uuidv4 } from "uuid";
import { setUserSession } from '../utils/auth.util.js';

async function handleUserSignup(req, res) {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    await USER.create({ userName, email, password });

    //return res.render('home', { message: 'User registered successfully' });
    return res.redirect('/'); // Redirect to home page after successful signup

}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await USER.findOne({ email, password });
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Here you would typically save the sessionId in a session store and associate it with the user
    //const sessionId = uuidv4();
    //setUserSession(sessionId, user);
    //res.cookie("uid", sessionId);    //here uid is cookie name and sessionId is cookie value which is stored in browser
    // cookie storage and sent with every request to the server for authentication and authorization purposes

    const token = setUserSession(user); // Generate JWT token for the authenticated user
    res.cookie("uid", token, { httpOnly: true }); // Store the JWT token in an HTTP-only cookie
    
    
    //return res.render('home', { message: 'User logged in successfully' });
    return res.redirect('/'); // Redirect to home page after successful login

}

export { handleUserSignup, handleUserLogin };
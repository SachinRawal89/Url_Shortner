//import { getUserBySessionId } from '../utils/auth.util.js';
import { getUserFromToken } from '../utils/auth.util.js';

async function restrictToLoggedInUsersOnly (req, res, next) {
    const userId = req.cookies?.uid;

    if (!userId) {
        return res.redirect('/login'); // Redirect to login page if user is not logged in
    }

    //const user = await getUserBySessionId (userId); // Implement this function to retrieve user from session store
    const user = await getUserFromToken(userId); // Implement this function to retrieve user information from the JWT token

    if (!user) {
        return res.redirect('/login'); // Redirect to login page if session is invalid
    } 
    req.user = user; // Attach user information to the request object for use in subsequent middleware or route handlers
    next(); // Proceed to the next middleware or route handler
}

async function checkAuth (req, res, next) {
    const userId = req.cookies?.uid;
    //const user = await getUserBySessionId (userId);
    const user = await getUserFromToken(userId);
    req.user = user; // Attach user information to the request object for use in subsequent middleware or route handlers
    next(); // Proceed to the next middleware or route handler
}

export {restrictToLoggedInUsersOnly, checkAuth};
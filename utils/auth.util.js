// State Full Authentication Management Utility
//const sessionIdToUserMap = new Map(); // We use this for state management in this simple example. In production, 
// consider using a more robust solution like Redis or a database.

// function setUserSession(sessionId, user) {
//     sessionIdToUserMap.set(sessionId, user);
// }

// function getUserBySessionId(sessionId) {
//     return sessionIdToUserMap.get(sessionId);
// }

// export { setUserSession, getUserBySessionId };

// +++++++++++++++++++++ Stateless Authentication Management Utility  ++++++++++++++++++++++++ //
import jwt from 'jsonwebtoken';

const jwtSecret = "sachinrawal@11";

function setUserSession(user) {
    // Generate a JWT token with user information
    const token = jwt.sign({ 
        _id: user._id,
        username: user.username,
        email: user.email
     }, jwtSecret, { expiresIn: '1h' });
    return token; // Return the token to be sent to the client
}

function getUserFromToken(token) {
    if (!token || typeof token !== 'string') {
        return null; // No token provided, return null
    }

    // Allow tokens that may be prefixed with 'Bearer '
    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    }

    try {
        return jwt.verify(token, jwtSecret); // Verify the token and return the decoded user information
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return null; // Treat malformed / expired tokens as unauthenticated
    }
}

export { setUserSession, getUserFromToken };
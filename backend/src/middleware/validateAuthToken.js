import jsonwebtoken from 'jsonwebtoken';
import {config} from '../config.js';

export const validateAuthToken = (allowedUserTypes = []) => {
    return (req, res, next) => {
        try {
            
            const { authToken } = req.cookies;

            if (!authToken) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const decoded = jsonwebtoken.verify(authToken, config.JWT.secret);
        
            if(!allowedUserTypes.includes(decoded.userType)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next()

        } catch (error) {
        console.log(error);
        }
            
        }
}
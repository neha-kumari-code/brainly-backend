import jwt, { decode } from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';
export const authUser = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        const decode_token = jwt.verify(token, JWT_SECRET);
        // @ts-ignore
        req.userId = decode_token.id;
        next();
    }
    catch (error) {
        return res.json({
            msg: 'not logged in'
        });
    }
};
//# sourceMappingURL=middleware.js.map
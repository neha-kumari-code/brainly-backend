import jwt, { decode } from 'jsonwebtoken';
export const authUser = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        const decode_token = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode_token.id; // as jwtpayload se bta rhe h ki ye ye deocde_token object hai
        next();
    }
    catch (error) {
        return res.json({
            msg: 'not logged in'
        });
    }
};
//# sourceMappingURL=middleware.js.map
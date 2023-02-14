const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "No token Found"
                }
            ]
        })
    }
    try {
        let user = await JWT.verify(token, "fg236rgfeigr34uei3")
        req.user = user.email;
    } catch (err) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Token Invalid"
                }
            ]
        })

    }


}
import jwt, { VerifyErrors } from "jsonwebtoken";
const jsonWebTokenSecurity = async (request, response, next) => {
    const token = request.headers["authorization"];
    if (token == null) {
        response.status(403).json({ serverResponse: "Usuario no Autorizado" })
        return;
    }
    
    jwt.verify(token, "secret", async(err, authdata) => {
        if (err != null) {
            response.status(403).json({ serverResponse: "Usuario no autorizado " + err.message });
            return;
        }
        next();
    });
}
export default jsonWebTokenSecurity;
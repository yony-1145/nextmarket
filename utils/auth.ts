import { NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { ExtendedNextApiRequestAuth, DecodedType, ResMessageType } from "./types"

const secret_key = "yy1234"

const auth = (handler: Function) => {
    return async(req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>) => {
        if(req.method === "GET"){
            return handler(req, res)
        }
    
        const token = req.headers.authorization.split(" ")[1]
        
        if(!token){
            return res.status(401).json({message: "No token"})
        }

        try{
            const decoded = jwt.verify(token, secret_key)
            req.body.email = (decoded as DecodedType).email
            return handler(req, res)
        }catch(err){
            return res.status(401).json({message: "Invalid token. You need to login."})
        }
    }
}

export default auth
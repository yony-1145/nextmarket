import type { NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"
import { ExtendedNextApiRequestUser, SavedUserDataType, ResMessageType} from "../../../utils/types"

const secret_key = "yy1234"

const loginUser = async(req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) => {
    try{
        await connectDB()
        const saveUserData: SavedUserDataType | null = await UserModel.findOne({email: req.body.email})
        if(saveUserData){
            if(req.body.password === saveUserData.password ){
                const payload = {
                    email: req.body.email
                }
                const token = jwt.sign(payload, secret_key, {expiresIn: "23h"})
                console.log(token)
                return res.status(200).json({message: "Succsessed  login",token: token})
            }else{
                return res.status(400).json({message: "Failed login: Password is Incorrect"})
            }
        }else{
            return res.status(400).json({message: "Failed login: Please Register Your Account"})            
        }
    }catch(err){
        return res.status(400).json({message: "Failed  login"})
    }
}

export default loginUser
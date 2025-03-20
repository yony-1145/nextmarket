import type { NextApiResponse } from "next"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"
import auth from "../../../utils/auth"
import { ExtendedNextApiRequestItem, ResMessageType } from "../../../utils/types"

const createItem = async(req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) => {
    try{
        await connectDB()
        console.log(req.body)
        await ItemModel.create(req.body)
        return res.status(200).json({message:"item creation succsessed"})
    }catch{
        return res.status(400).json({message:"item creation failed"})
    }
}

export default auth(createItem)

import type { NextApiRequest, NextApiResponse } from "next"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"
import auth from "../../../utils/auth"
import { SavedItemDataType, ResReadSingleType } from "../../../utils/types"

const getSingleItem = async(req: NextApiRequest, res: NextApiResponse<ResReadSingleType>) => {
    try{
        await connectDB()
        const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id)
        if(!singleItem) return res.status(400).json({message:"Failed No"})
        return res.status(200).json({message:"Succsessed Read single data",singleItem:singleItem})
    }catch(err){
        return res.status(400).json({message:"Failed Read single data"})        
    }
}

export default auth(getSingleItem)
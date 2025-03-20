import type { NextApiResponse } from "next";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels"
import auth from "../../../../utils/auth";
import { ExtendedNextApiRequestItem, SavedItemDataType, ResMessageType } from "../../../../utils/types";

const deleteItem = async(req:ExtendedNextApiRequestItem, res:NextApiResponse<ResMessageType>) => {
    try{
        await connectDB()
        const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id)
        if(!singleItem) return res.status(400).json({message:"Failed No data"})
        if(singleItem.email === req.body.email){
            await ItemModel.deleteOne({_id: req.query.id})
            return res.status(200).json({message:"Successed Deleted data"})
        }else{
            throw new Error()
        }
    }catch(err){
        return res.status(400).json({message:"Failed Deleted data"})
    }
}

export default auth(deleteItem)
import type { NextApiResponse } from "next"
import connectDB from "../../../../utils/database"
import { ItemModel } from "../../../../utils/schemaModels"
import auth from "../../../../utils/auth"
import { ExtendedNextApiRequestItem, SavedItemDataType, ResMessageType } from "../../../../utils/types"

const updateItem = async(req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) => {
    try{
        await connectDB()
        const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id)
        if(!singleItem) return res.status(400).json({message:"Failed No data"})
        if(singleItem.email === req.body.email){
            await ItemModel.updateOne({_id: req.query.id}, req.body)
            return res.status(200).json({message:"Succsessed Eddited data"})
        }else{
            throw new Error()
        }
    }catch(err){
        return res.status(400).json({message:"Failed Eddited data"})
    }

}
export default auth(updateItem)
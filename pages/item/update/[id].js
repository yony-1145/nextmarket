import { useState } from "react"
import useAuth from "../../../utils/useAuth"
import Head from "next/head"

const UpdateItem = (props)=> {
    const [title, setTitle] = useState(props.singleItem.title)
    const [price, setPrice] = useState(props.singleItem.price)
    const [image, setImage] = useState(props.singleItem.image)
    const [description, setDescription] = useState(props.singleItem.description)
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`https://nextmarket-ten.vercel.app/api/item/update/${props.singleItem._id}`,{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert("Failed Item Eddit")
        }
    }

    const loginUser = useAuth()

    if(loginUser){
        return(
            <div>
                <Head><title>Item Eddit</title></Head>
                <h1 className="page-title">Item Eddit</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Item Name" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="Price" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="image" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="Item Description" required/>
                    <button>Editt</button>
                </form>
            </div>
        )
    }else{
        return(
            <h1>You cant eddit this item.</h1>
        )
    }

}

export default UpdateItem

export const getServerSideProps = async(context) => {
    try{
        const response = await fetch(`https://nextmarket-ten.vercel.app/api/item/${context.query.id}`)
        const singleItem = await response.json()
    
        return{
            props: singleItem
        }
    }catch(err){
        console.log('error happened')
        const singleItem = {
            "message": "Succsessed Read single data",
            "singleItem": {
            "_id": "67de56c35ef258576316dfdd",
            "title": "damy",
            "image": "/img7.jpg",
            "price": "2000",
            "description": "damy",
            "email": "hey@test.com",
            "__v": 0
            }
        }
        return{
            props: singleItem
        }
    }

}
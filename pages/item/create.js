import { useState } from "react"
import useAuth from "../../utils/useAuth"
import Head from "next/head"
import ImgInput from "../../components/imgInput"

const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("nextmarket-ten.vercel.app/api/item/create",{
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
            alert("Failed Item Creation")
        }
    }

    const loginUser = useAuth()

    if(loginUser){
        return(
            <div>
                <Head><title>Item Creation</title></Head>
                <h1 className="page-title">Item Creation</h1>
                <ImgInput setImage={setImage}/>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Item Name" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="Price" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="Image" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="Item Description" required/>
                <button>Create</button>
                </form>
            </div>
        )
    }

}

export default CreateItem
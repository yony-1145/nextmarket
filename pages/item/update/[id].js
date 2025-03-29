import { useState } from "react"

const UpdateItem = (props)=> {
    const [title, setTitle] = useState(props.singleItem.title)
    const [price, setPrice] = useState(props.singleItem.price)
    const [image, setImage] = useState(props.singleItem.image)
    const [description, setDescription] = useState(props.singleItem.description)
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/api/item/update/${props.singleItem._id}`,{
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

    return(
        <div>
            <h1>Item Eddit</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Item Name" required/>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="Price" required/>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="image" required/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="Item Description" required/>
                <button>Editt</button>
            </form>
        </div>
    )
}

export default UpdateItem

export const getServerSideProps = async(context) => {
    try{
        const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`)
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
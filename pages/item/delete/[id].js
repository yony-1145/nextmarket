import Image from "next/image"

const DeleteItem = (props)=> {    
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/api/item/delete/${props.singleItem._id}`,{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert("Failed Item Delete")
        }
    }

    return(
        <div>
            <h1>Item Delete</h1>
            <form onSubmit={handleSubmit}>
                <h2>{props.singleItem.title}</h2>
                <Image src={props.singleItem.image} width={750} height={500} alt="item-iamge"/>
                <h3>￥{props.singleItem.price}</h3>
                <p>{props.singleItem.description}</p>
                <button>Delete</button>
            </form>
        </div>
    )
}

export default DeleteItem

export const getServerSideProps = async(context) => {
    try{
        const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`)
        const singleItem = await response.json()
    
        return{
            props: singleItem
        }
    }catch(err){
        console.log('error happened')
        return{
            props: singleItem
        }
    }

}
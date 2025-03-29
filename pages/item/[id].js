import Head from "next/head"
import Image from "next/image"
import Link from "next/link"


const ReadSingleItem = (props)=> {
    return(
        <div className="grid-container-si">
            <Head><title>{props.singleItem.title}</title></Head>
            <div>
                <Image src={props.singleItem.image} width={750} height={500} alt="item-image"/>
            </div>
            <h1>{props.singleItem.title}</h1>
            <h2>{props.singleItem.price}</h2>
            <hr/>
            <p>{props.singleItem.description}</p>
            <div>
                <Link href={`/item/update/${props.singleItem._id}`}>Item Eddit</Link>
                <Link href={`/item/delete/${props.singleItem._id}`}>Item Delete</Link>
            </div>
        </div>
    )
}

export default ReadSingleItem

export const getServerSideProps = async(context) => {
    console.log('context:',context.query.id)
    const response = await fetch(`https://nextmarket-ten.vercel.app/api/item/${context.query.id}`)
    console.log('response:',response)
    const singleItem = await response.json()
    console.log('singleItem:',singleItem)


    return{
        props: singleItem
    }   
}
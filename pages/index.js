import Link from "next/link"
import Image from "next/image"
import Head from "next/head"

const ReadAllItems = (props) =>{
    return (
        <div>
            <Head><title>Next Market</title></Head>
            <div className="grid-container-in">
            {props.allItems.map(item =>
                <Link href={`/item/${item._id}`} key={item._id}>
                        <div className="texts-area">
                            <Image src={item.image} width={750} height={500} alt="item-image"/>
                            <h2>{item.price}</h2>
                            <h3>{item.title}</h3>
                            <p>{item.description.substring(0, 80)}...</p>
                        </div>
                </Link>
            )}
            </div>
        </div>
    )
}

export default ReadAllItems

export const getServerSideProps = async() => {
    const response = await fetch("https://nextmarket-ten.vercel.app/api/item/readall")
    const allItems = await response.json()
    return {
        props: allItems
    }
}
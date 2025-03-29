import { useState } from "react"
import Head from "next/head"

const Register = () => {
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setNewUser({
            ...newUser, //　spread syntax( 配列を展開 )
            [e.target.name]: e.target.value,
        })
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("https://nextmarket-ten.vercel.app/api/user/register",{
                method:"POST",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert("Failed User registration")
        }
    }

    return (
        <div>
            <Head><title>User Registration</title></Head>
            <h1 className="page-titile">User Registration</h1>
            <form onSubmit={handleSubmit}>
                <input value={newUser.name} onChange={handleChange}
                    type="text" name="name" placeholder="Name" required/>
                <input value={newUser.email} onChange={handleChange} type="text" name="email" placeholder="E-Mail" required/>
                <input value={newUser.password} onChange={handleChange} type="text" name="password" placeholder="Password" required/>
                <button>Resitration</button>
            </form>
        </div>
       
    )
}

export default Register
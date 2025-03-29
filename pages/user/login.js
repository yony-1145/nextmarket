import { useState } from "react"
import Head from "next/head"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("nextmarket-ten.vercel.app/api/user/login",{
                method:"POST",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json()
            localStorage.setItem("token", jsonData.token)
            const token = localStorage.getItem("token")
            alert(jsonData.message)
        }catch(err){
            alert("Failed Login")
        }
    }

    return(
        <div>
            <Head><title>Login</title></Head>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="E-Mail" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="PassWord" required/>
                <button>Login</button>
            </form>
        </div>


    )
}

export default Login
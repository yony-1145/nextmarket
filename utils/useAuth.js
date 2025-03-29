import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import jwt from "jsonwebtoken"

// const secret_key = "yy1234"

const useAuth = () => {
    const [loginUser, setLoginUser] = useState("")

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        
        if(!token){
            router.push("/user/login") 
        }
    
        try{
            console.log("token:",token)
            const decoded = jwt.decode(token)
            setLoginUser(decoded.email)
        }catch(error){
            router.push("/user/login")
        }
    }, [router])

    return loginUser
}

export default useAuth
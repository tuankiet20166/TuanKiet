import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'

export default function Login() {
    const { data } = useSession()
    const router = useRouter()
    useEffect(() => {
        data && router.push("/")
    }, [data])
    console.log(data)
    return (
        <div>
            <button type='button' onClick={() => signIn("google", { callbackUrl: '/' })}>
                LOGIN
            </button>
        </div>
    )
}
'use client'
import { useAuth } from '@/context/context'
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'

type Props = {}

const LoginLoading = () => {
    const store = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    useEffect(() => {
        if (!token) {
            router.push('/')
        } else {
            localStorage.setItem('token', token)

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios.post('/protected/me').then((res) => {
                store.setUser(res.data)
                router.push('/')
            })
        }
    }, [])

    return <div>Logging you in please wait...</div>
}

const page = (props: Props) => {
    return (
        <div className="min-h-screen">
            <div className="h-32 font-semibold w-full text-center text-2xl flex-col gap-3">
                <Suspense>
                    <LoginLoading />
                </Suspense>
                <span className="loading loading-bars loading-lg mt-3"></span>
            </div>
        </div>
    )
}

export default page

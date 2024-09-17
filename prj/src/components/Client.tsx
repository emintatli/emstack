'use client'

import axios from 'axios'
import { config } from '../../config'
import { use, useEffect } from 'react'
import RegisterModal from './RegisterModal'
import { useAuth } from '@/context/context'

const Client = () => {
    const state = useAuth()
    useEffect(() => {
        state.setLoading(true)
        axios.defaults.baseURL = config.be_url
        const token = localStorage.getItem('token')
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios
                .post('/protected/me')
                .then((res) => {
                    state.setUser(res.data)
                    state.setLoading(false)
                })
                .catch((err) => {
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    state.setUser(null)
                    state.setLoading(false)
                })
        } else {
            state.setUser(null)
            state.setLoading(false)
        }
    }, [])
    return (
        <div>
            <RegisterModal />
        </div>
    )
}

export default Client

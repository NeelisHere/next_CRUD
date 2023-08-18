'use client'

import { useEffect, useState } from "react"
import Profile from "../../../components/Profile"

const OthersProfilePage = ({ params }) => {
    const [posts, setPosts] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const { id } = params
    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${id}/posts`)
            const data = await res.json()
            setPosts(data)
        }
        const fetchCurrentUser = async () => {
            const res = await fetch(`/api/users/${id}`)
            const data = await res.json()
            setCurrentUser(data)
        }
        fetchPosts()
        fetchCurrentUser()
    }, [])

    return (
        <Profile
            name={currentUser.username}
            desc={'Welcome to your personalized profile page.'}
            data={posts}
        />
    )
}

export default OthersProfilePage
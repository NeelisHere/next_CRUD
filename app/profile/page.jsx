'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import Profile from '../../components/Profile'

const MyProfile = () => {
    const [searchText, setSerchText] = useState('')
    const [showBookmarkedPosts, setShowBookmarkedPosts] = useState(false)
    const [posts, setPosts] = useState([])
    const { data: session } = useSession()
    const router = useRouter()

    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete?')
        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' })
                const deletedPostId = post._id
                const filteredPosts = posts.filter((post)=>post._id !== deletedPostId)
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()
            // setPosts(data)
            if (!showBookmarkedPosts) {
                setPosts(data)
            } else {
                const bookmarkedPosts = data.filter((post)=>post.isBookmarked === true)
                setPosts(bookmarkedPosts)
            }
        }
        if(session?.user.id)fetchPosts()
        
    }, [showBookmarkedPosts])

    return (
        <Profile 
            name={'My'}
            desc={'Welcome to your personalized profile page.'}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showBookmarkedPosts={showBookmarkedPosts}
            setShowBookmarkedPosts={setShowBookmarkedPosts}
        />
    )
}

export default MyProfile

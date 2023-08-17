'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
    return(
        <div className='mt-16 prompt_layout'>
            {
                data.map((post, index) => {
                    return(
                        <PromptCard 
                            key={index}
                            post={post}
                            handleTagClick={handleTagClick}
                        />
                    )
                })
            }
        </div>
    )
}

const Feed = () => {
    const [searchText, setSerchText] = useState('')
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    useEffect(()=>{
        const temp = posts.filter((post)=>{
            return post.prompt.includes(searchText) || post.tag.includes(searchText)
        })
        setFilteredPosts(temp)
        // console.log(searchText)
    }, [searchText])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()
            setPosts(data)
            setFilteredPosts(data)
        }
        fetchPosts()
    }, [])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input 
                    type="text" 
                    placeholder='Search for a prompt...'
                    value={searchText}
                    onChange={(e) => { setSerchText(e.target.value) }}
                    required
                    className='search_input peer'
                />
            </form>
            <PromptCardList 
                // data={posts}
                data={filteredPosts}
                handleTagClick={(tag) => {
                    setSerchText(tag)
                }}
            />
        </section>
    )
}

export default Feed

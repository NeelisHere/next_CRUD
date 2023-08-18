'use client'
import { useSession } from "next-auth/react"
import PromptCard from "./PromptCard"
import { useState } from "react"

const Profile = ({ 
    name, desc, data, handleEdit, 
    handleDelete, showBookmarkedPosts, 
    setShowBookmarkedPosts }) => {
    
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>
            <p className="py-4 text-lg">{desc}</p>
            
            <button 
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={()=>{
                    setShowBookmarkedPosts(!showBookmarkedPosts)
                }}
            >
                { showBookmarkedPosts? 'Show All Prompts' : 'Show Bookmarked Prompts' }

            </button>

            <div className='mt-10 prompt_layout'>
                {
                    data.map((post, index) => {
                        return(
                            <PromptCard 
                                key={index}
                                post={post}
                                handleTagClick={()=>handleEdit && handleEdit(post)}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )
                    })
                }
            </div>

        </section>
    )
}

export default Profile

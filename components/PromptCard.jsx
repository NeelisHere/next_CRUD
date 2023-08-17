'use client'
import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { SolidStar, EditIcon, DeleteIcon, HollowStar, CopyIcon, CheckIcon } from "./Icons"



const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const [copied, setCopied] = useState('')
    const [isBookmarked, setIsBookmarked] = useState(false)
    const pathName = usePathname()
    const { data: session } = useSession()
    const router = useRouter()

    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(''), 3000)
    }
    // console.log(post)
    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />
                    <div className="flex flex-col">
                        <h3 className="text-gray-900">{post.creator.username}</h3>
                        <p className="text-xs text-gray-600">{post.creator.email}</p>
                    </div>
                </div>
                <div>
                    {   
                        pathName === '/profile'?
                        (
                            isBookmarked?
                            <div onClick={()=>{setIsBookmarked(!isBookmarked)}}><SolidStar /></div>:
                            <div onClick={()=>{setIsBookmarked(!isBookmarked)}}><HollowStar /></div>
                        ):
                        (
                            <div className="copy_btn" onClick={handleCopy}>
                                {
                                    copied === post.prompt ?
                                    <CheckIcon />:<CopyIcon />
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
            <p
                onClick={() => {
                    if (handleTagClick) {
                        handleTagClick(post.tag)
                    }
                }}
                className="font-inter text-xs blue_gradient cursor-pointer"
            >
                {post.tag}
            </p>
            {
                session?.user.id === post.creator._id &&
                pathName === '/profile' &&
                <div className="flex-center gap-4 itmes-center pt-3">
                    <div className="copy_btn" onClick={handleCopy}>
                        {
                            copied === post.prompt ?
                            <CheckIcon />:<CopyIcon />
                        }
                    </div>
                    <div onClick={()=>{ handleEdit(post) }}>
                        <EditIcon />
                    </div>
                    <div onClick={()=>{ handleDelete(post) }}>
                        <DeleteIcon />
                    </div>
                </div>
            }
        </div>
    )
}

export default PromptCard

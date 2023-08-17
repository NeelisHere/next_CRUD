import { useSession } from "next-auth/react"
import PromptCard from "./PromptCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>
            <p className="py-4 text-lg">{desc}</p>
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

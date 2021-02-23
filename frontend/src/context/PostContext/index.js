import React, { useState, useEffect, useContext, createContext } from 'react';


export const PostTypeContext = createContext();

export const usePostType = (() => useContext(PostTypeContext))


const PostTypeProvider = (props) => {
    const types = ['image', 'words', 'link'];
    const [type, setType] = useState(types[0])


    return (
        <PostTypeContext.Provider value={type, setType, types} >
            {props.children}
        </PostTypeContext.Provider >
    )
}

export default PostTypeProvider;
import React, { useEffect, useState } from 'react';

const LinkForm = () => {
    const [link, setLink] = useState('')
    const [caption, setCaption] = useState('')

    const submitForm = (e) => {
        e.preventDefault();
        console.log(link, caption);
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <input type='url' onChange={(e) => setLink(e.target.value)} value={link} placeholder='share a link' />
                <textarea onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='add a caption' />
                <button type='submit'> Submit</button>
            </form>
        </div >
    )
}


export default LinkForm;
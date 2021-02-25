import React, { useEffect, useState } from 'react';

const ImageForm = () => {

    const [pic, setPic] = useState('');
    const [caption, setCaption] = useState('');



    const submitForm = (e) => {
        e.preventDefault();
        const picData = { pic, caption };
        console.log(picData);
    }


    return (
        <div>
            <form onSubmit={submitForm}>
                <input type='file' onChange={(e) => setPic(e.target.value)} value={pic} placeholder='upload a pic' />
                <textarea onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='add a caption' />
                <button type='submit'> Submit</button>
            </form>
        </div >
    )
}


export default ImageForm;



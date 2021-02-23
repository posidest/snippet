import React, { useEffect, useState } from 'react';

const WordsForm = () => {
    const [words, setWords] = useState('')


    const submitForm = (e) => {
        e.preventDefault()
        console.log(words);
        setWords('')
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <textarea onChange={(e) => setWords(e.target.value)} value={words} placeholder='write something' />
                <button type='submit'> Submit</button>
            </form>
        </div >
    )
}


export default WordsForm;
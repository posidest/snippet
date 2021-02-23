import React, { useState, useEffect, useContext, createContext } from 'react';


export const ImportContext = createContext();

export const useImport = (() => useContext(ImportContext))


const ImportProvider = (props) => {
    const [imports, setImports] = useState([])

    // useEffect(() => {
    //     let imageImports = [];
    //     for (let i = 0; i < 5; i++) {
    //         let statement = `import pic${i} from './LandingPics/`;
    //         let num = Math.floor(Math.random() * Math.floor(41));
    //         statement = statement + num + `.jpg` + "';";
    //         imageImports.push(statement);
    //     }
    //     setImports(imageImports);
    // }, []);


    useEffect(() => {
        let imageImports = [];
        for (let i = 0; i < 5; i++) {
            let pic = `'./LandingPics/`;
            let num = Math.floor(Math.random() * Math.floor(41));
            let path = pic + num + `.jpg` + "'";
            imageImports.push(path);
        }
        setImports(imageImports);
    }, []);



    return (
        <ImportContext.Provider value={imports} >
            {props.children}
        </ImportContext.Provider >
    )
}

export default ImportProvider;
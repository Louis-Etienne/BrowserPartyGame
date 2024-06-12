import {useEffect, useState} from 'react'

export default function useScreenShort(){
    const smallScreenSize = 900;
    const [screenShort, setScreenShort] = useState(window.innerWidth <= smallScreenSize);

    useEffect(()=>{
        const onResize = ()=>{
            setScreenShort(window.innerWidth <= smallScreenSize);
        }
        
        window.addEventListener('resize', onResize);

        return ()=>{
            window.removeEventListener('resize', onResize)
        }
    }, []);

    return screenShort
}
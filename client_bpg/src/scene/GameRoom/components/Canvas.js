
import {useEffect , useRef} from 'react'
import * as PIXI from 'pixi.js'
import {Config} from '../../../helper/Config';
import Game from '../../../games/Game';

export default function Canvas({}){
    const canvasRef = useRef();
    const game = useRef();

    useEffect(()=>{
        game.current = new Game(canvasRef.current);
        return ()=>{
            game.current.destroy();
        }
    }, [])

    return(
        <div className='game_canvas' style={{height: '100%'}}>
            <canvas height={Config.gameWindowSize.height} 
                width={Config.gameWindowSize.width} 
                ref={canvasRef}
                style={{
                    width: '100%',
                    border: '1px solid white',
                    paddingBottom: '1px'
                }}/>

        </div>
    ) 
}
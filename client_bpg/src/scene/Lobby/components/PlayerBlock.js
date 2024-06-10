import { useState, useRef, useEffect } from "react";
import { socket } from "../../../socket";

export function PlayerBlockOther({p_player}){
    return(
        <div className="player_block">
            <div className="player_block_onlycolor"
            style={{backgroundColor: p_player.getColor()}}/>
            
            {/*Either green or white, if the player is ready*/}
            {!p_player.getReady() && <div className="player_block_name">{p_player.getName()}</div>}
            {p_player.getReady() && <div className="player_block_name">
               <span style={{color:'#00FF00'}}>{p_player.getName()}</span>
            </div>}
        </div>
    );
}

export function PlayerBlock({p_player, p_roomColors}){
    const [colorContainerName, setColorContainerName] 
                    = useState('player_block_container')

    const dropdownContent = useRef()
    const dropdownButton = useRef()

    function ToggleShow() {
        dropdownContent.current.classList.toggle('player_block_show_dropdown');
        
        if(colorContainerName === 'player_block_container'){
            setColorContainerName('player_block_containerSELECTED');
        }
        else{
            setColorContainerName('player_block_container');
        }
    }

    function NewColorClick(color) {
        socket.emit('lobby_new_color', color)
    }

    function HandOutsideClick(e) {
        if (!dropdownButton.current.contains(e.target)) {
            dropdownContent.current.classList.remove('player_block_show_dropdown');
            setColorContainerName('player_block_container');
        }
    }

    useEffect(() => {

        document.addEventListener('mousedown', HandOutsideClick);
        return () => {
            document.removeEventListener('mousedown', HandOutsideClick);
        }
    }, []);

    return (
        <div className="player_block">
            <div className={colorContainerName}
            onClick={ToggleShow}>
                <div className="player_block_color"
                    style={{backgroundColor: p_player.getColor()}}
                    ref={dropdownButton}>

                    <div className="player_block_color_dropdown"
                        ref={dropdownContent}
                    >
                        {Object.values(p_roomColors).map((color, index) => {
                            return <div key={index} style={{ backgroundColor: color }}
                                className="player_block_color_dropdown_block"
                                onClick={() => { NewColorClick(color) }} />
                        })}
                    </div>
                </div>
            </div>

            {/*Either green or white, if the player is ready*/}
            {!p_player.getReady() && <div className="player_block_name">(you) {p_player.getName()}</div>}
            {p_player.getReady() && <div className="player_block_name">
               <span style={{color:'#00FF00'}}>(you) {p_player.getName()}</span>
            </div>}
        </div>
    );
}
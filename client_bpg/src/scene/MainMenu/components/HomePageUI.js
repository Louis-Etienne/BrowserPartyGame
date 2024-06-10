import { useEffect, useRef } from "react";
import { socket } from "../../../socket";

export function NameInput({ p_setUsername }) {
    const name_input = useRef();

    return (
        <p>
            <h1>Name</h1>
            <p className="home_page_UI_ghostdiv">
                <input ref={name_input} spellCheck="false" onInput={()=>{
                        p_setUsername(name_input.current.value)
                }}
                    placeholder="Enter name here" className="home_page_name_input"
                    type="text" maxLength="10" />
            </p>
        </p>
    );
}

export function CreateRoomButton({ p_username, p_setErrorMessage }) {
    function ButtonClickCreateRoom() {
        if (p_username.length > 0) {
            socket.emit('create_room', { name: p_username });
        }
        else { p_setErrorMessage("The name entered is invalid"); }
    }

    return (
        <div onClick={ButtonClickCreateRoom}>Create Room</div>
    )
}

export function JoinRoomButton({p_username, p_setErrorMessage}) {
    const join_input = useRef()

    function ButtonClickJoinRoom(){
        const room_ID = join_input.current.value;
        if(p_username.length > 0){
            socket.emit("join_room", {name:p_username, roomID:room_ID});
        }
        else{p_setErrorMessage("The name entered is invalid");}
    }

    return (
        <p>
            <div onClick={ButtonClickJoinRoom}>Join Room</div>
            <p className="home_page_UI_ghostdiv">
                <input ref={join_input} placeholder="Enter room ID" className="home_page_join_input" type="text" />
            </p>
        </p>
    );
}

export function ErrorManager({p_errorMessage, p_setErrorMessage}){
    useEffect(()=>{
        function onErrorBadRoom(){
            p_setErrorMessage("The room entered is invalid")
        }
        function onErrorRoomFull(){
            p_setErrorMessage("The room is full")
        }

        socket.on('home_page_error_badroom', onErrorBadRoom);
        socket.on('home_page_error_roomfull', onErrorRoomFull);

        return ()=>{
            socket.off('home_page_error_badroom', onErrorBadRoom);
            socket.off('home_page_error_roomfull', onErrorRoomFull);
        }
    },[])

    return(
        <p className="home_page_error_message">
            {p_errorMessage}
        </p>
    );
}
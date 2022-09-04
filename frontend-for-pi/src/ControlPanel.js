import React from "react";
import { io } from "socket.io-client";
import {SteeringWheel} from "./SteeringWheel"
import styled from "styled-components";

const Container = styled.div`
  width: 600px
`

const Centered = styled.div`
display: flex;
  justify-content: center;

`

export default function ControlPanel(){
    const [socket,setSocket] = React.useState()

    React.useEffect(()=>{
        const newSocket = io("http://192.168.178.52:3000/")
        setSocket(newSocket)
        return () => newSocket.close();
    },[setSocket])

    const handleForward = ()=>{
        socket.emit('forward',null)
    }

    const handleReverse = ()=>{
        socket.emit('reverse',null)
    }

    const handleStop = ()=>{
        socket.emit('stop',null)
    }

    const handleLeft = ()=>{
        socket.emit('pivotLeft',null)
    }

    const handleRight = ()=>{
        socket.emit('pivotRight')
    }


    return (
        <Container>
            <Centered>
                <button onClick={handleForward}>Forward</button>
            </Centered>
            <Centered>
                <button onClick={handleLeft}>left</button>
                <button onClick={handleStop}>Stop</button>
                <button onClick={handleRight}>right</button>
            </Centered>
            <Centered>
                <button onClick={handleReverse}>Reverse</button>
            </Centered>

        </Container>
    )
}
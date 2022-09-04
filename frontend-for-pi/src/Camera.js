import React from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import Predict from "./Predict";


const StyledImage = styled.img` 
  width: 900px;
    `

const Container = styled.div`
  position: relative;
`

export default function Camera(){
    const [imageSrc,setImageSrc] = React.useState(null)
    const [predictMode,setPredictMode]=React.useState(false)

    const imgRef = React.useRef(null)

    const togglePredictMode =()=>{
        setPredictMode(mode=>!mode)
    }


    React.useEffect(function(){
        const socket = io("http://192.168.178.52:3000/")
        socket.on('data', async (data, res) => {
            setImageSrc(data)
        });

        return ()=>{
            socket.off('data')
        }
    },[])

    return(
        <div>
            <Container>
                <img src={imageSrc} alt=""  ref={imgRef} width={'900px'} height={'700px'}/>
                {
                    predictMode
                        ?
                        <Predict
                            frame={imgRef.current}
                        />
                        :
                        null
                }


            </Container>

            <button onClick={togglePredictMode}>
                {predictMode
                    ?
                    'turn off predictions'
                    :
                    'turn on predictions'
                }
            </button>
        </div>


    )
}
import Box from './Box'
import React from "react";

import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

import * as cocoSsd from '@tensorflow-models/coco-ssd';



function Predict({frame}){
    const [model,setModel] =React.useState(null)
    const [prediction,setPrediction] = React.useState(null)
    const [count,setCount] = React.useState(0)
    const frameCount = React.useRef(0)

    React.useEffect(()=>{
        frameCount.current=(frameCount.current+1)%15
    })

    React.useEffect(()=>{
        async function doit(){
            const result = await cocoSsd.load()
            setModel(result)
        }
        doit()
    },[])

    React.useEffect(()=>{
        async function doit(){
            const result = await model.detect(frame)
            setPrediction(result)
        }
        if(frameCount.current%15===0  && model) {
            doit()
        }
    },[model,frameCount.current])

    return (<div>
        {prediction
        &&
        prediction.map((prediction,i)=>(
            <Box bbox={prediction.bbox}
            name={prediction.class}
                 key={i}
            />
        ))
        }
    </div>)
}

export default Predict
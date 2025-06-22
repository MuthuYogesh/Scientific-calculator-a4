import React, { useEffect, useState } from 'react'
import style from './History.module.css'

export default function History({view}) {
    const [history, setHistory] = useState([]);

    useEffect(()=>{
        if(view){
            let hist = JSON.parse(localStorage.getItem("expression"))||[{}]
            setHistory(hist);
            console.log(hist);
            console.log(view)
        }
        else{
            setHistory([{}]);
        }
    },[view])


    return (
        <div className={style.history}>
            {history.map((ele, idx)=>{
                return(
                    <div className={style.content} key={idx}>
                        <p>{ele.expression}</p>
                        <p>={ele.result}</p>
                    </div>
                )
            })}
        </div>
    )
}

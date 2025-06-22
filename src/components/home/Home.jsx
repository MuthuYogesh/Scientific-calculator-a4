import React from 'react';
import Display from '../display/Display';
import CustomButton from '../buttons/CustomButton';
import History from '../history/History';
import style from './Home.module.css';
import { useState } from 'react';
import { ReactComponent as MyIcon } from '../images/history-icon.svg';
import { evaluate } from 'mathjs';

export default function Home() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [angleMode, setAngleMode] = useState('DEG'); 
    const [invMode, setInvMode] = useState(false);
    const [historyDisp, setHistoryDisp] = useState(false);

    const btns = [
        'Rad', 'Deg', 'x!', '(', ')', '%', 'CE',
        'Inv', 'sin', 'ln', '7', '8', '9', '+',
        'π', 'cos', 'log', '4', '5', '6', '*',
        'e', 'tan', '√', '1', '2', '3', '-',
        'AC', 'EXP', 'xʸ', '0', '.', '/', '=',
    ];

    const handleButtonToValue = (btn) => {
        switch (btn) {
        case 'π': return 'pi';
        case 'e': return 'e';
        case '√': return 'sqrt(';
        case 'ln': return 'log(';
        case 'log': return 'log10(';
        case 'EXP': return '*10^';
        case 'xʸ': return '^';
        case 'x!': return '!';
        case 'sin': return invMode ? 'asin(' : 'sin(';
        case 'cos': return invMode ? 'acos(' : 'cos(';
        case 'tan': return invMode ? 'atan(' : 'tan(';
        case '%': return '*0.01';
        default: return btn;
        }
    };

    const transformExpression = (expr) => {
        if (angleMode === 'RAD') {
            console.log('deg',expr);
            return expr;
        }
        return expr.replace(/(sin|cos|tan|asin|acos|atan)\(([^)]+)\)/g, (match, fn, arg) => {
        return `${fn}(${arg} * pi / 180)`;
        });
    };

    const handleClick = (val)=>{
        if (val === 'Rad') setAngleMode('RAD');
        else if (val === 'Deg') setAngleMode('DEG');
        else if (val === 'Inv') setInvMode(!invMode);
        else if(val === 'CE'){
            setExpression(expression.slice(0,-1));
        }
        else if(val === 'AC'){
            setExpression('');
            // console.log(expression);
            setResult('')
        }
        else if(val === '='){
            try{
                const res = evaluate(transformExpression(expression)).toString();
                setResult(res)
                let oldCall = JSON.parse(localStorage.getItem("expression"))||[];
                let newCall = {"expression":expression, "result":res}
                let updated = [...oldCall, newCall]
                localStorage.setItem("expression", JSON.stringify(updated));
            }
            catch(e){
                setResult("Err");
            }
        }
        else{
            const value = handleButtonToValue(val);
            setExpression(expression=>expression+value);
        }
    }

    const handleHistory = ()=>{
        setHistoryDisp(!historyDisp);
    }
    
    return (
        <>
        {historyDisp&&<History view={historyDisp}/>}
        <div className={style.calculator}>
            <div className={style.disp}>
                <div onClick={handleHistory}><MyIcon className={style.icon}/></div>
                <Display expr={expression} result={result}/>
            </div>

            <div className={style.btns}>
                {btns.map((btn, idx) => {
                    return (
                        <CustomButton
                            key={idx}
                            btnText={btn}
                            customStyle={(btn === '=') ?
                                style.equalCustombtn : (Number(btn) || btn === '0') ?
                                    style.customBtns : style.nothing} 
                            handleClick={()=>handleClick(btn)}/>
                            
                    )
                })}
            </div>
                

        </div>
        </>
    )
}

import React from 'react';
import style from './Display.module.css';

export default function Display({expr, result}) {
  return (
    <div className={style.values}>
        <div className={style.expr}>{expr || '0'}</div>
        <div className={style.result}>{result || '0'}</div>
    </div>
  )
}

import React from 'react';

const ToastError = ({textLines}) => {
  textLines = textLines || ['Unkown Error']
  return (<div>
    {textLines.map(text => {
      return (<div>{text}</div>)
    })}
  </div>)
}

export default ToastError;
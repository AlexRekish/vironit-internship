import React from 'react';

const variable = (props) => {
    const style = {
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        padding: `10px`,
        margin: `10px`
    };
    const inputStyle = {
        marginTop: `10px`
    }
    return (
        <div>
            <label  style={style}>Введите значение коэффициента {props.valueName}
                <input type="number" className="variable" onChange= {props.changed} value={props.value} style={inputStyle} name={props.name}/>
            </label>
            <p>Коэффициент {props.valueName} : {props.value}</p>
        </div>   
    );
}

export default variable;
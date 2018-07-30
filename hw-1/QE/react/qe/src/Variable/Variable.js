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
        marginTop: `10px`,
        padding: `10px`,
        borderRadius: `5px`,
        fontWeight: `bold`,
        fontSize: `18px`,
        border: `2px solid lightskyblue`
    }

    const containerStyle = {
        display: `block`,
        flexShrink: `0`
    }
    return (
        <div style={containerStyle}>
            <label  style={style}>Введите значение коэффициента {props.name} :
                <input type="number" className="variable" onChange= {props.changed} value={props.value} style={inputStyle} name={props.name}/>
            </label>
            <p>Коэффициент {props.name} : {props.value}</p>
        </div>   
    );
}

export default variable;
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface BasicLabelProps {
    text: string
    type:"header"|"info"
}


export default function BasicLabel(props: BasicLabelProps) {
    const style = props.type === "header" ? { fontFamily: "Roboto-Bold", fontSize: 22 } : { fontFamily: "Roboto-Regular", fontSize: 15 }
    return (
        <label style={style}  >{props.text}</label>
    );
}
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface BasicButtonProps {
    text: string;
    onClick: () => void;
}


export default function BasicButton(props: BasicButtonProps) {
    return (
        <div style={{  }}>
            <Button onClick={props.onClick} variant="contained">{props.text}</Button>
        </div>
    );
}
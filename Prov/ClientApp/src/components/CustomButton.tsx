import * as React from 'react';
import { Container } from 'reactstrap';
import { ItemDto } from '../utils/actions/itemActions';
import NavMenu from './NavMenu';
interface CustomButtonProps {
    labelText: string;
    onClick: () => void;
}
const CustomButton = (props: CustomButtonProps) => {

    return (
        <div>
            <label onClick={props.onClick}>{props.labelText} </label>
            {/*<div style={{ display: "flex", flexDirection:"row" }}>*/}
            {/*<label>{props.item.age} </label>*/}
            {/*<label>{props.item.hobby} </label>*/}
           


        </div>
    );
};

export default CustomButton;

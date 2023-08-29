import * as React from 'react';
import { Container } from 'reactstrap';
import { ItemDto } from '../utils/actions/itemActions';
import NavMenu from './NavMenu';
interface ItemListItemProps {
    item: ItemDto
}
const ItemListItem = (props: ItemListItemProps) => {

    function renderImage(item: ItemDto): JSX.Element {

       return <img src={item.image!} /> 


    }
 
    return (
        <div>
            <label>{props.item.name} </label>
            <div style={{ display: "flex", flexDirection:"row" }}>
            <label>{props.item.age} </label>
             <label>{props.item.hobby} </label>
            {renderImage(props.item)}
                {/*<label>{props.item.image} </label>*/}
            </div>
        </div>
    );
};

export default ItemListItem;

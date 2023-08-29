
import { Route } from 'react-router-dom';
import React, { Component } from 'react';

import '../custom.css'
import { Input, Label } from 'reactstrap';

//export default class TextInput extends Component {
//    /*  static displayName = App.name;*/

//    render() {
//        return (
//            <>

//                <Label> </Label>
//                <Input />

//            </>

//        );
//    }
//}




export interface ListProps {
    data?: any[];
    renderItem: (item: any, index?: number) => JSX.Element;
}

const List = (props: ListProps) => {
 
    function renderItem(item: any, index: number) {
        return (
            <div key={index}>
                {props.renderItem(item, index)}
              {/*  {index !== lastIndex && <ListItemDividerLine></ListItemDividerLine>}*/}
            </div>
        );
    }

    return (
        <>
            {props.data?.map((item, index) => renderItem(item, index))}
        </>
    );
}

export default List;

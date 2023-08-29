
import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";
import '../custom.css'
import { Input, Label } from 'reactstrap';
import List from './List';
import { ApplicationState } from '../store';
import { useEffect } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { setItems } from '../store/itemsSlice';
import { getItems, ItemDto } from '../utils/actions/itemActions';
import { useHistory } from "react-router-dom";
import ItemListItem from './ItemListItem';
import CustomButton from './CustomButton';
import UploadItemsPage from './UploadItemsPage';
import { URLs } from '../constants/URLs';


const HomePage = (props: PropsFromRedux) => {

    const history = useHistory();
    const dispatch = useAppDispatch();
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        console.log("IM IN CCCCC");
        const action =  getItems();
        dispatch(action);
    };

    function renderItem(item: ItemDto, index: number) {
        return (<ItemListItem item={ item} />
           
        );
    }
    return (
        <>
        <List
            data={props.items}
            renderItem={(item, index) => renderItem(item, index!)}
            />
            <CustomButton labelText={"Upload new items"} onClick={() => {  history.push("/UploadItems") }
            } /> 
        </>

    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {

        items: state.items.items,
       
    };
};


const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(HomePage);



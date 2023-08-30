

import React from 'react';
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";
import '../custom.css'
import { ApplicationState } from '../store';
import { useEffect } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { getItems, ItemDto } from '../utils/actions/itemActions';
import { useHistory } from "react-router-dom";
import ItemList from '../components/ItemList';
import BasicButton from '../components/BasicButton';
import BasicLabel from '../components/BasicLabel';


const HomePage = (props: PropsFromRedux) => {

    const history = useHistory();
    const dispatch = useAppDispatch();
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const action = getItems();
        // @ts-ignore
        dispatch(action);
    };

   
    return (
        <div style={{ marginTop: 20, marginLeft: 5,  maxWidth: 360 }}>
            <div style={{ marginBottom: 10, marginLeft: 20, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <BasicLabel type={"header"} text={"Items"}/> 
            <BasicButton text={"Add new items"} onClick={() => { history.push("/AddItems") }
            } />
            </div>  
            {props.items.length > 0 ? (<ItemList
                data={props.items}
            />) : <BasicLabel type={"info"} text={"There are currently no items to display, please add."} />}   
        </div>
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



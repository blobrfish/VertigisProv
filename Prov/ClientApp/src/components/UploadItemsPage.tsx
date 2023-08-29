
import { Route } from 'react-router-dom';
import React, { Component, useState } from 'react';
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";
import '../custom.css'
import { Input, Label } from 'reactstrap';
import List from './List';
import { ApplicationState } from '../store';
import { useEffect } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { setItems } from '../store/itemsSlice';
import { addItems, getItems, ItemDto, parseItems } from '../utils/actions/itemActions';

import fs from 'fs'
import { writeFileSync, readFileSync } from 'fs';
import ItemListItem from './ItemListItem';
import CustomButton from './CustomButton';


const UploadItemsPage = (props: PropsFromRedux) => {

    const [uploadedItems, setUploadedItems] = useState < ItemDto[]>([]);
    const [showUploadedItems, setShowUploadedItems] = useState(false);
    const [resultMsg, setResultMsg] = useState("");
   

  
    function renderInput() {

        function jsonFileUploader() {
            const [selectedFile, setSelectedFile] = useState<File>();
            const [isFilePicked, setIsFilePicked] = useState(false);

            const changeHandler = (event: any) => {
                setResultMsg("")
                setSelectedFile(event.target.files[0]);
                setIsFilePicked(true);
            };

            const handleSubmission = async () => {

                if (isFilePicked) {
                    const result = await parseItems(selectedFile!);
                    if (result?.isSuccessful) {
                        setResultMsg("")
                        setUploadedItems(result.data);
                        setShowUploadedItems(true);
                    } else {
                        setResultMsg("Something went wrong.")
                    }
                }               
            };

            return (
                <div>
                    <input type="file" name="file" onChange={changeHandler} />
                    <div>
                        <button onClick={handleSubmission}>OK</button>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <label>Upload a json file containing items:</label>
                {jsonFileUploader()}
                {/*  {index !== lastIndex && <ListItemDividerLine></ListItemDividerLine>}*/}
            </div>
        );
    }

    function renderUploadedItems() {

        function renderItem(item: ItemDto, index: number) {
            return (<ItemListItem item={item} />);
        }
        return uploadedItems.length > 0 ? (
            <>
            <List
                data={uploadedItems}
                renderItem={(item, index) => renderItem(item, index!)}
                />
                <CustomButton labelText={"Add"} onClick={async () => {
                    const result = await addItems(uploadedItems);
                    if (result?.isSuccessful) {
                        setResultMsg("Items were added succesfully.")
                        setItems([]);
                        setShowUploadedItems(false);
                    } else {
                        setResultMsg("Something went wrong.")
                    }


                }} />
            </>
        ) : <label>The file dont contain any items.</label>
    }


    function renderResultMsg() {
        return (
            <div>
                <label>{resultMsg}</label>
            </div>
        );
    }

    return (
        <>
            {renderInput()}
            {showUploadedItems && renderUploadedItems()}
            {resultMsg && renderResultMsg()}
          
        </>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {

      
       
    };
};


const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(UploadItemsPage);



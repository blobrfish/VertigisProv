

import React, { Component, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import '../custom.css'
import { ApplicationState } from '../store';
import { setItems } from '../store/itemsSlice';
import { addItems, ItemDto, parseItems } from '../utils/actions/itemActions';

import BasicLabel from '../components/BasicLabel';
import ItemList from '../components/ItemList';
import BasicButton from '../components/BasicButton';


const AddItemsPage = () => {

    const [uploadedItems, setUploadedItems] = useState < ItemDto[]>([]);
    const [showUploadedItems, setShowUploadedItems] = useState(false);
    const [resultMsg, setResultMsg] = useState("");
   
    function renderFileUploader() {

        function jsonFileUploader() {
            const [selectedFile, setSelectedFile] = useState<File|null>();
            const [isFilePicked, setIsFilePicked] = useState(false);

            const changeHandler = (event: any) => {
                setResultMsg("")
                setSelectedFile(event.target.files[0]);
                setIsFilePicked(true);
            

            };

            const handleSubmission = async () => {

                if (isFilePicked) {
                    setSelectedFile(null);
                    const result = await parseItems(selectedFile!);
                    if (result?.isSuccessful) {
                        setResultMsg("")
                        setUploadedItems(result.data);
                        if (result.data.length > 0) {
                        
                            console.log(result.data[0].image);
                            setUploadedItems(result.data);
                        } else {
                            setResultMsg("The file dont contain any items")
                        }
                        setShowUploadedItems(true);

                    } else {
                        setUploadedItems([]);
                        setResultMsg("Something went wrong. Please make sure you are uploading a json file.")
                    }
                }               
            };

            return (
                <div>
                    <input type="file" name="file" onChange={changeHandler} />
                    <div>
                        {selectedFile && < button onClick={handleSubmission}>OK</button>}
                    </div>
                </div>
            )
        }
        return (
            <div>
                <BasicLabel type={"info"} text={"Please upload a json file containing items:"} /> 
                {jsonFileUploader()}
            </div>
        );
    }

    function renderUploadedItems() {
        return uploadedItems.length > 0 &&(
            <>
                <ItemList
                data={uploadedItems}
                />
                <BasicButton text={"Add"} onClick={async () => {
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
        ) 
    }


    function renderResultMsg() {
        return (
            <div style={{ marginTop:10 }}>
                <BasicLabel type={"info"} text={resultMsg} />
            </div>
        );
    }
            return (
                <div style={{ marginTop: 20, marginLeft: 25, maxWidth: 360 }}>
                    <BasicLabel type={"header"} text={"Add items"} />
                    {renderFileUploader()}
                    {showUploadedItems && renderUploadedItems()}
                    {resultMsg && renderResultMsg()}
                </div>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
    };
};


const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(AddItemsPage);



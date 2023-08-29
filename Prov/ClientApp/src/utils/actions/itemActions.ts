/*/*import configAxios from "../../../api/apiCaller";*/
/*import { AxiosError, AxiosResponse } from "axios";*/
/*import { apiEndpoints } from "../../../constants/Employer/apiEndpoints";*/
/*import type { AppDispatch } from "../../../store/store";*/
//import {
//    setCurrentLoadingScreen,
//    resetCurrentLoadingScreen,
//} from "../../../store/errorsSlice1";
//import {
//    dispatchHttpError,
//    dispatchBusinessLogicErrorIfFExists,
//    dispatchConnectionErrorIfExists,
//} from "../../errorHandling";
//import { setPreviousJobTitles } from "../../../store/Employer/previousJobTitlesSlice";
//import { ApiResponse } from "../../../types/ApiResponse";
//import { setJobPostingNotifications } from "../../../store/Employer/jobPostingNotificationsSlice";
//import { setInfos } from "../../../store/Employer/infosSlice";
//import { DateFormat } from "../../../constants/countrySpecs";

import { AppDispatch } from "../..";
import { setItems } from "../../store/itemsSlice";
import configAxios from "../../axios/index";
import { apiEndpoints } from "../../constants/apiEndpoints";
//export interface PreviousJobTitleListItemVm {
//    id: number;
//    hashtag: string;
//}

//export interface JobPostingNotification {
//    image: string;
//    jobPostId: string;
//    jobSearchId: string;
//    potentialMatchId: string;
//    text: string;
//    eventId: number;
//    creationDate: string;
//    eventCreationDateUtc: string;
//    isNamePrivate: boolean;
//    isImagePrivate: boolean;
//    jobSeekerProfilePrivacyAppliesNot: boolean;
//    isHandled: boolean;
//    matchProgress: string;
//    matchProgressColor: string;
//}

//export interface SimpleApiResponse {
//    message: string;
//    isSuccessful: boolean;
  
//}

export interface ItemDto {
    id: number;
    name: string;
    hobby: string;
    age: number;
    image: string|null
}



export const getItems = (
 
) => {
    // interface ResponseData {
    //   jobTitles: JobPostingNotificationVm[];
    // }
    return async (dispatch: AppDispatch) => {

        try {
            const response = await configAxios.get<ItemDto[]>(
                "items",
            );
           dispatch(setItems(response.data));
           /* console.log(JSON.stringify(response));*/
          
        } catch (error) {
            console.log(error)
            console.log("Api call failed") 
        }
    };
};



export interface SimpleResponse {
    message: string;
    isSuccessful: boolean;

}


export interface ApiResponse<T> extends SimpleResponse {
    data: T;
}




    export const parseItems = async (file: File): Promise<ApiResponse<ItemDto[]> | undefined> => {

    var formData = new FormData();

    formData.append("file", file);
    //axios.post('upload_file', formData, {
    //    headers: {
    //        'Content-Type': 'multipart/form-data'
    //    }
    //})
  
    /*    let result = null;*/
      
        try {
            const response = await configAxios.post<ApiResponse<ItemDto[]>>(
                "items/jsonFile/parse", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response");
            console.log(JSON.stringify(response.data));
            return response.data;


            //dispatch(setItems(response.data));
            ///* console.log(JSON.stringify(response));*/

        } catch (error) {
            console.log(error)
            console.log("Api call failed")
        }
  
};

export const addItems =

    async (items: ItemDto[]): Promise<SimpleResponse | undefined> => {

  

    try {
        const response = await configAxios.post<SimpleResponse>("items",items);
        console.log("response");
        console.log(JSON.stringify(response.data));
        return response.data;
        //dispatch(setItems(response.data));
        ///* console.log(JSON.stringify(response));*/

    } catch (error) {
        console.log(error)
        console.log("Api call failed")
    }

};


//export const parseItems = (file: File) => {
//    return async (dispatch: AppDispatch): Promise<ApiResponse<ItemDto[]> | undefined> => {
//        let result = null;

//        try {
//            const response = await configAxios.post<ApiResponse<ItemDto[]>>(
//                "jsonFile/parse",
//            );
//            return response.data;


//            //dispatch(setItems(response.data));
//            ///* console.log(JSON.stringify(response));*/

//        } catch (error) {
//            console.log(error)
//            console.log("Api call failed")
//        }
//    };
//};




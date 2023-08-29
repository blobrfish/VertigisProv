/*/*import ActionWithPayload from "../../types/ActionWithPayload";*/
import { createSlice } from "@reduxjs/toolkit";
import { ItemDto } from "../utils/actions/itemActions";
//import {
//    EmployerInfo,
//    JobPostingNotification,
//} from "../../utils/actions/Employer/notificationActions";
//import {
//    convertFromUTCToLocalDateAndFormat,
//    getNowUtc,
//} from "../../utils/dates";
/*import { DateFormat } from "../../constants/countrySpecs";*/
/*import { getPostPublishedAgoText } from "../../utils/strings";*/

export class ItemsState {
    items: ItemDto[] = [];
   
}



//interface Item {
//    name: string;
//    age: number;
//}

type ActionWithPayload<T> = {
  payload: T;
};
const itemsSlice = createSlice({
    name: "items",
    initialState: new ItemsState(),
    reducers: {
        setItems: (
            state: ItemsState,
            action: ActionWithPayload<
                ItemDto[]
            
            >
        ): ItemsState => {
            const { payload } = action;
  
            return {
                ...state,
                items: payload,
            };
        },

        addItems: (
            state: ItemsState,
            action: ActionWithPayload<
                Item[]

            >
        ): ItemsState => {
            const { payload } = action;

            return {
                ...state,
                items: { ...state.items, ...payload, },
            };
        },

      
    },
});
export const setItems = itemsSlice.actions.setItems;
export const addItems = itemsSlice.actions.addItems;


export default itemsSlice.reducer;





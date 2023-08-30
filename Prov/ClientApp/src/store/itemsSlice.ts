
import { createSlice } from "@reduxjs/toolkit";
import { ItemDto } from "../utils/actions/itemActions";


export class ItemsState {
    items: ItemDto[] = [];   
}


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
                ItemDto[]
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





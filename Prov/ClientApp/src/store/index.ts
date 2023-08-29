////import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
////import itemsSlice from './itemsSlice';

import itemsSlice, {ItemsState } from "./itemsSlice";

export interface ApplicationState {
    items: ItemsState;

}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    items: itemsSlice
    //counter: Counter.reducer,
    //weatherForecasts: WeatherForecasts.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}




////export const store = configureStore({
////    reducer: {
////      /*  items: Items,*/
////        items: itemsSlice,
////        //employer: employer,

////        //// jobPostingReducer: newjobPostingReducer,
////        //// recentjobPostings: recentJobPostingsReducer,
////        //// previousJobPostings: previousJobPostingsSlice,
////        //authReducer: authReducer,
////        //errors1: errorsSlice1,
////        //// recentJobPosting: recentJobPostingReducer,
////        //// profileReducer: profileReducer,
////        //// commonReducer: commonReducer,
////        //appVersion: appVersionSlice,
////    },

////    //middleware: (getDefaultMiddleware) =>
////    //    getDefaultMiddleware({
////    //        immutableCheck: false, // for not slowing up in debug mode
////    //        serializableCheck: false,
////    //    }),
////});

////export type RootState = ReturnType<typeof store.getState>;

////export type AppDispatch = typeof store.dispatch;


////import * as WeatherForecasts from './WeatherForecasts';
////import * as Counter from './Counter';



//// The top-level state object
//export interface ApplicationState {
//    items:Items.
//    counter: Counter.CounterState | undefined;
//    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
//}

//// Whenever an action is dispatched, Redux will update each top-level application state property using
//// the reducer with the matching name. It's important that the names match exactly, and that the reducer
//// acts on the corresponding ApplicationState property type.
//export const reducers = {
//    items:
//    counter: Counter.reducer,
//    weatherForecasts: WeatherForecasts.reducer
//};

//// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
//// correctly typed to match your store.
//export interface AppThunkAction<TAction> {
//    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
//}

// The top-level state object






import { createStore, combineReducers, applyMiddleware } from "redux";
import { Comments } from "./Comments";
import { Leaders } from "./Leaders";
import { Dishes } from "./Dishes";
import { Promotions } from "./promotions";
import thunk from 'redux-thunk';
import logger from 'redux-thunk';
import { Initialfeedback } from "./forms";
import { createForms } from "react-redux-form";
export const configureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: Initialfeedback
            })
        }),applyMiddleware(thunk,logger)
        );
    return store;
}
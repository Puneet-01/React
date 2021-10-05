
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Comments } from "./Comments";
import { Leaders } from "./Leaders";
import { Dishes } from "./Dishes";
import { Promotions } from "./promotions";
import thunk from 'redux-thunk';
import logger from 'redux-thunk';

export const configureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            promotions:Promotions,
            leaders:Leaders,
            comments:Comments
        }),
        applyMiddleware(thunk,logger)
        );
    return store;
}
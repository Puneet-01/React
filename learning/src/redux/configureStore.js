
import { createStore, combineReducers } from "redux";
import { Comments } from "./Comments";
import { Leaders } from "./Leaders";
import { Dishes } from "./Dishes";
import { Promotions } from "./promotions";

export const configureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            promotions:Promotions,
            leaders:Leaders,
            comments:Comments
        })
        );
    return store;
}
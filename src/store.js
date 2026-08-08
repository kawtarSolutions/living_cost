import {configureStore} from "@reduxjs/toolkit";
import costOfLivingReducer from "./costOfLivingSlice";
import recommendationReducer from "./recommendationsSlice";


const store = configureStore( {
    reducer: {
        costOfLiving: costOfLivingReducer,
        recommendations: recommendationReducer,
    }
}

);

export default store;
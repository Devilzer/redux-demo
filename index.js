const redux = require("redux");
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
//Action
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM ="BUT_ICECREAM";

function buyCake(){
    return{
        type : BUY_CAKE,
        info :'First Redux Action'
    }
}
function buyIcecream(){
    return{
        type : BUY_ICECREAM
    }
}

//single reducer==================================================================
// const initialState ={
//     numOfCake :10,
//     numOfIcecream:20
// }

// const reducer = (state = initialState ,action)=>{
//     switch (action.type) {
//         case BUY_CAKE: return{
//             ...state,
//             numOfCake : state.numOfCake -1 
//         }
//         case BUY_ICECREAM: return{
//             ...state,
//             numOfIcecream : state.numOfIcecream -1 
//         }
//         default: return state
//     }
// };
//multiple reducer===================================================================
const initialCakeState = {
    numOfCake :10
}
const initialIcecreamState = {
    numOfIcecream :20
}
const cakeReducer = (state = initialCakeState ,action)=>{
    switch (action.type) {
        case BUY_CAKE: return{
            ...state,
            numOfCake : state.numOfCake -1 
        }
        default: return state
    }
};

const icecreamReducer = (state = initialIcecreamState ,action)=>{
    switch (action.type) {
        case BUY_ICECREAM: return{
            ...state,
            numOfIcecream : state.numOfIcecream -1 
        }
        default: return state
    }
};
const rootReducer = combineReducers({
    cake : cakeReducer,
    iceCreame : icecreamReducer
});

const store = createStore(rootReducer,applyMiddleware(logger));
console.log("initial State ",store.getState());
const unsubscribe =store.subscribe(()=>{});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsubscribe();

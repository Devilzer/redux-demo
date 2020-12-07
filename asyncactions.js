const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios").default;

const initialState = {
    loading : false,
    users : [],
    error: ""
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUserRequest = () =>{
    return {
        type : FETCH_USERS_REQUEST
    };
};
const fetchUserScccess = (users) =>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload : users
    }
};
const fetchUserError = (error)=>{
    return{
        type: FETCH_USERS_FAILURE,
        payload : error
    }
};

//reducer
const reducer = (state =initialState ,action)=>{
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading : true
            };
        case FETCH_USERS_SUCCESS:
            return{
                ...state,
                loading : false,
                users : action.payload,
                error : ""
            };
        case FETCH_USERS_FAILURE:
            return{
                ...state,
                loading : false,
                users : [],
                error : action.payload
            };
    
        default:
            return state;
    }
};

//async action creater
const fetchUsers = ()=>{
    return function(dispatch){
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users').then(
            (response)=>{
                //response.date for array of users
                const users = response.data.map(user=>user.name);
                dispatch(fetchUserScccess(users));
            }
        ).catch((error)=>{
            //error.message for error
            dispatch(fetchUserError(error.message));
        }
        );
    };

}

const store = createStore(reducer,applyMiddleware(thunkMiddleware));
store.subscribe(()=>{
    console.log(store.getState());
});
store.dispatch(fetchUsers());
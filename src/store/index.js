import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ReduThunk from 'redux-thunk';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filterSlice';

// Store Middlewere (next = dispatch)
const stringMiddlewere = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    }
    return next(action);
}

//усиление стора с помощью Store enhancers, теперь в диспатч помно передать строку а спомощью этой функции мы проверим тип на строку и запишем как объект в диспатч
const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            });
        }
        return oldDispatch(action);
    }
    return store;
}

const store = configureStore({
    reducer: { heroes, filters },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddlewere),
    devTools: process.env.NODE_ENV !== 'production',
})

// old connetcion strore
// const store = createStore(
//     combineReducers({ heroes, filters }),
//     compose(applyMiddleware(ReduThunk, stringMiddlewere),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

export default store;
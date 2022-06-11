import { configureStore } from "@reduxjs/toolkit";
import { compose } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

import rootSaga from "../sagas";
import reducer from "./reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const configureAppStore = () => {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    const middlewares = [sagaMiddleware, thunk];
    const store = configureStore({
        reducer,
        middleware: [...middlewares],
        devTools: process.env.NODE_ENV !== "production",
    });
    sagaMiddleware.run(rootSaga);
    return store;
};

const store = configureAppStore();
export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

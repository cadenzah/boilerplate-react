// export the function's result
// can be editted when ssr is used
import { configureStore as _configureStore } from '@reduxjs/toolkit';

import rootReducer from './modules';

export default function configureStore(preloadedState) {
    const store = _configureStore({
        reducer: rootReducer,
        // middleware: (getDefaultMiddleware) => {},
        preloadedState,
    });
    return store;
};

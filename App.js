import React from 'react';
import {Provider} from 'react-redux';
import Members from './container/Members';
import configureStore from './store/configureStore';

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <Members/>
    </Provider>
);

export default App;

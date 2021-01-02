import React from 'react';
import NavContainer from './src/navigation/naviagtion';
import Loader from './src/component/loader/loader';
import {StoreProvider} from './src/context/store/store';


const App = () => (
    <StoreProvider>
        <NavContainer />
        <Loader />
    </StoreProvider>
);

export default App;
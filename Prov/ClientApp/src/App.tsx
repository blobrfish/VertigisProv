import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './custom.css'

import HomePage from './pages/HomePage';
import AddItemsPage from './pages/AddItemsPage';


function App() {
    return (
        <Switch>
            <Route exact path={"/"}>
                <HomePage />
            </Route>
            <Route exact path={"/AddItems"}>
                <AddItemsPage />
            </Route>
        </Switch>
   )
}


export default App;

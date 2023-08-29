import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';

import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'
import { URLs } from './constants/URLs';
import HomePage from './components/HomePage';

import UploadItemsPage from './components/UploadItemsPage';

//export default () => (
//    <Layout>
//        <Route exact path='/' component={Home} />
//        <Route path='/counter' component={Counter} />
//        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
//    </Layout>
//);



function App() {
    return (
        <Switch>
            {/*<Route exact path={"/"}>*/}
            {/*    <HomePage />*/}
            {/*</Route>*/}

            <Route exact path={"/"}>
                <UploadItemsPage />
            </Route>
        
           
        
        </Switch>
      
        
     
   )

    /*  return (<>    <TextInput     label={"tesssst"}>    </TextInput> </>)*/



}


export default App;

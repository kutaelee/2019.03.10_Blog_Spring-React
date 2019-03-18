import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Top from './js/Top';
import Subject from './js/Subject';
import Footer from './js/Footer';
import MainContent from './js/main/MainContent';
import DocContent from './js/document/DocContent';
import SubjectInsertPage from './js/subject/InsertPage'
import SubjectModifyPage from './js/subject/ModifyPage'
import { BrowserRouter,Route,Switch } from "react-router-dom";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
(<BrowserRouter>
    <div>
        <Route path="/" component={Top} />   
        <Route path="/" component={Subject} />
        <Route path="/" component={Footer} />
        <Switch>
            <Route path="/subjectlist" component={SubjectModifyPage} />
            <Route path="/subject/:name" component={SubjectInsertPage} />
            <Route path="/document/:name" component={DocContent} />
            <Route path="/" component={MainContent} />
        </Switch>   
    </div>
</BrowserRouter>), document.getElementById('root')
 )


serviceWorker.unregister();

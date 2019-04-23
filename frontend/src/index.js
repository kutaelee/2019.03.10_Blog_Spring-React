import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Top from './js/Top';
import Subject from './js/Subject';
import Footer from './js/Footer';
import Empty from './js/Empty';
import LoginBox from './js/LoginBox';
import ModifyLink from './js/ModifyLink';
import AddLink from './js/AddLink';
import MainContent from './js/main/MainContent';
import DocContent from './js/document/DocContent';
import DocWritePage from './js/document/DocWritePage';
import DocModifyPage from './js/document/DocModifyPage';
import SubjectInsertPage from './js/subject/InsertPage';
import SubjectModifyPage from './js/subject/ModifyPage';
import Search from './js/search/Search';
import { BrowserRouter,Route,Switch } from "react-router-dom";

import * as serviceWorker from './serviceWorker';
  
ReactDOM.render(
(<BrowserRouter>
    <div>
        <Route path="/" component={Top} /> 
        <Route path="/" component={LoginBox} /> 
        <Route path="/" component={Subject} />

        <Switch>
            <Route path="/document/*/writepage" component={DocWritePage}/>
            <Route path="/document/*/*/modifypage" component={DocModifyPage}/>
            <Route path="/subjectlist" component={SubjectModifyPage} />
            <Route path="/subject/:name" component={SubjectInsertPage} />
            <Route path="/document/:name" component={DocContent} />
            <Route path="/search" component={Search}/>
            <Route path="/modifylink" component={ModifyLink}/>
            <Route path="/addlink" component={AddLink}/>
            <Route path="/" component={MainContent} />
           
        </Switch>   
        <Route path="/" component={Footer} />
        <Route path="/" component={Empty} />
    </div>
</BrowserRouter>), document.getElementById('root')
 )


serviceWorker.unregister();

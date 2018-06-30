import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './configureStore';
import './styles/index.css';
import Login from './components/Login';
import StartPage from './components/StartPage';
import Lk from './components/Lk';
import Error from './components/Error';
import Classmates from './components/Classmates';
import Classes from './components/Classes';
import Rating from './components/Rating';
import Diary from './components/Diary';

ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={StartPage} />
                        <Route path="/login" component={Login} />
                        <Route path="/classmates" component={Classmates} />
                        <Route path="/classes" component={Classes} />
                        <Route path="/rating" component={Rating} />
                        <Route exact path="/lk" component={Lk} />
                        <Route exact path="/diary/:teacherid/:subjectid/:classid" component={Diary} />
                        <Route path="*" component={Error} />
                    </Switch>
                </BrowserRouter>
            </PersistGate>
        </Provider>,
    document.getElementById('root'));

registerServiceWorker();

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage';
import ImageForm from './components/PostForm/ImageForm';
import WordsForm from './components/PostForm/WordsForm';
import LinkForm from './components/PostForm/LinkForm'
import Dashboard from './components/Dashboard';
import CreateUser from './components/CreateUser'

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage isLoaded={isLoaded} />
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <CreateUser />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/new/image'>
            <ImageForm />
          </Route>
          <Route path='/new/words'>
            <WordsForm />
          </Route>
          <Route path='/new/link'>
            <LinkForm />
          </Route>
          {/* <Route path='/create-user'>
            <CreateUser />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;

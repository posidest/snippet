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
import UserBlog from './components/UserBlog';

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
            <LandingPage />
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
          <Route path='/:blogName'>
            <UserBlog />
          </Route>
          {/* <Route path='/:blogName'>
            <UserBlog />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;

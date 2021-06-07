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
import ReblogForm from './components/PostForm/ReblogForm'
import Dashboard from './components/Dashboard';
import CreateUser from './components/CreateUser'
import UserBlog from './components/UserBlog';


const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBlog, setIsBlog] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/login'>
            <LoginFormPage />
          </Route>
          <Route exact path='/signup'>
            <CreateUser />
          </Route>
          <Route exact path='/dashboard'>
            <Dashboard isLoaded={isLoaded}/>
          </Route>
          <Route exact path='/new/image'>
            <ImageForm />
          </Route>
          <Route exact path='/new/words'>
            <WordsForm />
          </Route>
          <Route exact path='/new/link'>
            <LinkForm />
          </Route>
          <Route exact path='/:postId/reblog'>
            <ReblogForm />
          </Route>
          <Route exact path='/:blogName'>
            <UserBlog setIsBlog={setIsBlog} isBlog={isBlog}/>
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

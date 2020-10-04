import React, { useState } from 'react';
import { BsHouseFill } from 'react-icons/bs';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import { Flex, Box, Link } from 'rebass';

import './app.css';

import Graphs from '../pages/graphs/graphs.js';
import UserForm from '../pages/form/user-form.js';
import Methods from '../pages/methods/methods.js';



function App() {

  const [hasSubmitted, setSubmit] = useState(false);
  const [approved, approve] = useState(false);

  const changeSubmitState = (approved) => {
    if (approved) {
      setSubmit(true);
      approve(true);
    } else {
      setSubmit(true);
      approve(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div id="app">
        <div id="background" className={(hasSubmitted) ? (approved) ? "approved" : "denied" : "notSubmitted"}>
        </div>
        <div id="navbar">
          <Flex
            px={2}
            color='#fff3e0'
            bg={(hasSubmitted) ? (approved) ? "#31aa3c" : "#ff5353" : '#5373ff'}
            alignItems='center'>
            <Box mx='auto' />
            <Link className={"navbar-link"} variant='nav' href='/'>
              <h2>Predict</h2>
            </Link>
            <Link className={"navbar-link"} variant='nav' href='/insights'>
              <h2>Insights</h2>
            </Link>
            <Link className={"navbar-link"} variant='nav' href='/methodologies'>
              <h2>Methodologies</h2>
            </Link>
          </Flex>
        </div>
        <div id="header">
          <BsHouseFill style={{ fontSize: "13em" }} />
          <div id="header-text">
            <h1>Will my Mortgage get Approved?</h1>
          </div>
        </div>
        <div id="content">
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <UserForm approve={changeSubmitState} />
              </Route>
              <Route exact path="/insights">
                <Graphs approve={changeSubmitState} />
              </Route>
              <Route exact path="/methodologies">
                <Methods />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>

      </div>
    </ThemeProvider>

  );
}

export default App;

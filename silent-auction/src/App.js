import "./css/index.css";
import React from 'react';
import { Route } from 'react-router-dom';

import Header from "../src/components/Header";
import MainContainer from './components/MainContainer';
import SignUp from './components/forms/SignUp';
import CreateAuctionCard from './components/forms/CreateAuction';
import Conformation from "./components/Conformation";

function App() {
  return (
    <div className="body">
      <Header />
      <Route exact path='/'>
        <MainContainer />
      </Route>
      <Route exact path='/signup'>
        <SignUp />
      </Route>
      <Route exact path='/create'>
        <CreateAuctionCard />
      </Route >
      <Route exact path='/login'>
        <p>login</p>
      </Route>
      <Route exact path="/confirm">
        <Conformation />
      </Route>
    </div>
  );
}

export default App;

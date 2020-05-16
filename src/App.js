import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Link,
  useLocation
} from "react-router-dom";

import "./App.css";
import Form from "./Form";
import ReactHookForm from "./ReactHookForm";
import Ifsc from "./Ifsc";
import Navbar from "./Navbar";
import AddMore from "./AddMore";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/form" component={Form} />
          <Route exact path="/react-hook-form" component={ReactHookForm} />
          <Route exact path="/ifsc" component={Ifsc} />
          <Route exact path="/addmore" component={AddMore} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

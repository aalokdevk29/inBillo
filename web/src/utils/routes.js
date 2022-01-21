import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignIn from "../containers/signIn";
import SignUp from "../containers/signUp";
import Dashboard from "../containers/dashboard";
import history from "../utils/history";
import payment from "../containers/payment";
import Transaction from "../containers/transaction";

const Routes = () => (
  <Router history={history}>
    <QueryParamProvider ReactRouterRoute={Route}>
      <div className="App">
        <Switch>
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route path="/payment" component={payment} />
          <Route exact path="/transactions" component={Transaction} />
        </Switch>
      </div>
    </QueryParamProvider>
  </Router>
);

export default Routes;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import MainLayout from "../Hoc/MainLayout";
import Dashboard from "../Containers/Dashboard";
import Login from "../Containers/Login";
import SnackBar from "../Components/SnackBar";
import Modal from "../Components/Modal";
import Product from "../Containers/Product";
import Category from "../Containers/Category";

export default function Routes() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/dashboard"
            exact={false}
            component={() => {
              if (localStorage.getItem("token")) {
                return (
                  <Switch>
                    <Dashboard>
                      <Route
                        path="/dashboard/product"
                        exact
                        component={Product}
                      />
                      <Route
                        path="/dashboard/category"
                        exact
                        component={Category}
                      />
                    </Dashboard>
                    >
                  </Switch>
                );
              }
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
        <Modal />
        <SnackBar />
      </MainLayout>
    </Router>
  );
}

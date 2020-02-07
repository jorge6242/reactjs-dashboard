import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { useDispatch } from "react-redux";
import MainLayout from "../Hoc/MainLayout";
import Dashboard from "../Containers/Dashboard";
import Login from "../Containers/Login";
import SnackBar from "../Components/SnackBar";
import Modal from "../Components/Modal";
import Product from "../Containers/Product";
import Category from "../Containers/Category";
import { checkUser } from "../Actions/loginActions";
import SecureStorage from "../Config/SecureStorage";

export default function Routes() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])
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
              if (SecureStorage.getItem("token")) {
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

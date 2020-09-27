import React, { FunctionComponent, useContext } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem } from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import {
  FirebaseContext,
  GoogleSignIn,
  GoogleSignOut,
} from "./FirebaseProvider";

const NavbarPage: FunctionComponent<{}> = () => {
  const { auth } = useContext(FirebaseContext);

  return (
    <Router>
      <MDBNavbar color="black" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text text-monospace">Toolbox</strong>
        </MDBNavbarBrand>
        <MDBNavbarNav right>
          <MDBNavItem>
            {auth.currentUser ? <GoogleSignOut /> : <GoogleSignIn />}
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBNavbar>
    </Router>
  );
};

export default NavbarPage;

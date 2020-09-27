import React, { FunctionComponent, useContext } from "react";
import { MDBNavbar, MDBNavbarNav, MDBNavItem } from "mdbreact";
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

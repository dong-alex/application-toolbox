import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBFooter,
  MDBIcon,
  MDBBtn,
} from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter
      color="black"
      className="font-small pt-4 mt-4"
      style={{ position: "relative" }}
    >
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="12" className="text-center">
            <a
              href="https://github.com/dong-alex/application-toolbox"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MDBBtn color="dark" social="git">
                <MDBIcon fab icon="github" className="pr-1" /> Github
              </MDBBtn>
            </a>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Alex Dong
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;

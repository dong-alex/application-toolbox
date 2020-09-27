import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBFooter,
  MDBTypography,
  MDBIcon,
  MDBBtn,
} from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="black" className="font-small pt-4 mt-4 fixed-bottom">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="12" className="text-center">
            <MDBTypography tag="h5" variant="h5">
              Final Regards
            </MDBTypography>
            <MDBTypography tag="p">
              The project is currently not suitable to take in open source
              contributions. In the future, if the current Google Firestore
              configuration is more suited for open development, then the idea
              might be good. Please visit the github repo if you are curious
              about the code.
            </MDBTypography>
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

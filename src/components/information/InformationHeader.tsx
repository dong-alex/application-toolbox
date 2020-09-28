import React, { FunctionComponent } from "react";
import {
  MDBBox,
  MDBTypography,
  MDBPopover,
  MDBBtn,
  MDBIcon,
  MDBPopoverHeader,
  MDBPopoverBody,
} from "mdbreact";

const InformationHeader: FunctionComponent<{}> = () => {
  return (
    <MDBBox className="d-flex flex-row mt-3 justify-content-center align-middle">
      <MDBTypography tag="h2" variant="h2">
        Basic Information
      </MDBTypography>
      <MDBPopover
        placement="right"
        popover
        clickable
        data-toggle="popover-hover"
      >
        <MDBBtn color="primary" size="sm" className="ml-3">
          <MDBIcon icon="question" />
        </MDBBtn>
        <div>
          <MDBPopoverHeader>What is this?</MDBPopoverHeader>
          <MDBPopoverBody>
            Save your frequently used links such as your Github and LinkedIn to
            apply to job applications without have multiple tabs opened.
          </MDBPopoverBody>
        </div>
      </MDBPopover>
    </MDBBox>
  );
};

export default InformationHeader;

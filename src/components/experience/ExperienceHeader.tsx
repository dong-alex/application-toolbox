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

const ExperienceHeader: FunctionComponent<{}> = () => {
  return (
    <MDBBox className="d-flex flex-row mt-3 mb-3 justify-content-center align-middle">
      <MDBTypography tag="h2" variant="h2">
        Work Experiences
      </MDBTypography>
      <MDBPopover
        placement="right"
        popover
        data-toggle="popover-hover"
        clickable
      >
        <MDBBtn color="primary" size="sm" className="ml-3">
          <MDBIcon icon="question" />
        </MDBBtn>
        <div>
          <MDBPopoverHeader>What is this?</MDBPopoverHeader>
          <MDBPopoverBody>
            Save your work experiences to reference to depending on the
            application platform.
          </MDBPopoverBody>
        </div>
      </MDBPopover>
    </MDBBox>
  );
};

export default ExperienceHeader;

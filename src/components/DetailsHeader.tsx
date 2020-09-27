import React, { FunctionComponent } from "react";
import { MDBRow, MDBCol, MDBView } from "mdbreact";

const DetailsHeader: FunctionComponent<{}> = () => {
  return (
    <MDBRow className="sticky-top">
      <MDBCol className="text-center border border-dark p-2" md="6">
        Basic Information
      </MDBCol>
      <MDBCol className="text-center border border-dark p-2" md="6">
        Work Description
      </MDBCol>
    </MDBRow>
  );
};

export default DetailsHeader;

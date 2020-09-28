import React, { FunctionComponent } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { InformationFormProps } from "../types";

const InformationForm: FunctionComponent<InformationFormProps> = ({
  url,
  onTypeChange,
  onUrlChange,
  onSubmit,
}) => {
  return (
    <MDBRow className="my-3">
      <MDBCol md="4" className="px-md-0">
        <select
          className="browser-default custom-select"
          onChange={onTypeChange}
        >
          <option>Choose Website</option>
          <option value="Github">Github</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Personal Website">Personal Website</option>
        </select>
      </MDBCol>
      <MDBCol md="4" className="px-md-0">
        <MDBInput
          noTag
          type="text"
          value={url}
          onChange={onUrlChange}
          hint="URL"
          className=""
        />
      </MDBCol>
      <MDBCol md="4" className="px-md-0">
        <MDBBtn color="blue" className="m-0 px-2 py-2 w-100" onClick={onSubmit}>
          Add
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
};

export default InformationForm;

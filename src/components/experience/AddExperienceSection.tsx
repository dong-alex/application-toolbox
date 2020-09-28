import React, { FunctionComponent } from "react";
import DatePicker from "react-datepicker";
import {
  MDBBtn,
  MDBCard,
  MDBCollapse,
  MDBCardBody,
  MDBInput,
  MDBBox,
} from "mdbreact";
import { AddExperienceProps } from "../../types";

const AddExperienceSection: FunctionComponent<AddExperienceProps> = ({
  onOpenAddExperience,
  open,
  onCompanyChange,
  onPositionChange,
  onCurrentChange,
  onStartDateChange,
  onEndDateChange,
  onDescriptionChange,
  onSubmitClick,
  company,
  position,
  isCurrent,
  startDate,
  endDate,
  textDescription,
}) => {
  return (
    <>
      <MDBBtn color="primary" onClick={onOpenAddExperience}>
        Add New Experience
      </MDBBtn>
      <MDBCard className="mt-3 mb-3">
        <MDBCollapse id="collapse1" isOpen={open}>
          <MDBCardBody>
            <MDBInput
              noTag
              type="text"
              value={company}
              onChange={onCompanyChange}
              hint="Company"
            />
            <MDBInput
              noTag
              type="text"
              value={position}
              onChange={onPositionChange}
              hint="Position"
            />
            <MDBBox className="align-middle mt-3">
              <label className="mr-3">Current?</label>
              <input
                type="checkbox"
                checked={isCurrent}
                onChange={onCurrentChange}
              />
            </MDBBox>
            <MDBBox className="d-inline-flex flex-column flex-md-row my-3">
              <MDBBox className="d-flex flex-column mr-3">
                <label className="mr-3">Start Date:</label>
                <DatePicker
                  showYearDropdown
                  dateFormat="MM/dd/yyyy"
                  selected={startDate}
                  onChange={onStartDateChange}
                />
              </MDBBox>
              <MDBBox className="d-flex flex-column">
                <label className="mr-3">End Date:</label>
                <DatePicker
                  disabled={isCurrent}
                  dateFormat="MM/dd/yyyy"
                  showYearDropdown
                  selected={endDate}
                  onChange={onEndDateChange}
                />
              </MDBBox>
            </MDBBox>
            <MDBBox className="d-flex flex-row">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon">
                  <i className="fas fa-pencil-alt prefix"></i>
                </span>
              </div>
              <textarea
                className="form-control"
                rows={7}
                value={textDescription}
                onChange={onDescriptionChange}
                placeholder="Enter in point form or text description"
              />
            </MDBBox>
            <MDBBtn
              className="mt-3 ml-0 mr-0"
              color="primary"
              onClick={onSubmitClick}
            >
              Add Work Experience
            </MDBBtn>
          </MDBCardBody>
        </MDBCollapse>
      </MDBCard>
    </>
  );
};

export default AddExperienceSection;

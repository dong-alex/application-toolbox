import React, { FunctionComponent } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import DatePicker from "react-datepicker";
import {
  MDBBox,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { Formik, Form, Field, FieldInputProps } from "formik";
import { ExperienceItemProps, WorkDetails } from "../../types";
import "react-datepicker/dist/react-datepicker.css";

const ExperienceItem: FunctionComponent<ExperienceItemProps> = ({
  details,
  activeField,
  onEditClick,
  onEditClose,
  onDeleteClick,
  onSaveChanges,
}) => {
  const {
    company,
    description,
    position,
    current,
    startDate,
    endDate,
    id,
  } = details;
  return activeField ? (
    <MDBCard className="my-3">
      <MDBCardBody>
        <Formik
          initialValues={details}
          onSubmit={async (values: WorkDetails) => {
            await onSaveChanges(values);
          }}
        >
          {({
            isSubmitting,
            setFieldValue,
            values: { current },
            handleReset,
          }) => (
            <Form>
              <Field noTag id="company" name="company" as={MDBInput} />
              <Field noTag id="position" name="position" as={MDBInput} />
              <MDBBox className="align-middle mt-3">
                <label className="mr-3">Current?</label>
                <Field id="current" type="checkbox" name="current" />
              </MDBBox>
              <MDBRow className="my-3 d-flex align-middle">
                <MDBCol>
                  <div className="mr-3">
                    <label className="mr-3">Start Date:</label>
                    <Field id="startDate" name="startDate">
                      {({ field }: { field: FieldInputProps<string> }) => {
                        return (
                          <DatePicker
                            showYearDropdown
                            dateFormat="MM/yyyy"
                            selected={
                              (field.value && new Date(field.value)) || null
                            }
                            onChange={(date) => {
                              setFieldValue(field.name, date);
                            }}
                            showMonthYearPicker
                          />
                        );
                      }}
                    </Field>
                  </div>
                </MDBCol>
                {!current && (
                  <MDBCol>
                    <label className="mr-3">End Date:</label>
                    <Field id="endDate" name="endDate">
                      {({ field }: { field: FieldInputProps<string> }) => {
                        return (
                          <DatePicker
                            showYearDropdown
                            dateFormat="MM/yyyy"
                            selected={
                              (field.value && new Date(field.value)) || null
                            }
                            onChange={(date) => {
                              setFieldValue(field.name, date);
                            }}
                            showMonthYearPicker
                          />
                        );
                      }}
                    </Field>
                  </MDBCol>
                )}
              </MDBRow>
              <MDBBox className="d-flex flex-row w-100">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    <i className="fas fa-pencil-alt prefix"></i>
                  </span>
                </div>
                <Field
                  id="description"
                  name="description"
                  rows={7}
                  as="textarea"
                  className="w-100"
                />
              </MDBBox>
              <MDBBox className="d-flex flex-column my-2">
                <MDBBtn
                  className="m-0"
                  color="red"
                  onClick={(event) => {
                    handleReset(event);
                    onEditClose();
                  }}
                >
                  <MDBIcon icon="ban" className="mr-1" />
                  Undo
                </MDBBtn>
                <MDBBtn
                  disabled={isSubmitting}
                  className="m-0"
                  color="primary"
                  type="submit"
                >
                  <MDBIcon icon="save" className="mr-1" />
                  Save
                </MDBBtn>
              </MDBBox>
            </Form>
          )}
        </Formik>
      </MDBCardBody>
    </MDBCard>
  ) : (
    <MDBBox key={id} className="d-flex flex-column mt-2 mb-5">
      <MDBBox className="d-flex d-flex-column">
        <MDBInput
          noTag
          type="text"
          name="company"
          className="h-auto w-75"
          value={company}
          disabled
        />
        <CopyToClipboard text={company}>
          <MDBBtn rounded color="light-blue" className="m-0">
            <MDBIcon icon="copy" className="mr-1" />
            Copy
          </MDBBtn>
        </CopyToClipboard>
      </MDBBox>
      <MDBBox className="d-flex d-flex-column">
        <MDBInput
          noTag
          type="text"
          name="position"
          className="h-auto w-75"
          value={position}
          disabled
        />
        <CopyToClipboard text={position}>
          <MDBBtn rounded color="light-blue" className="m-0">
            <MDBIcon icon="copy" className="mr-1" />
            Copy
          </MDBBtn>
        </CopyToClipboard>
      </MDBBox>
      <MDBRow className="my-3 d-flex align-middle">
        <MDBCol>
          <div className="mr-3">
            <label className="mr-3">Start Date:</label>
            <DatePicker
              showYearDropdown
              dateFormat="MM/yyyy"
              maxDate={endDate}
              selected={startDate}
              onChange={() => {}}
              showMonthYearPicker
              disabled
            />
          </div>
        </MDBCol>
        {!current && (
          <MDBCol>
            <div>
              <label className="mr-3">End Date:</label>
              <DatePicker
                showYearDropdown
                dateFormat="MM/yyyy"
                minDate={startDate}
                selected={endDate}
                onChange={() => {}}
                showMonthYearPicker
                disabled
              />
            </div>
          </MDBCol>
        )}
      </MDBRow>
      <MDBBox className="align-middle mt-3">
        <label className="mr-3">Current?</label>
        <input type="checkbox" checked={current} />
      </MDBBox>
      <span>Description: Read Only</span>
      <textarea
        rows={7}
        className="mb-3"
        name="description"
        value={description}
        readOnly
      />
      <CopyToClipboard
        text={description}
        onCopy={() => {
          console.log("Copied", description);
        }}
      >
        <MDBBtn rounded color="light-blue" className="m-0">
          <MDBIcon icon="copy" className="mr-1" />
          Copy Description
        </MDBBtn>
      </CopyToClipboard>

      <MDBBtn
        rounded
        color="green"
        onClick={() => {
          onEditClick(id);
        }}
        className="m-0"
      >
        <MDBIcon icon="edit" className="mr-1" />
        Edit
      </MDBBtn>
      <MDBBtn
        rounded
        color="red"
        className="m-0"
        onClick={() => {
          onDeleteClick(id);
        }}
      >
        <MDBIcon icon="trash" className="mr-1" />
        Delete
      </MDBBtn>
    </MDBBox>
  );
};

export default ExperienceItem;

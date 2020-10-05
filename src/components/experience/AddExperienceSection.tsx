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
import { AddExperienceProps, ExperienceFormValues } from "../../types";
import { Field, FieldInputProps, Form, Formik } from "formik";


const AddExperienceSection: FunctionComponent<AddExperienceProps> = ({
  onOpenAddExperience,
  open,
  initialValues,
  onSubmitClick,
}) => {
  return (
    <>
      <MDBBtn color="primary" onClick={onOpenAddExperience}>
        Add New Experience
      </MDBBtn>
      <MDBCard className="mt-3 mb-3">
        <MDBCollapse id="collapse1" isOpen={open}>
          <MDBCardBody>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values: ExperienceFormValues) => {
                await onSubmitClick(values);
              }}
            >
              {({ isSubmitting, setFieldValue, values: { current } }) => (
                <Form>
                  <Field
                    id="company"
                    name="company"
                    hint="Company"
                    as={MDBInput}
                  />
                  <Field
                    id="position"
                    name="position"
                    hint="Position"
                    as={MDBInput}
                  />
                  <MDBBox className="align-middle mt-3">
                    <label className="mr-3">Current?</label>
                    <Field id="current" type="checkbox" name="current" />
                  </MDBBox>
                  <MDBBox className="d-inline-flex flex-column flex-md-row my-3">
                    <MDBBox className="d-flex flex-column mr-3">
                      <label className="mr-3">Start Date:</label>
                      <Field id="startDate" name="startDate">
                        {({ field }: { field: FieldInputProps<string> }) => {
                          return (
                            <DatePicker
                              showYearDropdown
                              dateFormat="MM/dd/yyyy"
                              selected={
                                (field.value && new Date(field.value)) || null
                              }
                              onChange={(date) => {
                                setFieldValue(field.name, date);
                              }}
                            />
                          );
                        }}
                      </Field>
                    </MDBBox>
                    {!current && (
                      <MDBBox className="d-flex flex-column">
                        <label className="mr-3">End Date:</label>
                        <Field id="endDate" name="endDate">
                          {({ field }: { field: FieldInputProps<string> }) => {
                            return (
                              <DatePicker
                                showYearDropdown
                                dateFormat="MM/dd/yyyy"
                                selected={
                                  (field.value && new Date(field.value)) || null
                                }
                                onChange={(date) => {
                                  setFieldValue(field.name, date);
                                }}
                              />
                            );
                          }}
                        </Field>
                      </MDBBox>
                    )}
                  </MDBBox>
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
                  <MDBBtn
                    className="mt-3 ml-0 mr-0"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Add Work Experience
                  </MDBBtn>
                </Form>
              )}
            </Formik>
          </MDBCardBody>
        </MDBCollapse>
      </MDBCard>
    </>
  );
};

export default AddExperienceSection;

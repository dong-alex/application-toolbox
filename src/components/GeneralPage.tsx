import { MDBBox, MDBTypography } from "mdbreact";
import React, { FunctionComponent } from "react";

const GeneralPage: FunctionComponent<{}> = () => {
  return (
    <MDBBox>
      <MDBTypography
        tag="h1"
        variant="h1"
        className="text-monospace text-center mt-3 mb-3"
      >
        Job Toolbox
      </MDBTypography>
      <MDBTypography tag="h2" variant="h2">
        Introduction
      </MDBTypography>
      <MDBTypography tag="p">
        With so many potential positions for all skill levels in Software
        Engineering, there are many platforms and areas of interest where we
        have to apply through. Have you ever noticed that different job
        application portals have different formats, and does not necessarily
        treat your resume scraping well?
      </MDBTypography>
      <MDBTypography tag="p">
        In most cases, your position may be all capitalized, or the
        spacing/indentation in your job description may be ruined without you
        realizing. Can you imagine a the receiver of your application seeing
        <strong> "yourdescription like this"</strong>? Maybe you wanted to see
        your details in your description look like:
      </MDBTypography>
      <ul className="text-muted">
        <li>One bullet per line</li>
        <li>Easy to read descriptions</li>
        <li>Everyone wins</li>
      </ul>
      <MDBTypography tag="p">
        Instead, their description in work experience is just a textbox and can
        only read your list as:
      </MDBTypography>
      <MDBTypography tag="p" className="text-muted">
        - Your first important description.- Your second line that exists on the
        same line.- Your entire work description is one whole paragraph of short
        points.- Created X feature in Y, which resulted in a positive growth of
        Z for my company.
      </MDBTypography>
      <MDBTypography tag="p">
        Now we should always put in work to create a personalized application
        for every position and company that we apply to. If you were to be
        eligible amongst the 1000s of applicants that a company could get, they
        will be investing in you for years to come. But what if every
        application you made, you had to deal with this issue? What if there was
        some way to keep track of all of your work experiences and perhaps
        different variations of it best suited for their job portal?
      </MDBTypography>
      <MDBTypography tag="h2" variant="h2">
        Personal Toolbox
      </MDBTypography>
      <MDBTypography tag="p">
        Create your important links such as your <strong>LinkedIn</strong>,{" "}
        <strong>Github</strong>, or <strong>Portfolio</strong> that every
        application is asking for. Save the tab cluttering for the rest of the
        job postings you may be visiting next.
      </MDBTypography>
      <MDBTypography tag="p">
        The company knows your description in the job portal will be like your
        resume if not better? Great! Otherwise, create a quick entry with the
        important details such as <strong>start dates</strong>,{" "}
        <strong>end dates</strong>, <strong>positions</strong>, and{" "}
        <strong>work descriptions</strong>.
      </MDBTypography>
      <MDBTypography tag="h2" variant="h2">
        What Did I Do?
      </MDBTypography>
      <MDBTypography>
        I created a React application in TypeScript. You will need a Gmail
        account to start creating your entries. The application is simple enough
        to just be your personal clipboard in another screen while you browse
        through job postings.
      </MDBTypography>
      <span>Tech Stack</span>
      <ul>
        <li>React</li>
        <li>TypeScript</li>
        <li>Google Firebase</li>
        <li>MD Bootstrap</li>
      </ul>
      I will be trying to improve the functionality and any possible QOL issues
      that may come up. This is by no means a complete application, but should
      serve to be a huge QOL for anyone affected by the job market. To get
      started, sign in using Google's Authentication.
    </MDBBox>
  );
};

export default GeneralPage;

import React, { useContext, FunctionComponent } from "react";
import { MDBBox, MDBContainer } from "mdbreact";
import { FirebaseContext } from "./components/FirebaseProvider";
import NavigationBar from "./components/NavigationBar";
import BasicInformation from "./components/information/BasicInformation";
import ExperienceSection from "./components/experience/ExperienceSection";
import GeneralPage from "./components/GeneralPage";
import FooterPage from "./components/Footer";
import "./App.css";

const App: FunctionComponent<{}> = () => {
  const { user, loading } = useContext(FirebaseContext);

  return loading ? (
    <MDBBox className="h-100 w-100 d-flex justify-content-center align-middle">
      <div
        className="spinner-border m-auto"
        style={{ width: "15rem", height: "15rem" }}
        role="status"
      />
    </MDBBox>
  ) : (
    <div>
      <NavigationBar />
      <MDBContainer className="pb-30">
        {user ? (
          <>
            <BasicInformation />
            <ExperienceSection />
          </>
        ) : (
          <GeneralPage />
        )}
      </MDBContainer>
      <FooterPage />
    </div>
  );
};

export default App;

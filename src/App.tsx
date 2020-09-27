import React, { useContext, FunctionComponent } from "react";
import { MDBContainer } from "mdbreact";
import { FirebaseContext } from "./components/FirebaseProvider";
import NavigationBar from "./components/NavigationBar";
import BasicInformation from "./components/BasicInformation";
import ExperienceSection from "./components/ExperienceSection";
import GeneralPage from "./components/GeneralPage";
import FooterPage from "./components/Footer";
import "./App.css";

const App: FunctionComponent<{}> = () => {
  const { user } = useContext(FirebaseContext);

  return (
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

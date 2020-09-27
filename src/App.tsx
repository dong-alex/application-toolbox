import React, { useEffect, useContext, FunctionComponent } from "react";
import { MDBContainer } from "mdbreact";
import NavigationBar from "./components/NavigationBar";
import DetailsHeader from "./components/DetailsHeader";
import "./App.css";
import BasicInformation from "./components/BasicInformation";
import { FirebaseContext } from "./components/FirebaseProvider";

const App: FunctionComponent<{}> = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <div>
      <NavigationBar />
      <MDBContainer>
        {user && (
          <p>
            Current user is{" "}
            <span>
              {user.displayName} - {user.uid}
            </span>
          </p>
        )}

        <BasicInformation />
      </MDBContainer>
    </div>
  );
};

export default App;

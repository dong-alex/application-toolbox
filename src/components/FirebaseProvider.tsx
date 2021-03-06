import React, { createContext, Context, FunctionComponent } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import config from "../config";

import { useAuthState } from "react-firebase-hooks/auth";
import { MDBBtn } from "mdbreact";
import { LinkBase, LinkDetails, WorkBase, WorkDetails } from "../types";

firebase.initializeApp(config);

// export the references in case they will be used
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics: firebase.analytics.Analytics = firebase.analytics();

const FirebaseContext: Context<any> = createContext(null);

const GoogleSignIn: FunctionComponent<{}> = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <MDBBtn color="danger" onClick={signInWithGoogle}>
      Sign in with Google
    </MDBBtn>
  );
};

const GoogleSignOut: FunctionComponent<{}> = () => {
  return (
    auth.currentUser && (
      <MDBBtn color="danger" onClick={() => auth.signOut()}>
        Sign Out
      </MDBBtn>
    )
  );
};

const FirebaseProvider = ({ children }: any): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const userRef = firestore.collection("users");

  // handles adding a link to be able to copy and paste easily
  const onLinkSubmission = async (details: LinkBase) => {
    if (!user) {
      return;
    }

    const { uid }: { uid: string } = user;
    const { type, url } = details;

    await userRef.doc(uid).collection("links").doc().set({
      type,
      url,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    analytics.logEvent("link_created");
  };

  // handles adding a description to specific work experiences
  const onWorkSubmission = async (details: WorkBase) => {
    if (!user) {
      return;
    }

    const { uid }: { uid: string } = user;

    await userRef
      .doc(uid)
      .collection("experiences")
      .doc()
      .set({
        ...details,
        endDate: details.current ? null : details.endDate,
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      });
    analytics.logEvent("experience_created");
  };

  const onWorkUpdate = async (details: WorkDetails) => {
    if (!user) {
      return;
    }

    const { uid }: { uid: string } = user;
    const { id }: { id: string } = details;
    await userRef
      .doc(uid)
      .collection("experiences")
      .doc(id)
      .update({
        ...details,
        endDate: details.current ? null : details.endDate,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      });
    analytics.logEvent("experience_updated");
  };

  const onWorkDelete = async (docId: string) => {
    if (!user) {
      return;
    }
    const { uid }: { uid: string } = user;
    await userRef.doc(uid).collection("experiences").doc(docId).delete();
    analytics.logEvent("experience_deleted");
  };

  // handles updating a link submission
  const onLinkUpdate = async (updateDetails: LinkDetails) => {
    if (!user) {
      return;
    }
    const { uid }: { uid: string } = user;
    const { id, type, url } = updateDetails;

    await userRef.doc(uid).collection("links").doc(id).update({
      type,
      url,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    analytics.logEvent("link_updated");
  };

  const onLinkDelete = async (docId: string) => {
    if (!user) {
      return;
    }

    const { uid }: { uid: string } = user;

    await userRef.doc(uid).collection("links").doc(docId).delete();
    analytics.logEvent("link_deleted");
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        auth,
        loading,
        onLinkSubmission,
        onLinkDelete,
        onLinkUpdate,
        onWorkSubmission,
        onWorkUpdate,
        onWorkDelete,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export {
  auth,
  firebase,
  firestore,
  analytics,
  FirebaseContext,
  FirebaseProvider,
  GoogleSignIn,
  GoogleSignOut,
};

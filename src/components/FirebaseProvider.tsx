import React, { createContext, Context, FunctionComponent } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import config from "../config";

import { useAuthState } from "react-firebase-hooks/auth";
import { MDBBtn } from "mdbreact";
import { LinkDetails, WorkDetails } from "../types";

firebase.initializeApp(config);

// export the references in case they will be used
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

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
  const [user] = useAuthState(auth);
  const userRef = firestore.collection("users");
  // const query = userRef.doc(user ? user.uid : "");
  // const [data, loading, error] = useDocument(query);

  const fetchLinks = async () => {
    if (!user) {
      return;
    }
    const { uid }: { uid: string } = user;

    const userDocument: firebase.firestore.DocumentData = await userRef
      .doc(uid)
      .get();

    return userDocument.data();
  };

  // handles adding a link to be able to copy and paste easily
  const onLinkSubmission = async (details: LinkDetails) => {
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
  };

  // handles adding a description to specific work experiences
  const onWorkSubmission = async (details: WorkDetails) => {};

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
  };

  const onLinkDelete = async (docId: string) => {
    if (!user) {
      return;
    }

    const { uid }: { uid: string } = user;

    await userRef.doc(uid).collection("links").doc(docId).delete();
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        auth,
        fetchLinks,
        onLinkSubmission,
        onLinkDelete,
        onLinkUpdate,
        onWorkSubmission,
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
  FirebaseContext,
  FirebaseProvider,
  GoogleSignIn,
  GoogleSignOut,
};

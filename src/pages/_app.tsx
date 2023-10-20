import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import { FirebaseAppProvider } from "reactfire";
import { Firestore } from "@/firebase/Firebase";
import { firebaseConfig } from "@/firebase";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Firestore>
        <Component {...pageProps} />
      </Firestore>
    </FirebaseAppProvider>
  );
};

export default MyApp;

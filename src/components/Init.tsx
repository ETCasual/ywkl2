import { initializeFirestore } from "firebase/firestore";
import {
  useEffect,
  type FunctionComponent,
  type ReactNode,
  useState,
} from "react";
import { FirestoreProvider, useInitFirestore } from "reactfire";

export const Firestore: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);
  const { status, data: firestoreInstance } = useInitFirestore(
    // eslint-disable-next-line @typescript-eslint/require-await
    async (firebaseApp) => {
      const db = initializeFirestore(firebaseApp, {});

      return db;
    },
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div></div>;

  if (status === "loading") {
    return <div>Loading</div>;
  }

  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
};

import { useUser } from "@/stores/useUser";
import { type FunctionComponent, type ReactNode, useEffect } from "react";

export const GlobalTimer: FunctionComponent<{
  children: ReactNode[] | ReactNode;
}> = ({ children }) => {
  const { user, reloadUser } = useUser();
  useEffect(() => {
    if (!user) return;

    void reloadUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadUser]);
  return children;
};

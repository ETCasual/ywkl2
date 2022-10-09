import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";

export const Testimony: FunctionComponent = () => {
  const router = useRouter();

  return <h1>Testimony from {router.query.name}</h1>;
};

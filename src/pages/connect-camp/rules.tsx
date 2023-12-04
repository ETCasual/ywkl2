/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Rules } from "@/components/Display/connect-camp/Rules";
import { jsonData } from "@/data";
import { useEffect, useState } from "react";

const RulesPage = () => {
  const [loading, setLoading] = useState(true);
  const data = jsonData["connect-camp"];

  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);
  return loading ? (
    <div>Loading</div>
  ) : (
    <Rules bg={data?.assets?.bg} rules={data?.booklet?.rules} />
  );
};
export default RulesPage;

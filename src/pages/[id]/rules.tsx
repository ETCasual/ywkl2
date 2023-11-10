/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Rules } from "@/components/Display/connect-camp/Rules";
import { jsonData } from "@/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RulesPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const data = jsonData[router.query.id as string];

  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);
  return loading ? <div>Loading</div> : <Rules rules={data?.booklet?.rules} />;
};

export default RulesPage;

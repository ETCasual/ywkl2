/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Groups } from "@/components/Display/connect-camp/Groups";
import { jsonData } from "@/data";
import { useEffect, useState } from "react";

const GroupsPage = () => {
  const [loading, setLoading] = useState(true);
  const data = jsonData["connect-camp"];

  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);
  return loading ? (
    <div>Loading</div>
  ) : (
    <Groups
      bg={data?.assets?.bg}
      groups={data?.booklet?.groups}
      leaders={data?.booklet?.groupLeaders}
    />
  );
};

export default GroupsPage;

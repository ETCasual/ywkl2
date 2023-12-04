/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Rooms } from "@/components/Display/connect-camp/Rooms";
import { jsonData } from "@/data";
import { useEffect, useState } from "react";

const RoomsPage = () => {
  const [loading, setLoading] = useState(true);
  const data = jsonData["connect-camp"];

  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);
  return loading ? (
    <div>Loading</div>
  ) : (
    <Rooms bg={data?.assets?.bg} rooms={data?.booklet?.rooms} />
  );
};

export default RoomsPage;

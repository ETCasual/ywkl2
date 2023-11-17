/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Rooms } from "@/components/Display/connect-camp/Rooms";
import { jsonData } from "@/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RoomsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const data = jsonData[router.query.id as string];

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

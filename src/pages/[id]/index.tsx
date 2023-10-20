/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { jsonData } from "@/data";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EventPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const data = jsonData[router.query.id as string];
  const name = data?.name;
  const colors = data?.colors;

  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);

  return (
    <>
      <Head>
        <title>{name ? `${name} | YWKL Events` : "Loading..."}</title>
        <meta name="description" content="YWKL Events Center" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          backgroundColor: colors ? colors.bg : "#000",
          color: colors ? colors.primary : "#FFF",
        }}
        className="flex min-h-screen flex-col items-center justify-center transition-all"
      >
        {loading ? "Loading..." : "test"}
      </main>
    </>
  );
};

export default EventPage;

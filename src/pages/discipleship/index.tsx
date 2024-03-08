import { Table } from "@/components/Display/general/Table";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DiscipleshipIndexPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) void router.push("/");
  }, [isLoading, router, user]);

  const [isZL, setIsZL] = useState(false);

  return (
    <>
      <Head>
        <title>Discipleship | YWKL</title>
        <meta name="description" content="YWKL Discipleship Center" />
        <link rel="icon" href="/assets/YW_Logo.png" />
      </Head>
      <main
        data-theme="dracula"
        style={{
          background: `url("/assets/V24_BG_Vertical.jpg")`,
        }}
        className={`relative flex min-h-screen flex-col items-center bg-cover bg-center px-5 py-12`}
      >
        <h1 className="w-full pb-5 text-center font-made text-3xl font-bold uppercase text-[#e1f255] shadow-black text-shadow-hard">
          Discipleship
        </h1>
        <Table />
        <div className="flex w-full flex-col items-center gap-2 pt-5">
          <button className="flex w-full items-center justify-center rounded-xl bg-[#31925a] px-1 py-2 font-made text-lg text-white">
            Add NB / NF / OM
          </button>
          <button className="flex w-full items-center justify-center rounded-xl bg-[#45c178] px-1 py-2 font-made text-lg text-white">
            Discipleship
          </button>
        </div>
      </main>
    </>
  );
};

export default DiscipleshipIndexPage;

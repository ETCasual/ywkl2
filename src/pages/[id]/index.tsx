/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RegistrationForm } from "@/components/Forms/Registration";
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
  const assets = data?.assets;
  const bg = assets?.bg;

  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);

  return (
    <>
      <Head>
        <title>{name ? `${name} | YWKL Events` : "Loading..."}</title>
        <meta name="description" content="YWKL Events Center" />
        <link rel="icon" href="/assets/YW_Logo.png" />
      </Head>

      <main
        style={{
          background: `url("/${bg}")`,
        }}
        className={`relative flex min-h-screen flex-col items-center py-12${
          bg ? " bg-cover bg-center" : ""
        }`}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <button
              onClick={() => router.push("/")}
              className="absolute left-3 top-4 z-10 w-[110px] py-1.5 font-made text-[12px] font-bold shadow-xl hover:top-[18px]"
              style={{
                backgroundColor: colors?.secondary ?? "",
                clipPath:
                  "polygon(100% 0, 100px 50%, 100% 100%,20px 100%,0 50%, 20% 0)",
              }}
            >
              BACK
            </button>
            <div
              style={{
                clipPath:
                  "polygon(100% 0, 100px 50%, 100% 100%,20px 100%,0 50%, 20% 0)",
              }}
              className="absolute left-3 top-[20px] h-8 w-[110px] bg-black py-1"
            />

            <button
              onClick={() =>
                router.push(`${router.query.id as string}/leaderboard`)
              }
              className="absolute right-3 top-4 z-10 w-[130px] rotate-180 transform py-1.5 font-made text-[12px] font-bold shadow-xl hover:top-[18px]"
              style={{
                backgroundColor: colors?.secondary ?? "",
                clipPath:
                  "polygon(100% 0, 120px 50%, 100% 100%,20px 100%,0 50%, 15% 0)",
              }}
            >
              <p className="rotate-180 transform">Leaderboard</p>
            </button>
            <div
              style={{
                clipPath:
                  "polygon(100% 0, 120px 50%, 100% 100%,20px 100%,0 50%,15% 0)",
              }}
              className="absolute right-3 top-[20px] h-8 w-[130px] rotate-180 transform bg-black py-1"
            />

            <img
              src="/assets/CC_Main_Title.png"
              alt="main title"
              className="mt-8 w-[270px] object-cover md:w-[370px] lg:w-[420px]"
            />
            <div className="mt-10 w-[310px] border-x-4 border-b-[20px] border-t-4 border-solid border-black bg-white">
              <RegistrationForm
                id={router.query.id as string}
                primaryColor={colors.primary}
                secondaryColor={colors?.secondary}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default EventPage;

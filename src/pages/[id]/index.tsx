/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Groups } from "@/components/Display/connect-camp/Groups";
import { Rooms } from "@/components/Display/connect-camp/Rooms";
import { Rules } from "@/components/Display/connect-camp/Rules";
import { RegistrationForm } from "@/components/Forms/Registration";
import { jsonData } from "@/data";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const EventPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const data = jsonData[router.query.id as string];
  const name = data?.name;
  const colors = data?.colors;
  const assets = data?.assets;
  const bg = assets?.bg;
  const regEnd = data?.testRegEnd;

  const [registrationStatus, setRegistrationStatus] = useState<
    "loading" | "ended" | "progress"
  >(
    Date.now() >= regEnd
      ? "ended"
      : Date.now() <= regEnd
      ? "progress"
      : "loading",
  );

  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);

  useEffect(() => {
    if (!regEnd) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now > regEnd) setRegistrationStatus("ended");
    }, 3000);

    if (registrationStatus) return () => clearInterval(interval);
    return () => clearInterval(interval);
  }, [regEnd, registrationStatus]);

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
                router.push(
                  `${router.query.id as string}/leaderboard/${
                    localStorage.getItem("ywkl-leaderboard-key") ?? ""
                  }`,
                )
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
              className="mt-5 w-[220px] object-cover md:mt-0 md:w-[300px] lg:w-[380px]"
            />
            <div className="relative mt-3 flex max-h-[70vh] w-[310px] flex-grow flex-col overflow-y-scroll border-x-4 border-b-[20px] border-t-4 border-solid border-black bg-white md:mt-5 lg:mt-10">
              {registrationStatus === "loading" ? (
                <BounceLoader
                  color={colors.secondary}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              ) : registrationStatus === "progress" ? (
                <RegistrationForm
                  id={router.query.id as string}
                  primaryColor={colors.primary}
                  secondaryColor={colors?.secondary}
                />
              ) : (
                <>
                  <Rules rules={data?.booklet?.rules} />
                  <Rooms rooms={data?.booklet?.rooms} />
                  <Groups groups={data?.booklet?.groups} />
                </>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default EventPage;

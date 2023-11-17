/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RegistrationForm } from "@/components/Forms/Registration";
import { jsonData } from "@/data";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const EventPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [emergencyShown, setEmergencyShown] = useState(false);

  const data = jsonData[router.query.id as string];
  const name = data?.name;
  const colors = data?.colors;
  const assets = data?.assets;
  const bg = assets?.bg;
  const regEnd = data?.testRegEnd;
  const emergencyContacts = data?.emergencyContacts;

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
            <div
              className={`${
                registrationStatus !== "ended" ? "flex-grow " : ""
              }relative mt-3 flex max-h-[65vh] w-[310px] flex-col overflow-y-scroll border-x-4 border-b-[20px] border-t-4 border-solid border-black bg-white md:mt-5 lg:mt-10`}
            >
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
                <div className="flex h-full flex-col gap-2 p-2">
                  <button
                    style={{ backgroundColor: colors.primary }}
                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black py-3 font-made font-bold active:mb-[6px] active:border active:bg-opacity-80"
                  >
                    Camp Masters
                  </button>
                  <button
                    onClick={() => router.push("/connect-camp/rules")}
                    style={{ backgroundColor: colors.primary }}
                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black py-3 font-made font-bold active:mb-[6px] active:border active:bg-opacity-80"
                  >
                    Rules
                  </button>
                  <button
                    onClick={() => router.push("/connect-camp/groups")}
                    style={{ backgroundColor: colors.primary }}
                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black py-3 font-made font-bold active:mb-[6px] active:border active:bg-opacity-80"
                  >
                    Groups
                  </button>
                  <button
                    onClick={() => router.push("/connect-camp/rooms")}
                    style={{ backgroundColor: colors.primary }}
                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black py-3 font-made font-bold active:mb-[6px] active:border active:bg-opacity-80"
                  >
                    Rooms
                  </button>
                  {/* <button
                    style={{ backgroundColor: colors.secondary }}
                    onClick={() => window.open("tel:+60172412866")}
                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black py-3 font-made font-bold active:mb-[6px] active:border active:bg-opacity-80"
                  >
                    Emergency Contact
                  </button> */}
                  <div
                    style={{ backgroundColor: colors.secondary }}
                    onClick={() => setEmergencyShown((prev) => !prev)}
                    className="group flex flex-col border-2 border-b-[6px] border-black p-3 font-made text-black"
                    tabIndex={1}
                  >
                    <div className="flex cursor-pointer flex-row items-center justify-center">
                      <p>Emergency Contact</p>
                    </div>
                    <div
                      className={`flex h-auto flex-col items-center gap-1 transition-all${
                        emergencyShown
                          ? " visible mt-3 max-h-screen opacity-100 duration-500"
                          : " invisible max-h-0 opacity-0"
                      }`}
                    >
                      {emergencyContacts.map(({ name, contact }) => (
                        <button
                          key={name}
                          style={{ backgroundColor: colors.primary }}
                          onClick={() => window.open(`tel:${contact}`)}
                          className="w-full border-2 border-b-[6px] border-black py-2 active:mb-[6px] active:border active:bg-opacity-80"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default EventPage;

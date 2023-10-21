/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { jsonData } from "@/data";
import { collection } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { BounceLoader } from "react-spinners";

const LeaderboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const data = jsonData[router.query.id as string];
  const uid = router.query.uid as string;
  const name = data?.name;
  const colors = data?.colors;
  const assets = data?.assets;
  const bg = assets?.bg;

  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);

  const firestore = useFirestore();
  const ref = collection(firestore, "leaderboard");

  const { status, data: fbData } = useFirestoreCollectionData(ref);

  return (
    <>
      <Head>
        <title>{name ? `Leaderboard | YWKL Events` : "Loading..."}</title>
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
              onClick={() => router.push(`/${router.query.id as string}`)}
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

            <img
              src="/assets/CC_Main_Title.png"
              alt="main title"
              className="mt-8 w-[270px] object-cover md:w-[370px] lg:w-[420px]"
            />
            <div className="mt-10 w-[310px] border-x-4 border-b-[20px] border-t-4 border-solid border-black bg-white">
              <div className="relative flex max-h-[50vh] min-h-[50vh] flex-col gap-1 overflow-y-scroll p-2">
                {status === "success" ? (
                  fbData
                    .sort((a, b) => a.timestamp - b.timestamp)
                    .map((a, i) => (
                      <div
                        className={`flex flex-col${
                          uid === a.NO_ID_FIELD
                            ? " sticky bottom-0 top-0 font-bold"
                            : ""
                        }`}
                        style={{
                          background:
                            uid === a.NO_ID_FIELD ? colors.primary : "",
                        }}
                        key={a.NO_ID_FIELD}
                      >
                        <div className="flex w-full flex-row border-2 border-solid border-black">
                          <div
                            className="flex min-w-[50px] flex-row items-center justify-center border-black"
                            style={{ background: colors.secondary ?? "#FFF" }}
                          >
                            <p className="font-made text-sm">{i + 1}</p>
                          </div>
                          <div className="w-full border-x-2 border-black p-2 font-made leading-10">
                            {a.name}
                          </div>
                          <div className="flex w-[125px] flex-col items-center justify-center font-made">
                            {a.team}
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <BounceLoader
                    color={colors.secondary}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                )}
              </div>
            </div>
            {status === "success" && (
              <div
                style={{ background: "#000", borderColor: colors.primary }}
                className="mt-5 flex w-[310px] flex-row items-center border-4 border-b-[8px]"
              >
                <div
                  style={{
                    background: colors.primary,
                    borderColor: colors.primary,
                  }}
                  className="flex min-w-[145px] flex-col items-center border-r-4  py-3 font-made font-bold"
                >
                  Total Count
                </div>
                <div className="flex h-full w-full flex-row items-center justify-center">
                  <p
                    style={{ color: colors.secondary }}
                    className="font-made text-3xl font-bold tracking-widest"
                  >
                    {fbData.length}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default LeaderboardPage;

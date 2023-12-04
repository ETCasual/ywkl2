/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { jsonData } from "@/data";
import { doc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { FaCrown } from "react-icons/fa6";

const RankingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const data = jsonData["connect-camp"];

  const name = data?.name;
  const assets = data?.assets;
  const bg = assets?.bg;

  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);

  const firestore = useFirestore();
  const ref = doc(firestore, "ranking/ranks");

  const { status, data: rankingData } = useFirestoreDocData(ref);

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
        className={`relative flex h-screen flex-col items-center${
          bg ? " bg-cover bg-center" : ""
        }`}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="sticky top-0 z-10 flex w-full flex-col items-center border-b-4 border-black bg-white font-made">
              <div className="flex w-full flex-row-reverse items-center justify-between border-b-2 border-black bg-[#96ec00]">
                <div className="flex h-[60px] flex-row-reverse items-center justify-center">
                  <h2 className="mr-3 text-lg font-bold lg:text-xl">
                    排名 Ranking
                  </h2>
                </div>
                <div
                  className="absolute left-0 flex cursor-pointer flex-row items-center lg:left-2"
                  onClick={() => router.push("/connect-camp")}
                >
                  <div className="flex flex-col pl-2 lg:pl-3">
                    <div
                      className="z-10 flex h-[30px] w-[30px] items-center justify-center bg-[#ff6511]"
                      style={{
                        clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
                      }}
                    >
                      <FaChevronLeft />
                    </div>
                    <div
                      className="absolute top-[0.25rem] h-[30px] w-[30px] bg-black"
                      style={{
                        clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
                      }}
                    />
                  </div>
                  <p className="pl-2 font-made text-lg lg:pl-4 lg:text-xl">
                    Back
                  </p>
                </div>
              </div>
            </div>

            <div className="flex h-full w-full flex-grow flex-col items-center gap-5 overflow-y-scroll px-4 py-7">
              {status === "success" && (
                <>
                  <div className="flex w-full flex-col justify-center gap-2 border-[4px] border-b-[10px] border-black bg-white p-4">
                    <div className="flex w-full flex-row items-center border-4 border-b-[10px] border-black bg-[#96ec00]">
                      <div
                        className="flex w-[85px] flex-col items-center justify-center bg-white py-3 pl-5 pr-9"
                        style={{
                          clipPath:
                            "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                        }}
                      >
                        <FaCrown color="gold" size={30} />
                      </div>
                      <p className="w-full text-center font-made text-xl font-bold">
                        {rankingData.top1}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center border-4 border-b-[10px] border-black bg-[#96ec00]">
                      <div
                        className="flex w-[85px] flex-col items-center justify-center bg-white py-3 pl-5 pr-9"
                        style={{
                          clipPath:
                            "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                        }}
                      >
                        <FaCrown color="silver" size={30} />
                      </div>
                      <p className="w-full text-center font-made text-xl font-bold">
                        {rankingData.top2}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center border-4 border-b-[10px] border-black bg-[#96ec00]">
                      <div
                        className="flex w-[85px] flex-col items-center justify-center bg-white py-3 pl-5 pr-9"
                        style={{
                          clipPath:
                            "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                        }}
                      >
                        <FaCrown color="brown" size={30} />
                      </div>
                      <p className="w-full text-center font-made text-xl font-bold">
                        {rankingData.top3}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-1 overflow-y-scroll border-[4px] border-b-[10px] border-black bg-white p-2">
                    <div className="flex w-full flex-row items-center border-4 border-b-[10px] border-black bg-[#ff6511] p-2">
                      <p className="w-full text-center font-made text-lg font-bold">
                        {rankingData.top4}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center border-4 border-b-[10px] border-black bg-[#ff6511] p-2">
                      <p className="w-full text-center font-made text-lg font-bold">
                        {rankingData.top5}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center border-4 border-b-[10px] border-black bg-[#ff6511] p-2">
                      <p className="w-full text-center font-made text-lg font-bold">
                        {rankingData.top6}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center border-4 border-b-[10px] border-black bg-[#ff6511] p-2">
                      <p className="w-full text-center font-made text-lg font-bold">
                        {rankingData.top7}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center border-4 border-b-[10px] border-black bg-[#ff6511] p-2">
                      <p className="w-full text-center font-made text-lg font-bold">
                        {rankingData.top8}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center border-4 border-b-[10px] border-black bg-[#ff6511] p-2">
                      <p className="w-full text-center font-made text-lg font-bold">
                        {rankingData.top9}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center border-4 border-b-[10px] border-black bg-[#ff6511] p-2">
                      <p className="w-full text-center font-made text-lg font-bold">
                        {rankingData.top10}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default RankingPage;

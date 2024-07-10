/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { jsonData } from "@/data";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";

const SchedulePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState<number>(1);

  const data = jsonData["connect-camp"];

  const name = data?.name;
  const assets = data?.assets;
  const bg = assets?.bg;
  const schedule = data?.booklet?.schedule;

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
        className={`relative flex h-screen flex-col text-black items-center${
          bg ? " bg-cover bg-center" : ""
        }`}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="sticky top-0 z-10 flex w-full flex-col items-center border-b-4 border-black bg-white font-made">
              <div className="flex w-full flex-row-reverse items-center justify-between border-b-2 border-black bg-[#96ec00]">
                <div className="flex h-[60px] flex-row-reverse items-center justify-center pr-2">
                  <h2 className="mr-1 text-lg font-bold lg:mr-3 lg:text-xl">
                    时间表 Schedule
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
            <div className="flex w-full flex-row items-center justify-center gap-3 px-3 pt-4">
              <button
                onClick={() => {
                  setDay(1);
                }}
                className={`flex w-full flex-row items-center justify-center border-2 border-b-[6px] border-black${
                  day === 1 ? " bg-white" : " bg-[#ff6511]"
                } py-3 font-made font-bold text-black active:mb-[6px] active:border active:bg-opacity-80 disabled:bg-opacity-50 disabled:text-opacity-50`}
              >
                Day 1
              </button>
              <button
                onClick={() => {
                  setDay(2);
                }}
                className={`flex w-full flex-row items-center justify-center border-2 border-b-[6px] border-black${
                  day === 2 ? " bg-white" : " bg-[#ff6511]"
                } py-3 font-made font-bold text-black active:mb-[6px] active:border active:bg-opacity-80 disabled:bg-opacity-50 disabled:text-opacity-50`}
              >
                Day 2
              </button>
              <button
                onClick={() => {
                  setDay(3);
                }}
                className={`flex w-full flex-row items-center justify-center border-2 border-b-[6px] border-black${
                  day === 3 ? " bg-white" : " bg-[#ff6511]"
                } py-3 font-made font-bold text-black active:mb-[6px] active:border active:bg-opacity-80 disabled:bg-opacity-50 disabled:text-opacity-50`}
              >
                Day 3
              </button>
            </div>
            <div className="flex h-full w-full flex-col items-center gap-12 overflow-y-scroll px-3 py-12 pt-3">
              <div className="w-full border-4 border-b-[12px] border-black bg-white p-5 text-2xl">
                {schedule[day].map((list: string) => (
                  <div key={list} className="flex flex-row">
                    <p className="w-[135px] text-right font-made">
                      {list.split(" : ")[0]}
                    </p>
                    <p className="pl-4 font-made font-bold">
                      {list.split(" : ")[1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default SchedulePage;

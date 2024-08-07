/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { jsonData } from "@/data";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";

type PICType = {
  name: string;
  position: string;
  imgSrc: string;
};

const PICPage = () => {
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
                <div className="flex h-[60px] flex-row-reverse items-center justify-center">
                  <h2 className="mr-1 text-lg font-bold lg:mr-3 lg:text-xl">
                    营长 Camp Masters
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

            <div className="flex h-full w-full flex-grow flex-col items-center gap-12 overflow-y-scroll px-1 py-12">
              {(data?.pic as PICType[])?.map(
                ({ name, position, imgSrc }, i) => (
                  <div
                    key={name}
                    className={`relative flex w-[300px] flex-col items-end border-4 border-b-[10px] border-black bg-[#fff] p-3`}
                  >
                    <div
                      className={`absolute top-1/2 -translate-y-1/2${
                        i % 2 ? " -translate-x-[185px]" : " translate-x-[5px]"
                      } border-4 border-b-[10px] border-black bg-[#ff6511] p-2`}
                    >
                      <img
                        alt={name}
                        src={imgSrc}
                        className="h-[100px] w-[63px] object-contain"
                      />
                    </div>
                    <p
                      className={`w-full ${
                        i % 2 ? "text-right " : " "
                      }font-made text-2xl`}
                    >
                      {name}
                    </p>
                    <p
                      className={`w-[170px] ${
                        i % 2 ? "self-end text-right " : "self-start "
                      }font-made text-base`}
                    >
                      {position}
                    </p>
                  </div>
                ),
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};
export default PICPage;

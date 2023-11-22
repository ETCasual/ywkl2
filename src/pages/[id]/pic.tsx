/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { jsonData } from "@/data";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";

const PICPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const data = jsonData[router.query.id as string];

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
        className={`relative flex min-h-screen flex-col items-center${
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
                  <h2 className="mr-3 text-xl font-bold">营会小组 Groups</h2>
                </div>
                <div
                  className="absolute left-2 flex cursor-pointer flex-row items-center"
                  onClick={() => router.push("/connect-camp")}
                >
                  <div className="flex flex-col pl-3">
                    <div
                      className="z-10 flex h-[40px] w-[40px] items-center justify-center bg-[#ff6511]"
                      style={{
                        clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
                      }}
                    >
                      <FaChevronLeft />
                    </div>
                    <div
                      className="absolute top-[0.25rem] h-[40px] w-[40px] bg-black"
                      style={{
                        clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
                      }}
                    />
                  </div>
                  <p className="pl-4 font-made text-xl">Back</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};
export default PICPage;

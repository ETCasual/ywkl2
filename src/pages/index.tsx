/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { EventsCard } from "@/components/Cards/Event";
import Head from "next/head";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { MoreCard } from "@/components/Cards/More";
import { jsonData } from "@/data";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event>();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    });
    () =>
      window.removeEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        setInstallPrompt(e);
      });
  }, [mounted]);

  return (
    <>
      <Head>
        <title>Events | YWKL</title>
        <meta name="description" content="YWKL Events Center" />
        <link rel="icon" href="/assets/YW_Logo.png" />
      </Head>
      <main className="flex min-h-screen flex-col bg-[#191919]">
        <div className="contents flex-col gap-5">
          <div className="flex w-full flex-row items-center justify-between border-b border-white bg-[#191919] px-4">
            <h1 className="py-4 text-2xl font-extrabold tracking-tight text-[#39FF14] sm:text-[2rem] xl:px-5">
              Events
            </h1>
            <div className="flex flex-row items-center gap-4">
              {installPrompt && (
                <button
                  style={{
                    boxShadow: "#8bda02 0 0 10px 1px",
                  }}
                  className="rounded-md bg-[#8bda02] bg-opacity-100 px-5 py-2 font-sans font-bold transition hover:bg-opacity-70 hover:shadow-none"
                  onClick={async () => {
                    //@ts-ignore
                    const res = await installPrompt.prompt();

                    if (res.outcome !== "dismissed")
                      setInstallPrompt(undefined);
                  }}
                >
                  Download as App
                </button>
              )}
              <img
                src="/assets/YW_Logo.png"
                alt="YW Logo"
                className="h-[40px] w-[40px] object-cover"
              />
            </div>
          </div>
          <Swiper
            freeMode
            modules={[FreeMode, Pagination]}
            pagination={{
              renderBullet: () => "",
            }}
            slidesPerView={"auto"}
            spaceBetween={16}
            className="mx-0 px-4 pt-4 xl:px-5"
          >
            {Object.entries(jsonData).map(([key, value]) => (
              <SwiperSlide key={key}>
                <EventsCard
                  id={key}
                  startTime={Number(value.startAt)}
                  imgSrc={value.assets.poster as string}
                  title={value.name as string}
                />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <MoreCard />
            </SwiperSlide>
          </Swiper>
          <MoreCard full />
        </div>
      </main>
    </>
  );
}

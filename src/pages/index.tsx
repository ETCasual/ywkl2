/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
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
import { Drawer } from "@/components/Drawer";
import { env } from "@/env.mjs";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event>();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription>();
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();

  useEffect(() => {
    const readyNotifications = async () => {
      await navigator.serviceWorker.ready.then(async (reg) => {
        await reg.pushManager.getSubscription().then((sub) => {
          console.log("sub", sub);
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    };
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      // run only in browser
      void readyNotifications();
    }
  }, []);

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
        <Drawer
          open={drawer}
          onClose={() => setDrawer(false)}
          installPrompt={installPrompt}
          setInstallPrompt={setInstallPrompt}
          registration={registration}
          subscription={subscription}
          // setRegistration={setRegistration}
          setSubscription={setSubscription}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />
        <div className="contents flex-col gap-5">
          <div className="flex w-full flex-row items-center justify-between border-b border-white bg-[#191919] px-4">
            <h1 className="py-4 text-2xl font-extrabold tracking-tight text-[#39FF14] sm:text-[2rem] xl:px-5">
              Events
            </h1>
            <div className="flex flex-row items-center gap-4">
              {/* <button
                onClick={() => setDrawer(true)}
                style={{
                  boxShadow: "#31925a 0 0 10px 1px",
                  clipPath:
                    "polygon(100% 0%, 100% 100%, 20px 100%, 0% 50%, 20px 0%)",
                }}
                className="flex w-full flex-row gap-3 rounded-md bg-[#31925a] bg-opacity-100 py-2 pl-7 pr-4 font-sans font-bold transition hover:bg-opacity-70 hover:shadow-none"
              >
                <p className="text-[#191919]">Options</p>
                <img
                  src="/assets/YW_Logo.png"
                  alt="YW Logo"
                  className="h-[25px] w-[25px] object-cover"
                />
              </button> */}
              <img
                src="/assets/YW_Logo.png"
                alt="YW Logo"
                className="h-[40px] w-[40px] cursor-pointer object-cover"
                // onClick={() => setDrawer(true)}
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
          {env.NEXT_PUBLIC_IS_STAGING === "1" && (
            <div className="w-full px-4 pt-4">
              <Link
                href="/discipleship"
                className="flex w-full items-center justify-center rounded-xl bg-[#31925a] px-1 py-2 font-made text-lg text-white"
              >
                DISCIPLESHIP
              </Link>
            </div>
          )}
          <MoreCard full />
        </div>
      </main>
    </>
  );
}

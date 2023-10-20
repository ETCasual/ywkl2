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

export default function Home() {
  return (
    <>
      <Head>
        <title>Events | YWKL</title>
        <meta name="description" content="YWKL Events Center" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-[#191919]">
        <div className="flex flex-col gap-12">
          <div className="w-full border-b border-white bg-[#191919]">
            <h1 className="px-4 py-4 text-3xl font-extrabold tracking-tight text-[#39FF14] sm:text-[2.25rem] xl:px-5">
              Events
            </h1>
          </div>
          <Swiper
            freeMode
            modules={[FreeMode, Pagination]}
            pagination={{
              renderBullet: () => "",
            }}
            slidesPerView={"auto"}
            spaceBetween={16}
            className="mx-0 px-4 xl:px-5"
          >
            <SwiperSlide>
              <EventsCard id="connect-camp" title="Connect Camp" />
            </SwiperSlide>
            <SwiperSlide>
              <EventsCard id="2" title="Documentation →" />
            </SwiperSlide>
            <SwiperSlide>
              <MoreCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </main>
    </>
  );
}

import {
  ChangeViewDialog,
  DispicleshipDataDialog,
  SubmitDiscipleshipDialog,
  AddCGMDialog,
} from "@/components/Display/discipleship/dialog";
// import { Field } from "@/components/Display/general/Form/Field";
import { Table } from "@/components/Display/general/Table";
import { useCGM } from "@/stores/useCGM";
import { useUser } from "@/stores/useUser";
import type { DiscipleshipStatus, Rank } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
import { IoChevronBackCircleSharp } from "react-icons/io5";

export type AddCGMForm = {
  name: string;
  rank: Rank;
  discipleshipStatus: DiscipleshipStatus;
  cg: string;
};

const DiscipleshipIndexPage = () => {
  const router = useRouter();
  const { user } = useUser();

  const [mounted, setMounted] = useState(false);
  const [cgmId, setCGMId] = useState<string>("");
  const [selectedCGId, setSelectedCGId] = useState<string>("");

  const { setCGMs, reloadCG, state } = useCGM();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (!mounted) return;
      if (e.key !== "Escape") return;
      e.preventDefault();
    });

    return () => {
      document.removeEventListener("keydown", (e: KeyboardEvent) => {
        if (!mounted) return;
        if (e.key !== "Escape") return;
        e.preventDefault();
      });
    };
  }, [mounted]);

  useEffect(() => {
    if (!user) {
      void router.replace("/");
      return;
    }

    if (
      !user.superuser &&
      user.rank === "Others"
      // !user.superuser &&
      // user.rank !== "TL_Pastor" &&
      // (user.rank === "Others" || !user.as_cgm?.cgId)
    ) {
      void router.replace("/");
      return;
    }

    const reload = async () => {
      await reloadCG(
        selectedCGId
          ? [selectedCGId]
          : user?.superuser
            ? ["all"]
            : user?.rank === "TL_Pastor" && user?.leaderToCluster?.id
              ? [user?.leaderToCluster?.id]
              : user?.rank === "Coach"
                ? user?.coaching_on?.map((co) => co.id)
                : user?.rank === "CGL" && user.LeaderToCG
                  ? [user.LeaderToCG.cgId]
                  : [""],
      );

      console.log("user", user);
    };

    void reload();
  }, [user, router, setCGMs, reloadCG, selectedCGId]);

  return (
    <>
      <Head>
        <title>Discipleship | YWKL</title>
        <meta name="description" content="YWKL Discipleship Center" />
        <link rel="icon" href="/assets/YW_Logo.png" />
      </Head>
      <main
        data-theme="dracula"
        style={{
          background: `url("/assets/V24_BG_Vertical.jpg")`,
        }}
        className={`relative flex min-h-screen flex-col items-center bg-cover bg-center px-5 py-12`}
      >
        <IoChevronBackCircleSharp
          onClick={() => router.push("/")}
          className="absolute left-3 top-5 cursor-pointer text-[#45c178]"
          size={35}
        />

        <AddCGMDialog selectedCGId={selectedCGId} />
        <DispicleshipDataDialog cgmId={cgmId} />
        <SubmitDiscipleshipDialog />
        <ChangeViewDialog cgId={selectedCGId} setCGId={setSelectedCGId} />
        <h1 className="w-full pb-5 text-center font-made text-3xl font-bold uppercase text-[#e1f255] shadow-black text-shadow-hard">
          Discipleship
        </h1>
        <Table showCluster={!selectedCGId} state={state} setCGMId={setCGMId} />
        <div className="flex w-full flex-col items-center gap-2 pt-5">
          {user?.superuser && (
            <button
              onClick={() => {
                (
                  document.getElementById("change-view") as HTMLDialogElement
                ).showModal();
              }}
              className="flex w-full items-center justify-center rounded-xl bg-[#31925a] px-1 py-2 font-made text-lg text-white"
            >
              POV &gt;{" "}
              {selectedCGId === "core_leaders"
                ? "Core Leaders"
                : selectedCGId
                  ? selectedCGId
                  : "Pastor"}
            </button>
          )}
          {user?.rank !== "SGL" && (
            <button
              onClick={() => {
                (
                  document.getElementById("add-cgm") as HTMLDialogElement
                ).showModal();
              }}
              className="flex w-full items-center justify-center rounded-xl bg-[#31925a] px-1 py-2 font-made text-lg text-white"
            >
              Add Members
            </button>
          )}
          <button
            onClick={() => {
              (
                document.getElementById(
                  "submit-discipleship",
                ) as HTMLDialogElement
              ).showModal();
            }}
            className="flex w-full items-center justify-center rounded-xl bg-[#45c178] px-1 py-2 font-made text-lg text-white"
          >
            Discipleship
          </button>
        </div>
      </main>
    </>
  );
};

export default DiscipleshipIndexPage;

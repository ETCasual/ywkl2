/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { MessageCard } from "@/components/Cards/Message";
import { RegistrationForm } from "@/components/Forms/Registration";
import { PostModal } from "@/components/Modals/Post";
import { jsonData } from "@/data";
import { collection, doc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
// import { GiMedicalPack } from "react-icons/gi";
// import { IoPersonSharp } from "react-icons/io5";

const EventPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploadModalShown, setUploadModalShown] = useState(false);
  // const [emergencyShown, setEmergencyShown] = useState(false);

  const data = jsonData["connect-camp"];
  const name = data?.name;
  const colors = data?.colors;
  const assets = data?.assets;
  const bg = assets?.bg;
  const regEnd = data?.registrationEndAt;
  // const emergencyContacts = data?.emergencyContacts;

  const firestore = useFirestore();
  const countRef = doc(firestore, "posts/settings");
  const postingsRef = collection(firestore, "posts/socialMedia/postings");

  const [allDone, setAllDone] = useState(false);

  const { status, data: postsCountData } = useFirestoreDocData(countRef);
  const { status: status2, data: postingsData } =
    useFirestoreCollectionData(postingsRef);

  const [registrationStatus, setRegistrationStatus] = useState<
    "loading" | "ended" | "progress"
  >("loading");

  useEffect(() => {
    if (status === "success" && status2 === "success") {
      setAllDone(true);
    } else {
      setAllDone(false);
    }
  }, [status, status2]);

  useEffect(() => {
    if (!data) return;
    setLoading(false);
    const now = Date.now();
    setRegistrationStatus(now >= regEnd ? "ended" : "progress");
  }, [data, regEnd]);

  useEffect(() => {
    if (!regEnd) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now > regEnd) {
        setRegistrationStatus("ended");
      }
    }, 3000);

    if (registrationStatus === "ended") return () => clearInterval(interval);
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
        className={`relative flex min-h-screen flex-col items-center px-5 py-12${
          bg ? " bg-cover bg-center" : ""
        }`}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <PostModal
              closeModal={() => setUploadModalShown(false)}
              isOpen={uploadModalShown}
            />
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
            <img
              src="/assets/CC_MessageBoard_Title.png"
              alt="main title"
              className="mt-4 w-[200px] object-cover md:mt-0 md:w-[250px] lg:w-[290px]"
            />
            <div
              className={`${
                registrationStatus === "ended"
                  ? ""
                  : registrationStatus === "loading"
                  ? "flex-grow "
                  : ""
              }relative mt-3 flex max-h-[70vh] w-full max-w-[500px] flex-col overflow-y-scroll border-x-4 border-b-[20px] border-t-4 border-solid border-black bg-white md:mt-5 lg:mt-10`}
            >
              {registrationStatus === "loading" || status === "loading" ? (
                <BounceLoader
                  color={colors.secondary}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              ) : registrationStatus === "progress" ? (
                <RegistrationForm
                  id={"connect-camp"}
                  primaryColor={colors.primary}
                  secondaryColor={colors?.secondary}
                />
              ) : (
                <div className="flex h-full flex-col gap-8 px-3 pb-2 pt-7">
                  {allDone &&
                    postingsData.length === (postsCountData.count as number) &&
                    postingsData
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .map((posting) => (
                        <MessageCard
                          key={posting.NO_ID_FIELD}
                          author={posting.name}
                          image={posting.imageUrl}
                          clanName={posting.clan}
                          groupNo={posting.groupNo}
                          message={posting.message}
                        />
                      ))}
                  {/* <button
                    onClick={() => router.push("/connect-camp/rules")}
                    // style={{ backgroundColor: colors.primary }}
                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black bg-[#ff6511] py-3 font-made font-bold text-black active:mb-[6px] active:border active:bg-opacity-80 disabled:bg-opacity-50 disabled:text-opacity-50"
                  >
                    Rules
                  </button>
                  <button
                    onClick={() => router.push("/connect-camp/pic")}
                    // disabled
                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black bg-[#ff6511] py-3 font-made font-bold text-black active:mb-[6px] active:border active:bg-opacity-80 disabled:bg-opacity-50 disabled:text-opacity-50"
                  >
                    Camp Masters
                  </button>
                  <button
                    onClick={() => router.push("/connect-camp/schedule")}
                    // style={{ backgroundColor: colors.primary }}
                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black bg-[#ff6511] py-3 font-made font-bold text-black active:mb-[6px] active:border active:bg-opacity-80 disabled:bg-opacity-50 disabled:text-opacity-50"
                  >
                    Schedule
                  </button>

                  <button
                    onClick={() => router.push("/connect-camp/rooms")}
                    // style={{ backgroundColor: colors.primary }}
                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black bg-[#ff6511] py-3 font-made font-bold text-black active:mb-[6px] active:border active:bg-opacity-80 disabled:bg-opacity-50 disabled:text-opacity-50"
                  >
                    Rooms
                  </button>
                  <button
                    onClick={() => router.push("/connect-camp/groups")}
                    // style={{ backgroundColor: colors.primary }}

                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black bg-[#ff6511] py-3 font-made font-bold text-black active:mb-[6px] active:border active:bg-opacity-80 disabled:bg-opacity-50 disabled:text-opacity-50"
                  >
                    Groups
                  </button>  
                  <button
                    
                    onClick={() => router.push("/connect-camp/ranking")}
                    // style={{ backgroundColor: colors.primary }}
                    className="flex flex-row items-center justify-center border-2 border-b-[6px] border-black bg-[#ff6511] py-3 font-made font-bold text-black active:mb-[6px] active:border active:bg-opacity-80 disabled:bg-opacity-50 disabled:text-opacity-50"
                  >
                    Ranking
                  </button>
                   <button
                    // disabled
                    onClick={() => setEmergencyShown((prev) => !prev)}
                    className="group flex flex-col border-2 border-b-[6px] border-black bg-[#96ec00] p-3 font-made text-black disabled:bg-opacity-50 disabled:text-opacity-50"
                    tabIndex={1}
                  >
                    <div className="flex w-full flex-row items-center justify-center">
                      <p>Emergency Contact</p>
                    </div>
                    <div
                      className={`flex h-auto w-full flex-col items-center gap-1 transition-all${
                        emergencyShown
                          ? " visible mt-3 max-h-screen opacity-100 duration-500"
                          : " invisible max-h-0 opacity-0"
                      }`}
                    >
                      {emergencyContacts.map(
                        ({
                          name,
                          contact,
                          type,
                        }: {
                          name: string;
                          contact: string;
                          type: string;
                        }) => (
                          <div
                            key={name}
                            style={{ backgroundColor: colors.primary }}
                            onClick={() => window.open(`tel:${contact}`)}
                            className="flex w-full cursor-pointer flex-row items-center justify-center border-2 border-b-[6px] border-black active:mb-[6px] active:border active:bg-opacity-80"
                          >
                            <div className="flex h-[40px] flex-col items-center justify-center border-r-2 border-black bg-white px-2">
                              {type === "medic" ? (
                                <GiMedicalPack size={25} />
                              ) : (
                                <IoPersonSharp size={25} />
                              )}
                            </div>
                            <div className="w-full">{name}</div>
                          </div>
                        ),
                      )}
                    </div>
                  </button> */}
                </div>
              )}
            </div>
          </>
        )}
        <div className="fixed bottom-0 z-20 w-full max-w-[500px] p-1.5">
          <button
            onClick={() => setUploadModalShown(true)}
            className="flex w-full flex-row items-center justify-center border-2 border-b-[6px] border-black bg-[#ff6511] py-2 font-made font-bold text-black active:mb-[6px] active:border active:bg-opacity-80 disabled:bg-opacity-50 disabled:text-opacity-50"
          >
            Write a post
          </button>
        </div>
      </main>
    </>
  );
};

export default EventPage;

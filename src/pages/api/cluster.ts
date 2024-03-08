import { db } from "@/server/db";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const createUsers = await db.user.createMany({
        data: [
          {
            id: "jsonlow",
            name: "Json Low Sim Guang",
            rank: "TL_Pastor",
          },
          {
            id: "miiki",
            name: "Cheng Mey Kee",
            rank: "TL_Pastor",
          },
          {
            id: "douglassoh",
            name: "Soh Chee Ho",
            rank: "TL_Pastor",
          },
          {
            id: "cheriehoo",
            name: "Hoo Mei Qi",
            rank: "TL_Pastor",
          },
          {
            id: "chijoon",
            name: "Yew Chi Joon",
            rank: "TL_Pastor",
          },
          {
            id: "chengyee",
            name: "Lee Cheng Yee",
            rank: "TL_Pastor",
          },
          {
            id: "phoebeliew",
            name: "Liew Ker Shin",
            rank: "TL_Pastor",
          },
          {
            id: "tetwoei",
            name: "Khor Tet Woei",
            rank: "TL_Pastor",
          },
          {
            id: "youyou",
            name: "Chong You You",
            rank: "CGL",
          },
          {
            id: "elaineteoh",
            name: "Elaine Teoh EngYin",
            rank: "CGL",
          },
          {
            id: "minhang",
            name: "Teo Min Hang",
            rank: "CGL",
          },
          {
            id: "meekee",
            name: "Wang Mee Kee",
            rank: "CGL",
          },
          {
            id: "chungsang",
            name: "Fong Chung Sang",
            rank: "CGL",
          },
          {
            id: "shuying",
            name: "Chua Shu Ying",
            rank: "CGL",
          },
          {
            id: "yiewming",
            name: "Lau Yiew Ming",
            rank: "CGL",
          },
          {
            id: "emmeloke",
            name: "Loke Yan Yi",
            rank: "CGL",
          },
          {
            id: "waiyin",
            name: "Priscilla Chan Wai Yin",
            rank: "CGL",
          },
          {
            id: "chuhui",
            name: "Wong Chu Hui",
            rank: "CGL",
          },
          {
            id: "isabellechan",
            name: "Isabelle Chan Po Teng",
            rank: "CGL",
          },
          {
            id: "sunilkumar",
            name: "Sunil Kumar",
            rank: "CGL",
          },
          {
            id: "lihua",
            email: "lihua@gmail.com",
            name: "Saw Li Hua",
            rank: "CGL",
          },
          {
            id: "evanyap",
            email: "evanyap@gmail.com",
            name: "Evan Yap Kam Seng",
            rank: "CGL",
          },
          {
            id: "emilyhim",
            name: "Emily Him Min Li",
            email: "emily@gmail.com",
            rank: "CGL",
          },
          {
            id: "teressatang",
            name: "Teressa Tang",
            email: "teressatang@gmail.com",
            rank: "Coach",
          },
          {
            id: "wenshi",
            name: "Lie Wen Shi",
            email: "wenshi@gmail.com",
            rank: "CGL",
          },
          {
            id: "waikien",
            name: "Lie Wai Kien",
            email: "waikien@gmail.com",
            rank: "CGL",
          },
          {
            id: "szeqi",
            name: "Lim Sze Qi",
            email: "szeqi@gmail.com",
            rank: "CGL",
          },
          {
            id: "jasminetang",
            name: "Jasmine Tang Hay Yuet",
            email: "jasminetang@gmail.com",
            rank: "CGL",
          },
          {
            id: "jasonmak",
            name: "Jason Mak Kah Chun",
            email: "jasonmak@gmail.com",
            rank: "CGL",
          },
          {
            id: "qianyi",
            name: "Lew Qian Yi",
            email: "qianyi@gmail.com",
            rank: "CGL",
          },
          {
            id: "yewmun",
            name: "Thiam Yew Mun",
            email: "yewmun@gmail.com",
            rank: "CGL",
          },
          {
            id: "christiemicda",
            name: "Christie Micda",
            email: "christiemicda@gmail.com",
            rank: "CGL",
          },
          {
            id: "zhanhao",
            name: "Yit Zhan Hao",
            email: "zhanhao@gmail.com",
            rank: "CGL",
          },
          {
            id: "baoyi",
            name: "Ng Bao Yi",
            email: "baoyi@gmail.com",
            rank: "CGL",
          },
          {
            id: "zhixuan",
            name: "Phan Zhi Xuan",
            email: "zhixuan@gmail.com",
            rank: "CGL",
          },
          {
            id: "weiheng",
            name: "Wong Wei Heng",
            email: "weiheng@gmail.com",
            rank: "CGL",
          },

          {
            id: "annang",
            name: "Anna Ng Bee Keow",
            email: "annang@gmail.com",
            rank: "CGL",
          },
          {
            id: "lizhang",
            name: "Tan Li Zhang",
            email: "lizhang@gmail.com",
            rank: "CGL",
          },
          {
            id: "huiying",
            name: "Chong Hui Ying",
            email: "huiying@gmail.com",
            rank: "CGL",
          },
          {
            id: "jesseliew",
            name: "Jesse Liew",
            email: "jesseliew@gmail.com",
            rank: "CGL",
          },
          {
            id: "zhimei",
            name: "Cheng Zhi Mei",
            email: "zhimei@gmail.com",
            rank: "CGL",
          },
          {
            id: "priscillalua",
            name: "Priscilla Lua Sim Yee",
            email: "priscillalua@gmail.com",
            rank: "CGL",
          },
          {
            id: "kayan",
            name: "Chai Ka Yan",
            email: "kayan@gmail.com",
            rank: "Coach",
          },
          {
            id: "peitong",
            name: "Liew Pei Tong",
            email: "peitong@gmail.com",
            rank: "CGL",
          },
          {
            id: "munhoe",
            name: "Lee Mun Hoe",
            email: "munhoe@gmail.com",
            rank: "CGL",
          },
        ],
      });

      return res.status(200).json(createUsers);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        return res.status(500).json(err);
      }
    }
  }
};

export default handler;

export const config = {
  api: {
    externalResolver: true,
  },
};

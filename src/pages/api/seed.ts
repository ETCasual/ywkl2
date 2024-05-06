import { db } from "@/server/db";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const seed = await db.cGMs.createMany({
        data: [
          {
            cgId: "86J",
            name: "Chin Qian Qi",
            rank: "Others",
          },
          {
            cgId: "86J",
            name: "Sum Pei Yee",
            rank: "Others",
          },
          {
            cgId: "86J",
            name: "Ngaim Xiang Bin",
            rank: "Others",
          },
          {
            cgId: "86J",
            name: "Tiffany Bong Xin Tong",
            rank: "Others",
          },
          {
            cgId: "86J",
            name: "Chen Jun Hoong",
            rank: "Others",
          },
          {
            cgId: "86J",
            name: "Saw Kian Meng",
            rank: "Others",
          },
          {
            cgId: "86J",
            name: "Lee Chon Wei",
            rank: "SGL",
          },
          {
            cgId: "86J",
            name: "Bernice Ui Jia Qing",
            rank: "Others",
          },
          {
            cgId: "86J",
            name: "金平",
            rank: "Others",
          },
        ],
      });

      return res.status(200).json(seed);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        return res.status(500).json(err);
      }
    }
  }
};
export default handler;

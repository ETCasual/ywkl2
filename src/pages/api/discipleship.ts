/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const id = req.query.cgmId as string;

    try {
      const find = await db.discipleship.findMany({
        where: {
          cGMsId: id,
        },
        orderBy: {
          created_at: { sort: "desc" },
        },
      });

      return res.status(200).json(find);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        return res.status(500).json(err);
      }
    }
  }
  // Login
};

export default handler;

export const config = {
  api: {
    externalResolver: true,
  },
};

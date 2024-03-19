import { db } from "@/server/db";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      return res.status(200).json("Unimplemented");
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        return res.status(500).json(err);
      }
    }
  }

  if (req.method === "GET") {
    try {
      const cgs = await db.cg.findMany({
        select: {
          id: true,
          LeaderToCG: {
            select: {
              leader: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return res.status(200).json(cgs);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        return res.status(500).json(err);
      }
    }
  }

  return res.status(404).json("Unimplemented");
};

export default handler;

export const config = {
  api: {
    externalResolver: true,
  },
};

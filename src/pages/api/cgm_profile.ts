/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { type NextApiHandler } from "next";
import { type AddCGMForm } from "../discipleship";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const cg = req.query.cgId as string;
    try {
      const findleaderForCG = await db.leaderToCG.findFirst({
        where: {
          cgId: cg,
        },
        select: {
          userId: true,
        },
      });

      const findNameToLeader = await db.user.findFirst({
        where: {
          id: String(findleaderForCG?.userId),
        },
      });

      const findbyCg = await db.cGMs.findMany({
        where: {
          cgId: cg,
        },
      });
      const leaderName = { name: findNameToLeader?.name };
      return res.status(200).json([leaderName, ...findbyCg]);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        return res.status(500).json(err);
      }
    }
  }
  // Login
  if (req.method === "POST") {
    const { discipleshipStatus, name, rank, cg } = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      req.body,
    ) as AddCGMForm;

    try {
      const addCGM = await db.cGMs.create({
        data: {
          status: discipleshipStatus,
          cgId: cg,
          name: name,
          rank: rank,
        },
      });

      return res.status(200).json(addCGM);
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

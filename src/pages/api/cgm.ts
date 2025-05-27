/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { type NextApiHandler } from "next";
import { type AddCGMForm } from "../discipleship";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const cg = (req.query.cgId as string).split(",");
    // const coach = req.query.coach as string;

    try {
      // if (coach === 'true') {

      // }

      // else

      if (
        cg.includes("Youth") ||
        cg.includes("Teens") ||
        cg.includes("Working Adult")
      ) {
        const cgFromTeam = await db.cluster.findFirst({
          where: { id: cg[0] },
          select: {
            cgs: true,
          },
        });

        console.log("cgFromTeam", cgFromTeam);
        const cgs = cgFromTeam?.cgs.map((c) => c.id);

        const findFromTeam = await db.cGMs.findMany({
          where: {
            cgId: {
              in: cgs,
            },
          },
          include: {
            Cg: true,
          },
        });

        return res.status(200).json(findFromTeam);
      } else if (cg.includes("all")) {
        const findAll = await db.cGMs.findMany({
          include: {
            Cg: true,
          },
        });

        return res.status(200).json(findAll);
      } else {
        const findbyCg = await db.cGMs.findMany({
          where: {
            cgId: {
              in: cg,
            },
          },
        });

        return res.status(200).json(findbyCg);
      }
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

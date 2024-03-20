/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type SubmitDiscipleshipForm } from "@/components/Display/discipleship/dialog";
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
        select: {
          meet_by: {
            select: {
              name: true,
              display_name: true,
            },
          },
          created_at: true,
          note: true,
          assigned_status: true,
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

  if (req.method === "POST") {
    const { by, cgmId, note, status } = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      req.body,
    ) as SubmitDiscipleshipForm;

    try {
      const createDiscipleship = await db.discipleship.create({
        data: {
          note: note,
          person_to_meet: {
            connect: {
              id: cgmId,
            },
          },
          assigned_status: status,
          meet_by: {
            connect: {
              id: by,
            },
          },
        },
      });

      await db.cGMs.update({
        data: {
          status: status,
        },
        where: {
          id: cgmId,
        },
      });

      return res.status(200).json(createDiscipleship);
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

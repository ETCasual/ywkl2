/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { type NextApiHandler } from "next";
import { type FormikProfileForm } from "@/components/Display/general/dialog/Profile";
import { type Rank } from "@prisma/client";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const id = req.query.id as string;

    try {
      const user = await db.user.findUnique({
        where: {
          id: id,
        },
        select: {
          as_cgm: {
            select: {
              cgId: true,
            },
          },
          cgToUserViewId: true,
          created_at: true,
          updated_at: true,
          display_name: true,
          name: true,
          email: true,
          id: true,
          rank: true,
          superuser: true,
          coaching_on: true,
          LeaderToCG: true,
          leaderToCluster: true,
        },
      });

      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        return res.status(500).json(err);
      }
    }
  }
  // Profile Register
  if (req.method === "POST") {
    const { displayName, id, name, rank, cgmid, email } = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      req.body,
    ) as FormikProfileForm;

    try {
      const connector =
        cgmid !== "nothing"
          ? {
              as_cgm: {
                connect: {
                  id: cgmid,
                },
              },
            }
          : null;

      const user = await db.user.update({
        where: {
          id: id,
        },
        data: {
          // Cg: {
          //   connect: {
          //     id: cg,
          //   },
          // },
          email: email,
          ...connector,
          display_name: displayName,
          name: name,
          rank: rank as Rank,
        },
      });

      return res.status(200).json(user);
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

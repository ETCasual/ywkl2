/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { type NextApiHandler } from "next";
import { type FormikProfileForm } from "..";

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
    const { cg, displayName, id, name, rank } = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      req.body,
    ) as FormikProfileForm;

    try {
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
          as_cgm: {
            create: {
              name: name,
              rank: rank,
              Cg: {
                connect: {
                  id: cg,
                },
              },
            },
          },
          display_name: displayName,
          name: name,
          rank: rank,
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

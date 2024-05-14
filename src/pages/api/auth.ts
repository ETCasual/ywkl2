/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { type NextApiHandler } from "next";
import * as bc from "bcrypt";
import { type FormikLoginForm } from "../login";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const id = req.query.id as string;

    try {
      const query = await db.user.findUnique({
        select: {
          id: true,
        },
        where: {
          id: id,
        },
      });

      if (query?.id) {
        return res.status(200).json(true);
      } else {
        return res.status(404).json(false);
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { email, password } = JSON.parse(req.body) as FormikLoginForm;

    try {
      const user = await db.user.findFirst({
        where: {
          email: email.toLowerCase(),
        },
        select: { password: true, id: true },
      });

      const match = user ? await bc.compare(password, user.password!) : false;

      if (match) {
        const result = await db.user.findFirst({
          where: {
            id: user?.id,
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
          },
        });
        return res.status(200).json(result);
      } else if (!user) {
        return res.status(404).json("No User Found.");
      } else return res.status(403).json("Forbidden. Invalid Credentials.");
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

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { type NextApiHandler } from "next";
import { type FormikProfileForm } from "@/components/Display/general/dialog/Profile";
import { type Rank } from "@prisma/client";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const user = await db.user.findMany({
        select: {
          email: true,
          name: true,
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

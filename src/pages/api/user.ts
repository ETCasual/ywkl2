/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { type NextApiHandler } from "next";
import { type FormikProfileForm } from "..";

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

  if (req.method === "POST") {
    const { cg, name, email, id } = req.body as FormikProfileForm;
    const { rank } = req.body as FormikProfileForm;

    try {
      const create = await db.user.create({
        select: {
          name: true,
        },
        data: {
          email: email,
          rank: rank,
          id: id,
          name: name,
          Cg: {
            connect: {
              id: cg,
            },
          },
        },
      });

      return res.status(200).json(create);
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

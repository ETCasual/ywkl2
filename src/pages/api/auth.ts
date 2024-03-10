/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { type NextApiHandler } from "next";
import * as bc from "bcrypt";
import { FormikLoginForm } from "../login";

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
    const { email, password } = req.body as FormikLoginForm;

    try {
      const user = await db.user.findFirstOrThrow({
        where: {
          email: email,
        },
      });

      const match = await bc.compare(password, user.password!);

      if (match) {
        return res.status(200).json(user);
      } else if (!user.id) {
        return res.status(404).end("No User Found.");
      } else return res.status(403).end("Forbidden. Invalid Credentials.");
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

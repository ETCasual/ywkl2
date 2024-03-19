/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db";
import { type NextApiHandler } from "next";
import * as bc from "bcrypt";
import { type FormikRegisterForm } from "../register";

const handler: NextApiHandler = async (req, res) => {
  // Register
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { email, password } = JSON.parse(req.body) as FormikRegisterForm;

    const encryptedPass = await bc.hash(
      password,
      Number(process.env.SALT_ROUNDS),
    );

    try {
      const user = await db.user.findFirst({
        where: {
          email: {
            equals: String(email),
          },
        },
      });
      if (!user) {
        const create = await db.user.create({
          data: { email: email, password: encryptedPass },
        });

        return res.status(200).json(create);
      }
      if (!user?.password) {
        const assignPasswordUser = await db.user.update({
          where: {
            id: user?.id,
          },
          data: {
            password: encryptedPass,
          },
          select: {
            cgId: true,
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
        return res.status(200).json(assignPasswordUser);
      }
      if (user?.password) return res.status(302).json("User Exists.");

      return res.status(500).json("An Unexpected Error Occurred.");
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

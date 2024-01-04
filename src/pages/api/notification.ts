/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY!,
  process.env.WEB_PUSH_PRIVATE_KEY!,
);

const Notification = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { subscription, data } = req.body;

    webPush
      .sendNotification(subscription, JSON.stringify(data))
      .then((response) => {
        return res
          .writeHead(response.statusCode, response.headers)
          .status(response.statusCode)
          .end(response.body);
      })
      .catch((err) => {
        if ("statusCode" in err) {
          return res
            .writeHead(err.statusCode, err.headers)
            .status(err.statusCode)
            .end(err.body);
        } else {
          console.error(err);
          res.statusCode = 500;
          return res.end();
        }
      });
  } else {
    res.statusCode = 405;
    return res.end();
  }
};

export default Notification;

export const config = {
  api: {
    externalResolver: true,
  },
};

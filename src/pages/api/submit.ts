/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

const SubmitRegistration = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === "POST") {
    const {
      full_name: engName,
      chi_name: chiName,
      contact_number: phoneNo,
      gender,
      nric_passport: icNo,
      dob,
      pastoral_team: team,
      small_team: st,
      cg,
      pastoral_status: status,
      tshirt_size,
    } = req.body;

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          client_id: process.env.CLIENT_ID,
          private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      });
      const sheets = google.sheets({
        auth,
        version: "v4",
      });

      const now = Date.now();

      const convertDob = new Date(dob as string).toLocaleString("en-US", {
        dateStyle: "full",
        timeZone: "Asia/Kuala_Lumpur",
      });

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "A:L",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              `=EPOCHTODATE(${now},2)`,
              engName,
              chiName,
              phoneNo,
              gender,
              icNo,
              convertDob,
              team,
              st,
              cg,
              status,
              tshirt_size,
            ],
          ],
        },
      });

      res.status(200).json({ msg: "Posted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }
};

export default SubmitRegistration;

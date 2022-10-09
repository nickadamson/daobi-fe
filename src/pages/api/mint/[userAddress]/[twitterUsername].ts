import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; reason: string }>
) {
  const {
    query: { userAddress, twitterUsername },
    method,
  } = req;

  switch (method) {
    case "PUT":
      try {
        // TODO use private key to mint()
      } catch (error) {
        return res.status(500).json({
          success: false,
          reason: `Internal Server Error while trying to mint.\n${JSON.stringify(
            error
          )}`,
        });
      }
      return res
        .status(200)
        .json({ success: true, reason: "Successfully Verified" });
    default:
      return res.status(400).json({
        success: false,
        reason: "This API Route only accepts 'PUT' requests.",
      });
  }
}

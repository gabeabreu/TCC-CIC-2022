import { NextApiRequest, NextApiResponse } from "next";

export default async function createUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const { address } = req.query;
  const user = await fetch("http://localhost:8001/users", {
    method: "POST",
    body: JSON.stringify({address: address, isVerified: false}),
    headers: {
      'Accept': 'application/json, text/plain, /',
      'Content-Type': 'application/json'
    },
    }).then(res => res.json())
    return res.json(user)
}
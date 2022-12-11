import { NextApiRequest, NextApiResponse } from "next";

export default async function createUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const { address, name, bio, instagram, twitter, website, discord, profilePictureUrl, bannerPictureUrl  } = req.query;
  const user = await fetch("http://localhost:8001/users", {
    method: "PUT",
    body: JSON.stringify({address: address, name: name, bio: bio, instagram: instagram, twitter: twitter, website: website, discord: discord, profilePictureUrl, bannerPictureUrl, isVerified: false}),
    headers: {
      'Accept': 'application/json, text/plain, /',
      'Content-Type': 'application/json'
    },
    }).then(res => res.json())
    return res.json(user)
}

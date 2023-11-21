import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { createToken } from "../helpers/jwt.js";

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401);

    const user = await Users.findAll({
      where: {
        refresh_Token: refreshToken
      }
    })

    if (!user[0]) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403);

      const { accessToken } = createToken({ id: user[0].id, name: user[0].name, email: user[0].email });

      res.json(accessToken);
    })

  } catch (err) {
    console.error(err);
  }
};
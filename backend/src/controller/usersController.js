import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createToken, createRefreshToken } from "../helpers/jwt.js"

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'name', 'email']
    })
    res.json(users)
  } catch (e) {
    console.log(e);
  }
}

export const Register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(404).json({
        msg: 'Password dan confirm password tidak cocok'
      })
    }

    const hashPass = await bcrypt.hash(password, 10);

    await Users.create({
      name: name,
      email: email,
      password: hashPass
    })

    res.status(200).json({
      msg: 'Register Berhasil'
    });
  } catch (e) {
    console.log(e);
  }
}

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findAll({
      where: { email: email },
    })

    const isValid = await bcrypt.compare(password, user[0].password)

    if (!isValid) {
      res.status(404).json({
        msg: 'Password Salah'
      })
    }

    const { accessToken } = await createToken({ id: user[0].id, name: user[0].name, email: user[0].email })
    const { refreshToken } = await createRefreshToken({ id: user[0].id, name: user[0].name, email: user[0].email })

    await Users.update({ refresh_Token: refreshToken }, {
      where: {
        id: user[0].id
      }
    });

    res.cookie('refreshToken', refreshToken, {
      httOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ accessToken })

  } catch (e) {
    res.status(400).json({ msg: 'email tidak ditemukan' })
  }
}

export const Logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(204);

  const user = await Users.findAll({
    where: {
      refresh_Token: refreshToken
    }
  })

  if (!user[0]) return res.sendStatus(204);
  await Users.update({ refresh_Token: null }, {
    where: {
      id: user[0].id
    }
  })
  res.clearCookie('refreshToken');
  return res.sendStatus(200)
}
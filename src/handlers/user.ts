import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import prisma from "../modules/db";

export const createNewUser = async (req, res, next) => {
  try{
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password)
      }
    });

    const token = createJWT(user);
    res.json({token});
  } catch(err){
    err.type = 'input';
    next(err)
  } 
}

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })

  if(!user){
    res.status(403)
    res.json({message: 'User not found'})
    return
  }

  const isValid = await comparePasswords(req.body.password, user.password);
  
  if(!isValid){
    res.status(403)
    res.json({message: 'Incorrect password'})
    return
  }

  const token = await createJWT(user);
  res.json({token});
}
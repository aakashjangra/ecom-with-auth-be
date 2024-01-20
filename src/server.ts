import express from 'express';
import router from './router';
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express()

app.use(cors()) //it allows everyone (every IP address) to make requests. You can authenticate and make checks later
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//custom middleware
// app.use((req, res, next) => {
//   req.shhh_secret = 'doggy'
//   next()
// })
//you can add as many middlewares as you want
//you can set middleware for specific routes too like - 
// app.get('/', [middleware1, middleware2], handler)
// app.get('/', [(req, res, next) => {
//   console.log('middleware1')
//   next()
// }, (req, res, next) => {
//   console.log('middleware2')
//   next()
// }], (req, res) => {
//   console.log('hello from express')
//   res.status(200)
//   res.json({message: 'helloWorld :)'})
// })

app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({message: 'helloWorld :)'})
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
  if(err.type === 'auth'){
    res.status(401).json({ message: 'unauthorized' });
  } else if(err.type === 'input'){
    res.status(400).json({ message: 'invalid input' });
  } else {
    res.status(500).json({ message: "that's on us" });
  }
})

export default app;
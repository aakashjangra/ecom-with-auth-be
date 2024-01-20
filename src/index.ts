import config from './config';
import app from './server';
import * as dotenv from 'dotenv'
dotenv.config();

app.listen(config.port, () => {
  console.log(`Server is running on localhost:${config.port}`)
})
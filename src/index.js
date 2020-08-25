import 'log-timestamp';
import './dd'

import Koa from 'koa'
import KoaRouter from 'koa-router'
import fetch from 'node-fetch'

const PORT = 8080

const app = new Koa()
const router = new KoaRouter()

router.get('calc', '/calc', (ctx) => {
  console.log('calc hit');
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let i;
  for(let z =0;  z < getRandomInt(9999999); z++){
    i = Math.sqrt(getRandomInt(9999999)).toString()
  }
  ctx.body = `Result: ${i}`
})

router.get('fetch remote', '/fetchremote', async (ctx) => {
  console.log('fetchremote hit');
  const testUrl = 'https://github.com/'
  let response
  for (let i = 0; i < 10; i++) {
    response = await fetch(testUrl);
  }
  const json = await response.text();
  ctx.body = json
})

router.get('healthcheck', '/healthz', (ctx) => {
  ctx.body = 'UP';
});

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT);
console.log(`local server started: http://localhost:${PORT}/`)

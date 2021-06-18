const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
require('dotenv').config();

const app = new Koa();
require('./src/bootstrap');
app.use(koaBody({
    multipart: true
}))
const port = process.env.PORT || 5000;
require('./src/router')(app, Router);


console.log(port);

app.listen(port, () => { console.log(`listen to port ` + port) });

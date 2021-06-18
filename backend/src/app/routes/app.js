module.exports = function(app,Router){
    const router = new Router({prefix:'/'});
    app.use(router.routes()).use(router.allowedMethods());
}
const controller = require('../controller/UserController');

module.exports = function(app,Router){
    const router = new Router({prefix:'/user'})
    router.get('/list',controller.getUserList);
    router.post('/register',controller.createUser);
    router.post('/login',controller.loginUser);
    router.post('/changepassword',controller.passwordChange);
    router.post('/deleteuser',controller.deleteUser);
    router.post('/changename',controller.nameChange);
    router.post('/listdelete',controller.userListDelete);
    app.use(router.routes()).use(router.allowedMethods());
}
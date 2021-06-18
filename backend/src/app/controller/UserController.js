const User = require('../model/User');
// const koaBody = require('koa-body');
const app = require('../routes/app');
const bcrypt = require('bcryptjs');
const { findOneAndRemove } = require('../model/User');



module.exports = {
    async getUserList(ctx){
        try{
            var userList = await User.find();
            ctx.body= {userList}
        }
        catch(e){
            ctx.throw(e);

        }

    },
    async createUser(ctx){
        

        try{
            var {body} = ctx.request;

            if(!body.name||!body.email)
            {
                
                ctx.status = 404;
            }
            const userExists = await User.findOne({email: body.email});
            if(userExists) return ctx.status=409;
            else{
            

                    var user = new User();
                    user.name = body.name;
                    user.email = body.email;
                    user.password = body.password;
                    user.save();
                    ctx.status = 201;
                    ctx.body = {message:"Thank you for registering "+ body.name}
            }
        }
        catch(e){
            ctx.throw(e);
        }
    },

    async loginUser(ctx){
        var {body} = ctx.request;
        if(!body.email||!body.password)
            {
               
                ctx.status = 401;
            }

        const userLogin = await User.findOne({email:body.email});
        
        
        
        if(userLogin === null){

            return ctx.status  = 404 
            
           
        }
        const passMatch = await bcrypt.compare(body.password, userLogin.password);
        if(userLogin && passMatch)
        {
            ctx.body={message:"Login Successful",_id:userLogin._id,name:userLogin.name,email:userLogin.email}
        }
        else{
            ctx.status = 401
        }
    },
    async passwordChange(ctx){
        var {body} = ctx.request;

        const user = await User.findById({_id:body._id});
        
        const passMatch = await bcrypt.compare(body.oldPassword, user.password);

        if(passMatch)
        {
            const passEqual = await bcrypt.compare(body.password,user.password);
            if(passEqual)
            {
                return ctx.status=409
                
            }else{
                user.password = body.password;
                user.save();
                ctx.body={message:"Password Successfully Changed"};
                
            }
        }
        else{
            
                
                ctx.status = 401;
            
        }
    },
    async deleteUser(ctx){
        var {body} = ctx.request;
        

        const user = await User.findById({_id:body._id});

        const passMatch = await bcrypt.compare(body.oldPassword, user.password)
        
        if(passMatch){
            await User.findOneAndDelete({_id:body._id});
            ctx.body={message:"Account deleted successfully"}
            ctx.status = 200
        }
        else{
            ctx.status = 401;
        }

    },
    async nameChange(ctx){
        var {body} = ctx.request;


        const user = await User.findById({_id:body._id});

        if(user)
        {
            user.name = body.Name
            user.save();
            ctx.status = 201
        }
        else{
            ctx.status = 404
        }
    },
    async userListDelete(ctx){
        var {body} = ctx.request;

        const user = await User.findById({_id:body._id}) ;
        if(user)
        {
            await User.findOneAndRemove({_id:user._id})
            
            
            ctx.body={message:"Deleted Successfully"}

        }else{
            ctx.status = 404
        }
    }
   
}
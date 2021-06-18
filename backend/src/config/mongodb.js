const mongoose = require('mongoose');


const url = process.env.MONGODB_URL;
mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('mongo connection successful')
}).catch((error)=>{
    console.log(error)
});


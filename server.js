var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const db = require('./config/db');
const JWT = require('jsonwebtoken')
const User = require("./Model/User")
const Exercise = require("./Model/Exercise")

db();
const secret = "lqmxBi8W65uubKPk9o8fC3azvzhCg6Jl";

var app = express();
app.use(express.json());
app.use(cors({origin:"*"}))
app.use(cookieParser());




app.use("/home",(req,res,next)=>{
  const token = req.headers.authorization
  req.cookies
  if(token==null){
      res.status(401).send("Not Logged In")
  }
  else{
      JWT.verify(token,secret,(err,data)=>{
          if(err){
              res.status(401).send("Not Logged In")
          }
          else{
              req.data = data
              next()
          }
      })

  }

})



app.post("/register",async (req,res)=>{
  const {name, email, password} = req.body

  try{

  const result = await  User.create({name,email,password})
  
  res.status(200).send({
      message:"Register Successful",
      User:result
  })
  
}
catch(err){
  res.send("User Not Created" )

}
})


app.post("/login",async (req,res)=>{
  
  const {email,password} = req.body
  console.log(req.body)

  const result  = await User.findOne({email:email,password:password})


  if(result==null){
      res.status(401).json("Invalid Credentials")
  }
  else{
    const Token = JWT.sign({id:result["_id"]},secret)
    res.cookie("token",Token,{
      httpOnly:true,
    })
    res.status(200).json("Logged In");
      
  }
})






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

const port = process.env.PORT || 5000;

app.listen(5000)
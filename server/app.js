var createError = require('http-errors');
var express = require('express');
// const session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const NewsRouter = require('./routes/admin/NewsRouter');
const ProductsRouter = require('./routes/admin/ProductsRouter');
const webNewsRouter = require('./routes/web/NewsRouter')
const webProductRouter = require('./routes/web/ProductRouter')
const JWT = require('./util/JWT');
var app = express();
// app.use(session({
//   resave:true,
//   saveUninitialized: true, 
//   secret: 's3Cur3',
//   name: 'sessionId'
// }))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(webNewsRouter)
app.use(webProductRouter)

/* 
  /adminapi/  后台系统用的
  /webapi/      企业官网用的  
*/

//接受前端发来的token，放在整个初始化路由之前去做
app.use((req,res,next)=>{
  //登录，token为空需要直接放行
  //判断是否是login接口，如果是，直接调用next()函数，跳过后续中间件和路由处理
  if(req.url==="/adminapi/user/login"){
    next()
    return
  }
  const token = req.headers["authorization"].split(" ")[1]
  //如果token为真，可以进行JWT的校验
  if(token){ 
    var payload = JWT.verify(token)
    if(payload){
      //没过期前需要再重新生成token，和之前一样的token
      const newToken = JWT.generate({
        id:payload.id,
        username:payload.username
      },"1d")
      res.header("Authorization",newToken)
      next()
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    } 
  }
})

app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductsRouter)

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
  res.render('error');
});

module.exports = app;

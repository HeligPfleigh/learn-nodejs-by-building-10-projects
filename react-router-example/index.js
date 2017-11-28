var express = require('express');
var app = express();
var fs = require('fs');

var jsonParser = require('body-parser').json();
var session = require('express-session');

var multer = require('multer');
const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb){
    let storeDir = './files/' + req.body.username;
    if(!fs.existsSync(storeDir))
      fs.mkdirSync(storeDir);
    cb(null, `${req.body.username}//${file.originalname}`);
  }
});
const upload = multer({ storage });

var User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'asjd123jjlhiuoeu',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 } //save cookie 60 minutes
}));

app.listen(3000, () => console.log('Server started'));
app.get('/', (req, res) => {
  res.render('home');
})

//Database và hàm kiểm tra đăng nhập
var db = [];

app.post('/signIn', jsonParser, async function(req, res){
  var { username, password } = req.body;
  const result = await User.checkAuthentication(username, password);
  if(!result){
    return res.send('DANG_NHAP_THAT_BAI');
  }
  else{
    req.session.username = username;
    return res.send('DANG_NHAP_THANH_CONG');
  }
})

app.get('/getInfo', (req, res) => {
  if (req.session.username) {
    return res.send(req.session.username);
  }
  res.send('CHUA_DANG_NHAP');
});

app.get('/logout', (req, res) => {
  req.session.username = undefined;
  res.send('DA_DANG_XUAT');
})

// tttodo xử lý khi nhận post signUp
app.post('/signUp', upload.single('file'), jsonParser, (req, res) => {
  var { username, email, password } = req.body;

  const file = req.file;

  //kiểm tra đã có email đăng ký chưa
  var checkError = db.some(user => {
    return (user.email === email || user.username === username);
  });

  if(checkError){
    return res.send('TRUNG_USER');
  }

  db.push({ username, password, email });

  let newUser = new User({
    username: username,
    email: email,
    password: password
  });

  User.createUser(newUser, function(err, user){
    if(err) throw err;
  });

  res.send('DANG_KY_THANH_CONG');
});

//lấy thông tin toàn bộ user
app.get('/getListAccount', (req, res)=>{
  User.getAllUser(function(err, data){
    if(err) throw err;
    db = [...data];
    console.log(db);
    res.send(data);
  });
});

//xóa user
app.post('/deleteUser', jsonParser, (req, res)=>{
  var {username, email} = req.body;
  db = db.filter(user =>{
    return (user.username != username || user.email != email);
  });

  User.deleteUser(username, function(err, user){
    if(err) throw err;
  });

  res.send('XOA_THANH_CONG');
});

//sửa user
app.post('/editUser', jsonParser, (req, res)=>{
  var {username, email, password} = req.body;
  var hasUser = false;
  db.forEach(function(user){
    if(user.username === username)
    {
      user.email = email;
      user.password = password;
      User.editUser(username, email, password, function(err, data){
        if(err) throw err;
      });
      hasUser = true;
    }
  });
  if(hasUser) return res.send('SUA_THANH_CONG');
  res.send('KHONG_TON_TAI_USER');
});
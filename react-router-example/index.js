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
var db = [{ username: 'admin', password: '1234', email: 'admin@gmail.com'},
          { username: 'test', password: '1', email: 'a@a'}];
function checkAuthentication(username, password){
  return(db.filter(item=>{
    return (item.username === username && item.password === password);
  }).length != 0)
}

app.post('/signIn', jsonParser, (req, res) => {
  var { username, password } = req.body;
  if (checkAuthentication(username, password)) {
    req.session.username = username;
    return res.send('DANG_NHAP_THANH_CONG');
  }

  return res.send('DANG_NHAP_THAT_BAI');
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
  console.log(file);

  //kiểm tra đã có email đăng ký chưa
  var checkError = db.filter(user => {
    return (user.email === email || user.username === username);
  }).length;

  if(checkError != 0){
    return res.send('TRUNG_USER');
  }

  db.push({ username, password, email });
  res.send('DANG_KY_THANH_CONG');
});

//lấy thông tin toàn bộ user
app.get('/getListAccount', (req, res)=>{
  res.send(db);
});

//xóa user
app.post('/deleteUser', jsonParser, (req, res)=>{
  var {username, email} = req.body;
  db = db.filter(user =>{
    return (user.username != username || user.email != email);
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
      hasUser = true;
    }
  });
  if(hasUser) return res.send('SUA_THANH_CONG');
  res.send('KHONG_TON_TAI_USER');
});

app.post('/uploadFile', upload.single('file'), (req, res)=>{
  const file = req.file;
  const username = req.body.username;
  console.log(username);
  //console.log(file);
  //xử lý file upload
})
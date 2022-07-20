const express = require('express');
const router = express.Router();
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/user')
const request = require('request')
const session = require('express-session');

require('dotenv').config()

router.use(session({ secret: 'MySecret', resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());


router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

passport.serializeUser((data, done) => {
  // console.log('시리얼라이즈 유저', data); // user는 tokenUser다.
  // 로그인 시, 사용자 데이터를 세션에 저장하는데
  done(null, { id: data.user.id, accessToken: data.accessToken });

});

passport.deserializeUser((user, done) => {
  // user = {id : data.user.id, accessToken : data.accessToken}
  // console.log('디시리얼라이즈 유저', user);
  User.findOne({ id: user.id })
    .then((result) => { // db에서 가져온 유저데이터 결과 result
      // console.log('디시리얼라이즈에서 찍히는 유저',user);
      const tokenUser = { user: result, accessToken: user.accessToken };
      done(null, tokenUser); // req.user 에 저장된다.
    }) // 조회한 정보를 req.user에 저장한다.
    .catch((error) => done(error));
});

router.get('/logout', (req, res) => {
  const ACCESS_TOKEN = req.user.accessToken;
  request.post({
    url: 'https://kapi.kakao.com/v1/user/unlink',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    }
  })
  const session = req.session;
  try {
    if (session.passport) { //세션정보가 존재하는 경우
      req.session.destroy(function (err) {
        if (err)
          console.log(err)
        else {
          res.redirect('/');
        }
      })
    }
  }
  catch (e) {
    console.log(e)
  }
})


passport.use(
  new KakaoStrategy({
    clientID: process.env.Client_ID, // 카카오 로그인에서 발급받은 REST API 키
    callbackURL: '/auth/kakao/callback', // 카카오 로그인 Redirect URI 경로
  },
    // clientID에 카카오 앱 아이디 추가
    // callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
    // accessToken, refreshToken : 로그인 성공 후 카카오가 보내준 토큰
    // profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile)
      try {
        const exUser = await User.findOne({ id: profile.id });
        // 이미 가입된 카카오 프로필이면 성공
        if (exUser) {
          const tokenUser = {
            user: exUser,
            accessToken: accessToken
          }
          done(null, tokenUser); // 로그인 인증 완료
        } else {
          // 가입되지 않은 유저면 회원가입 시키고 로그인을 시킨다
          const newUser = await User.create({
            id: profile.id,
            nickname: profile.displayName,
            email: profile._json.kakao_account.email,
            role: '일반'
          });
          const tokenUser = {
            user: newUser,
            accessToken: accessToken
          }
          done(null, tokenUser); // 회원가입하고 로그인 인증 완료
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    },
  ),
);

function 로그인여부(요청, 응답, next) {
  if (요청.user) {
    next()
  } else {
    응답.redirect('/auth/kakao')
  }
}

router.get('/role', 로그인여부, (req, res) => {
  res.render('role')
})

router.post('/role', (req, res) => {
  const pw = req.body.pw
  if (pw == 123) {
    
    User.findOneAndUpdate({ id: req.user.user.id },
      {
        $set: {
          role: '관리자'
        }
      }, (에러) => {
        if (에러) { 
          console.log(에러)
          res.status(500).send('password is wrong') }
        else { res.status(200).send('password is correct') }
      }
    )
  }
  else{
    console.log('비번틀림')
    res.status(500).send('password is wrong')
  }
})




module.exports = router;
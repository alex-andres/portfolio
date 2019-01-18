const express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  expressSanitizer = require('express-sanitizer'),
  User = require('./models/user'),
  app = express(),
  keys = require('./config/keys');

//APP CONFIG
// mongoose.connect(
//   'mongodb://localhost:27017/restful_portfolio_app',
//   { useNewUrlParser: true }
// );
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));
app.use(
  require('express-session')({
    secret: 'Mo Salah, Mo Salah, Mo Salah, running down the wing...Salah la la la la la la....The Egyptian king',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MONGOOSE/MODEL CONFIG
const portfolioSchema = new mongoose.Schema({
  title: String,
  image: { front: String, back: String },
  body: String,
  technologies: String,
  url: String,
  githubURL: String,
  created: { type: Date, default: Date.now }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

app.get('/portfolio', isLoggedIn, (req, res) => {
  Portfolio.find({}, (err, projects) => {
    if (err) {
      console.log('Error!');
    } else {
      res.render('portfolio', { projects: projects });
    }
  });
});
//new route
app.get('/portfolio/new', isLoggedIn, (req, res) => {
  res.render('portfolio-new');
});
//create route
app.post('/portfolio', isLoggedIn, (req, res) => {
  req.body.project.body = req.sanitize(req.body.project.body);
  Portfolio.create(req.body.project, (err, newProject) => {
    if (err) {
      res.render('portfolio-new');
    } else {
      res.redirect('/portfolio');
    }
  });
});
//edit route
app.get('/portfolio/:id/edit', isLoggedIn, (req, res) => {
  Portfolio.findById(req.params.id, (err, foundProject) => {
    if (err) {
      res.redirect('/portfolio');
    } else {
      res.render('edit', { project: foundProject });
    }
  });
});
//update route
app.put('/portfolio/:id', isLoggedIn, (req, res) => {
  req.body.project.body = req.sanitize(req.body.project.body);
  Portfolio.findByIdAndUpdate(
    req.params.id,
    req.body.project,
    (err, updatedBlog) => {
      if (err) {
        res.redirect('/portfolio');
      } else {
        res.redirect('/portfolio/' + req.params.id);
      }
    }
  );
});
app.get('/portfolio/:id', isLoggedIn, (req, res) => {
  Portfolio.findById(req.params.id, (err, foundProject) => {
    if (err) {
      res.redirect('/portfolio');
    } else {
      res.render('show', { project: foundProject });
    }
  });
});
//delete route
app.delete('/portfolio/:id', isLoggedIn, (req, res) => {
  Portfolio.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect('/portfolio');
    } else {
      res.redirect('/portfolio');
    }
  });
});

app.get('/portfolio-update', isLoggedIn, (req, res) => {
  res.render('portfolio-update');
});

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/projects', (req, res) => {
  Portfolio.find({}, (err, projects) => {
    if (err) {
      console.log('Error!');
    } else {
      res.render('projects', { projects: projects });
    }
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/resume', (req, res) => {
  var tempFile = './public/assets/img/Alex_Andres_Resume.pdf';
  fs.readFile(tempFile, function(err, data) {
    res.contentType('application/pdf');
    res.send(data);
  });
});

// ===========
// AUTH ROUTES
// ===========
app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.render('register');
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/secret');
      });
    }
  );
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: 'portfolio',
    failureRedirect: 'login'
  }),
  (req, res) => {}
);

app.listen(process.env.PORT || 3000);
// app.listen(3000, console.log('App has started'));

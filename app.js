const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
methodOverride = require('method-override'),
expressSanitizer = require('express-sanitizer'),
app = express();

//APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_portfolio_app', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
const portfolioSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  technologies: String,
  url: String,
  created: { type: Date, default: Date.now }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Portfolio.create({
//   title: 'Wagtive',
//   image: '/assets/img/wagtiveMobile.png',
//   body:
//     'A gamified activity and social media app for Dog owners that allows users to receive points and level up through live tracking of activities such as runs and walks with their dogs, checking into pet related businesses, as well as interacting with other dog owners',
//   technologies:
//     'HTML/CSS/Javascript, Bootstrap, Google Maps, Firebase Database, Firebase Authentication, Yelp API, Loadingbarjs',
//   url: 'https://github.com/alex-andres/Wagtive'
// });

app.get('/portfolio', (req, res) => {
  Portfolio.find({}, (err, projects) =>{
    if(err){
      console.log('Error!');
    }
    else{
      res.render('portfolio', {projects: projects});
    }
  });
});
//new route
app.get('/portfolio/new', (req, res) => {
  res.render('portfolio-new');
});
//create route
app.post('/portfolio', (req, res)=>{
  req.body.project.body = req.sanitize(req.body.project.body);
  Portfolio.create(req.body.project, (err, newProject)=>{
    if(err){
      res.render('portfolio-new')
    }else{
      res.redirect('/portfolio');
    }
  })
})
//edit route
app.get('/portfolio/:id/edit', (req, res)=>{
  Portfolio.findById(req.params.id, (err, foundProject) => {
    if (err) {
      res.redirect('/portfolio');
    }
    else {
      res.render('edit', { project: foundProject });
    }
  });

})
//update route
app.put('/portfolio/:id', (req,res)=>{
  req.body.project.body = req.sanitize(req.body.project.body);
  Portfolio.findByIdAndUpdate(req.params.id, req.body.project, (err, updatedBlog)=>{
    if(err){
      res.redirect('/portfolio');
    } else {
      res.redirect('/portfolio/' + req.params.id);
    }

  })
})
app.get('/portfolio/:id', (req, res)=>{
  Portfolio.findById(req.params.id, (err, foundProject) => {
    if (err) {
      res.redirect('/portfolio');
    }
    else {
      res.render('show', {project: foundProject  });
    }
  });
})
//delete route
app.delete('/portfolio/:id',(req, res)=>{
  Portfolio.findByIdAndRemove(req.params.id, (err)=>{
    if(err){
      res.redirect('/portfolio');
    }
    else{
      res.redirect('/portfolio');
    }
  });
});

app.get('/portfolio-update', (req, res) => {
  res.render('portfolio-update');
});

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/projects', (req, res) => {
  res.render('projects');
});

app.get('/portfolio-detail', (req, res) => {
  res.render('portfolio-detail');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/resume', (req, res) => {
  res.render('r');
});

app.listen(3000, () => console.log('Portfolio Server is Running'));

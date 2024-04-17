//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash')
const mongoose = require('mongoose')

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/blog');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  post: {
    type: String,
    require: true
  }
})

const connectBlogData = mongoose.model('post', blogPostSchema);




app.get('/', (req, res)=> {
  async function getPosts(){
    return await connectBlogData.find({})
  };

  getPosts()
  .then(posts=>{
    console.log(posts)
    res.render('home', {
      content: homeStartingContent, 
      blog: posts
    })
  }).catch(
    err=>{
      console.log('Error getting blog data,'+ err)
    }
  )
  
});

app.get('/about', (req, res)=> {
  res.render('about', {content: aboutContent});
});

app.get('/contact', (req, res)=> {
  res.render('contact', {content: contactContent});
});

app.get('/compose', (req, res)=> {
  res.render('compose');
});

app.get('/posts/:blog', (req, res)=> {
  const param = req.params.blog;
  const newParam = _.lowerCase(param)
  for (let i=0; i<posts.length; i++){
    if (newParam === _.lowerCase(posts[i].title)){
      var showPost = posts[i]
    } else {
      console.log('No Match found!')
    }
  }
  res.render('post', {postToShow: showPost});

})


app.post('/compose', (req, res)=> {
   const title = req.body.blog_title;
   const content = req.body.blog_content

   if (title.length > 0 && content.length > 0){
    const post = new connectBlogData({
      title: title,
      post: content
     })
     post.save()
   } else{
    console.log('Error posting to database, Make sure all fields are filled. ')
   }
   

  //  const post = {
  //   title: title,
  //   content: content,
  // }
  // posts.push(post);
  res.redirect('/')
});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});

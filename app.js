//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _  = require("lodash");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "This is a Tech blog website, we'll have some great tech news here.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];
// aboutContentTxt: aboutContent,
//contactContentTxt : contactContent

app.get("/",function(req, res){
  res.render("home",{ homeStartingContent : homeStartingContent, posts: posts });
  
});

app.get("/contact",function(req, res){
  res.render("contact",{ contactContent: contactContent });
});

app.get("/about",function(req, res){
  res.render("about",{ aboutContent: aboutContent });
});

app.get("/compose",function(req, res){
  res.render("compose");
});

app.get("/posts/:requestedTitle",function(req, res){
  let requestedTitle=_.lowerCase(req.params.requestedTitle);
  
  posts.forEach(function(post){
    if(_.lowerCase(post.postTitle)===requestedTitle) {
      console.log("a match");
      let currentPost={
        postTitle:post.postTitle,
        postBody:post.postBody
      };
      res.render("post",{currentPost:  currentPost});
    }
    else {
      console.log("not a match");
    }
  });

  res.redirect("/");
});

app.post("/",function(req, res){
  const postTitle=req.body.postTitle;
  const postBody=req.body.postBody;
  let post={
    postTitle:postTitle,
    postBody:postBody
  };
  posts.push(post);
  
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

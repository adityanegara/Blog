var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/blog_app" , { useNewUrlParser: true }, function(err,res){
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to database");
    }
});


//APP CONFIG
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


//DATABASE CONFIG
var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    word  : String,
    created  : {type : Date, default : Date.now}
});


var Blogs = mongoose.model("Blog", blogSchema);

// Blogs.create({
//   title : "title wolo",
//   image : "https://images.unsplash.com/photo-1545135067-f26e2410add1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   word  : "wolo"
// }, function(err, blog){
//   if(err){
//       console.log("error");
//   } 
//   else{
//       console.log(blog);
//   }
// });

//ROUTE
app.get("/", function(req,res){
    console.log("/ Accessed");
    res.redirect("/blog")
    
});

app.get("/blog", function(req,res){
    console.log("/blog Accessed");
      Blogs.find({}, function(err, findBlogs){
        if(err){
            console.log("error in blog find");
        }
        else{
            res.render("index", {findBlogs : findBlogs});
        }
    });
});

app.get("/blog/new", function(req,res){
    console.log("/blog/new Accessed");
    res.render("new"); 
});

app.post("/blog", function(req,res){
    console.log("POST /blog/new Accessed");
    req.body.blog.word = req.sanitize(req.body.blog.word);
       var blogTitle = req.body.blog.title;
       var blogImage = req.body.blog.image;
       var blogWord  = req.body.blog.word;
       var newBlog = {title : blogTitle, image : blogImage, word : blogWord};
       //create a new campground and save to database
       Blogs.create(newBlog, function(err, newlyCreated){
           if(err){
               console.log(err);
           }
           else{
               console.log("Success input to database");
               res.redirect("/blog");
           }
       });
});

app.get("/blog/:id", function(req, res) {
    console.log("/blog/:id accessed");
   Blogs.findById(req.params.id, function(err, foundBlog){
       if(err){
           console.log("Error at find By Id");
           res.redirect("/blog");
       }
       else{
           res.render("show", {foundBlog: foundBlog});
       }
   })
});

app.get("/blog/:id/edit", function(req, res) {
   console.log("blog/:id/edit acceseed");
   Blogs.findById(req.params.id, function(err, foundEditBlog){
      if(err){
          console.log("error at /blog/:id/edit");
          res.redirect("/blog");
      } 
      else{
          res.render("edit", {foundEditBlog : foundEditBlog});
      }
   });
});

//Update Route
app.put("/blog/:id", function(req,res){
   console.log("PUT /blog/:id accessed");
    req.body.blog.word = req.sanitize(req.body.blog.word);
   Blogs.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
       if(err){
           res.redirect("/blog");
       }
       else{
           res.redirect("/blog/" + req.params.id);
       }
   });
});
//DELETE ROUTE
app.delete("/blog/:id", function(req, res){
    console.log("DELETE /blog/id accessed");
   Blogs.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log("error at delete");
           res.redirect("/blog");
       }
       else{
           res.redirect("/blog");
       }
   })
})

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Blog Server is open");
});
const express = require("express");
const router = express.Router();

module.exports = router;

//Ideas Page
app.get("/ideas", (req, res) => {
  Idea.find({})
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", {
        ideas: ideas
      });
    });
});

//Add Ideas Form
app.get("/ideas/add", (req, res) => {
  res.render("ideas/add");
});

//Edit Idea Form
app.get("/ideas/edit/:id", (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea =>
    res.render("ideas/edit", { idea: idea })
  );
});

//Form Process
app.post("/ideas", (req, res) => {
  let errors = [];

  req.body.title ? null : errors.push({ text: "Please add a title" });
  req.body.details ? null : errors.push({ text: "Please add some details" });

  if (errors.length > 0) {
    res.render("ideas/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newUser).save().then(idea => {
      res.redirect("/ideas");
    });
  }
});

//Edit Form Process
app.put("/ideas/:id", (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    (idea.title = req.body.title), (idea.details = req.body.details);
    idea.save().then(idea => {
      req.flash("success_msg", "Video idea successfully updated.");
      res.redirect("/ideas");
    });
  });
});

//Delete Idea
app.delete("/ideas/:id", (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Video idea successfully deleted.");
    res.redirect("/ideas");
  });
});

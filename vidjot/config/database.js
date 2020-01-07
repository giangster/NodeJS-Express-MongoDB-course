if (process.env.NODE_END === "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://Giang:1234@cluster0-08w6j.mongodb.net/test?retryWrites=true&w=majority"
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost/vidjot-dev" };
}

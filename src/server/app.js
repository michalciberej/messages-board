const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();
const PORT = 3000;
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set("view engine", "ejs") 
app.set("views", "./src/pages")

app.get("/", (req, res) => {
  res.render("index", {messages: messages})
});

app.use("/new",(req, res) => {
  if (req.method === "POST") {
    const { text, user } = req.body
    console.log(text,user)
    messages.push({ text, user, added: new Date() })
    res.redirect("/")
  }
  
  if (req.method === "GET") {
    res.sendFile("src/pages/form.html", {root: "."})
  }
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

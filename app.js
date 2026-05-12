const express = require("express")
const app = express()

app.get("/", (req,res)=>{
  res.send(`
    <h1>🚀 Jenkins CI/CD Production App</h1>
    <h2>Successfully deployed using Docker + Jenkins</h2>
  `)
})

app.listen(3000, ()=>{
  console.log("App running")
})

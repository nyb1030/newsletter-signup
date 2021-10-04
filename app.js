const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()
const port = 3000

const server = "us5";
const apiKey = "011b35b8ce56eee835c978dac9a3163b-us5";
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true}))

//GET request to this server when accessed on root dir
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

//Setting up MailChimp
mailchimp.setConfig({
  apiKey: apiKey,
  server: server,
});

//POST request to this server when accessed on root dir
app.post("/", function(req, res){

  const firstName = req.body.firstName;
  const secondName = req.body.lastName;
  const email = req.body.emailAddress;

  //https://mailchimp.com/developer/marketing/guides/create-your-first-audience/
  const listId = "d679b7040a";
  const subscribingUser = {
    firstName: firstName,
    lastName: secondName,
    email: email
  };

async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
         FNAME: subscribingUser.firstName,
         LNAME: subscribingUser.lastName
      }
    });
    res.sendFile(__dirname + "/successful.html");
    console.log("successful!");
  }

run().catch(e => res.sendFile(__dirname + "/failure.html"));

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(port, function(){
  console.log("server running");
})

////////////



//011b35b8ce56eee835c978dac9a3163b-us5
//d679b7040a

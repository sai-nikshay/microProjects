const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var randomstring = require("randomstring"); 
const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Payload } =require("dialogflow-fulfillment");
const app = express();
var user="";
var usernumber;

app.post("/dflow", express.json(), (req, res) => {
    const agent = new WebhookClient({ 
		request: req, response: res 
		});


async function get_user(agent)
{

  const mobile_num = agent.parameters.pnumber;
  usernumber=mobile_num;
  const client = new MongoClient(url);
  await client.connect();
  const snap = await client.db("proj2").collection("user_table").findOne({mobile_num: mobile_num});
  
  if(snap==null){
	  await agent.add("We cant find your Mobile number please ...Are you an existing user?");

  }
  else
  {
  user=snap.username;
  await agent.add("Welcome  "+user+"!!  \n How can I help you");}
}

async function register_user(agent)
{
  var user_name = agent.parameters.user_name;
  var mobile_num = agent.parameters.pnumber;
  usernumber=mobile_num;
  const client = new MongoClient(url);
  await client.connect();
  const snap = await client.db("proj2").collection("user_table").findOne({mobile_num: mobile_num});
  
  if(snap==null){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("proj2");
        
      var myobj = { username:user_name, mobile_num:mobile_num };
    
        dbo.collection("user_table").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 record inserted");
          db.close();    
        });
     });
    user=user_name;
    usernumber=mobile_num;
    agent.add("Welcome  "+user+"!!  \n How can I help you");
  }
  else
  {
    user=snap.username;
    await agent.end("This mobile number already exists please try registering problem using existing account mr."+user);
  }
}

async function register_problem(agent)
{
 
  var issue_vals={1:"Synchronization Failures",2:"Connectivity Issues",3:"Google Play Store Does Not Download Apps",4:"MicroSD Card Not Working"};
  
  const intent_val=agent.parameters.number;
  
  var val=issue_vals[intent_val];
  var issue_val=  val; 
  const client = new MongoClient(url);
  await client.connect();
 const snap=await client.db("proj2").collection("user_table").findOne({mobile_num:usernumber});
 const snap2 = await client.db("proj2").collection("user_issues").findOne({username:snap.username});
 const snap1 = await client.db("proj2").collection("user_issues").findOne({username:snap.username,issue:issue_val});
  
  if(snap2==null){
  var trouble_ticket=randomstring.generate(7);

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("proj2");
    
	var u_name = user;    
    var issue_val=  val; 
    var status="pending";

	let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    var time_date=year + "-" + month + "-" + date;

	var myobj = { username:u_name, issue:issue_val,status:status,time_date:time_date,trouble_ticket:trouble_ticket };

    dbo.collection("user_issues").insertOne(myobj, function(err, res) {
    if (err) throw err;
    db.close();    
  });
 });
 agent.add("The issue reported is: "+ val +"\nThe ticket number is: "+trouble_ticket +"\n please save this ticket number so that you can track your issue status ");
}
else if(snap2!=null && snap1==null){
  var trouble_ticket=randomstring.generate(7);

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("proj2");
    
	var u_name = user;    
    var issue_val=  val; 
    var status="pending";

	let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    var time_date=year + "-" + month + "-" + date;

	var myobj = { username:u_name, issue:issue_val,status:status,time_date:time_date,trouble_ticket:trouble_ticket };

    dbo.collection("user_issues").insertOne(myobj, function(err, res) {
    if (err) throw err;
    db.close();    
  });
 });
 agent.add("The issue reported is: "+ val +"\nThe ticket number is: "+trouble_ticket +"\n please save this ticket number so that you can track your issue status ");
}
else{
  agent.end("we already have this problem record... \nstatus:"+snap1.status+"\n registered on "+snap1.time_date);
}
}


function custom_payload(agent)
{
	var payLoadData=
		{
  "richContent": [
    [
      {
        "type": "list",
        "title": "Synchronization Failures",
        "subtitle": "Press '1' for Synchronization Failures",
        "event": {
          "name": "",
          "languageCode": "",
          "parameters": {}
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "list",
        "title": "Connectivity Issues",
        "subtitle": "Press '2' for Connectivity Issues",
        "event": {
          "name": "",
          "languageCode": "",
          "parameters": {}
        }
      },
	  {
        "type": "divider"
      },
	  {
        "type": "list",
        "title": "Google Play Store Does Not Download Apps",
        "subtitle": "Press '3' for Google Play Store Does Not Download Apps",
        "event": {
          "name": "",
          "languageCode": "",
          "parameters": {}
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "list",
        "title": "MicroSD Card Not Working",
        "subtitle": "Press '4' for MicroSD Card Not Working",
        "event": {
          "name": "",
          "languageCode": "",
          "parameters": {}
        }
      }
    ]
  ]
}
agent.add(new Payload(agent.UNSPECIFIED,payLoadData,{sendAsMessage:true, rawPayload:true }));

}


function welcome(agent) {
  var payLoadData=
  {
"richContent": [
  [
    
  {
      "type": "list",
      "title": "Check registered issue status",
      "subtitle": "Press '1' to Check registered issue status",
      "event": {
        "name": "",
        "languageCode": "",
        "parameters": {}
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "list",
      "title": "Register a new issue",
      "subtitle": "Press '2' to Register a new issue",
      "event": {
        "name": "",
        "languageCode": "",
        "parameters": {}
      }
    }
  ]
]
}
agent.add(new Payload(agent.UNSPECIFIED,payLoadData,{sendAsMessage:true, rawPayload:true })); 
}

function find_opt(agent){
  var opt=agent.parameters.number;
  if(opt==1){
    agent.add("Enter ticket in format:\nticket:<ticket>");
  }else
  if(opt==2){
    agent.add("Enter mobile number in format:\nmobile:<mobile_number>");
  }
}
async function find_status(agent){
  const trouble_ticket = agent.parameters.ticket_num;
  const client = new MongoClient(url);
  await client.connect();
  const snap = await client.db("proj2").collection("user_issues").findOne({trouble_ticket:trouble_ticket});
  
  if(snap==null){
	  await agent.add("We cant find your Ticket number please ...Re-Enter");

  }
  else
  {
  user=snap.username;
  var issue=snap.issue;
  var status=snap.status;
  await agent.add("Welcome  "+user+"!!  \n your issue :"+issue+"\n status is "+status);}
}

var intentMap = new Map();
intentMap.set("check_ticket",find_status);
intentMap.set("registering", get_user);
intentMap.set("registering - custom", custom_payload);
intentMap.set("registering - custom - custom", register_problem);
intentMap.set("registering - no - yes - custom", register_user);
intentMap.set("registering - no - yes - custom - custom", custom_payload);
intentMap.set("registering - no - yes - custom - custom - custom", register_problem);
intentMap.set('welcome intent', welcome);
intentMap.set("welcome intent - custom",find_opt);
agent.handleRequest(intentMap);


});

app.listen(process.env.PORT || 8080);


const googleTrends = require('google-trends-api');
const express = require('express');
const app = express();

console.log("Node is working");
//console.log('Current directory: ' + process.cwd());

module.exports = {
  interestOverTimeApiCall
};

/* 
Interest over time function:

googleTrends.interestOverTime({keyword: string, startTime: Date, endTime: Date, geo: string}, cbFunc)
(string/arr, Date (ex format: Feb 13, 2017 at 9:43 PM), Date, string ) -> Array of arrs

api call that returns values based on response from google trends, errors if it fails (most likely rate limited)
if date is in months will return per month otherwise per day from startdate->enddate

to do:
foutput to file so that we can send that as a response?
*/

//let keywords = 'Women\'s march';
//['Women\'s march', 'Trump Inauguration'];

//let startDate = new Date('2023-01-01');
//let endDate = new Date('2023-01-04');


function interestOverTimeApiCall(keywords, startDate = undefined, endDate = undefined){

    if(!Array.isArray(keywords)){
        //console.log(Array.isArray(keywords));
        keywords = [keywords];
    }
    googleTrends.interestOverTime({keyword: keywords, startTime: (startDate ? startDate : new Date('2004-01-01')), endTime: (endDate ? endDate : new Date())})
    .then(function(results){
        //results such that i can read, find: \}([^}]+)\{ 
        //replace:  },\n{
      console.log('These results are awesome', results);
      data = results;
    
      //can make this file output 
      //or do comparisons here: go thru the json output, if default->value is greater than the max of last 4 or 5 values, save the date?
    })
    .catch(function(err){
      console.error('Oh no there was an error', err);
    });
}

const port = 3000;



app.get('/', (req, res) => {
    //res.send(data); //works
    
   /*  let data = undefined;

    interestOverTimeApiCall(keywords); */

    myKeywords = req.query.keywords;
    myStartDate = req.query.startDate ? new Date(req.query.startDate) : undefined; 
    myEndDate = req.query.endDate ? new Date(req.query.endDate) : undefined;

    //res.send( new Date(myStartDate));
    //res.send(req.query.keywords); //works
    //res.send('Received a GET HTTP method');
    
    if (myKeywords.indexOf(',') > -1) { 
      myKeywords = myKeywords.split(",");
      //console.log('comma!'); 
    }
    //console.log(myKeywords.split(","));
    //from pub date to audiobook release date
    //can sub for other api endpoints: interestOverTime & interestByRegion
    googleTrends.interestOverTime({keyword: myKeywords, startTime: myStartDate, endTime: myEndDate, geo: 'US', resolution: 'region', category: 0}) 
    .then(function(results){
        //results such that i can read, find: \}([^}]+)\{ 
        //replace:  },\n{
      //console.log('These results are awesome', results);
      res.send(results);
      //can make this file output 
      //or do comparisons here: go thru the json output, if default->value is greater than the max of last 4 or 5 values, save the date?
    })
    .catch(function(err){
      console.error('Oh no there was an error', err);
    });
    //maybe blend to a cross region
    
});

/* app.get('/', (req, res) => {
  //res.send(data); //works
  
  //let data = undefined;

  //interestOverTimeApiCall(keywords); 

  res.send(req.params); //works
  //res.send('Received a GET HTTP method');
  
}); */

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
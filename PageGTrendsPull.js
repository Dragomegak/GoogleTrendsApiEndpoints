const { ExploreTrendRequest } = require('g-trends');

const explorer = new ExploreTrendRequest();

const express = require('express');

const app = express();
console.log("Node is working");
const port = 3000;


/* explorer.addKeyword('spare prince harry')
        .between('2023-01-01','2023-03-30')
        .download().then( csv => {
            console.log('[✔] Done, take a look at your beautiful CSV formatted data!')
            console.log(csv)
        }).catch( error => {
            console.log('[!] Failed fetching csv data due to an error',error)
        }) */

app.get('/', (req, res) => {
    //res.send(data); //works
    
    /*  let data = undefined;

    interestOverTimeApiCall(keywords); */

    myKeywords = req.query.keywords;
    myStartDate = req.query.startDate ? req.query.startDate : undefined; 
    myEndDate = req.query.endDate ? req.query.endDate : undefined;

    //res.send( new Date(myStartDate));
    //res.send(req.query.keywords); //works
    //res.send('Received a GET HTTP method');

    function getvalues(keyword, startDate = undefined, endDate = undefined){

        if(startDate == undefined || endDate == undefined){
            //works
            console.log(keyword); //'Women\'s march'
            explorer.addKeyword(keyword)
            .download().then( csv => {
                console.log('[✔] Done, take a look at your beautiful CSV formatted data!')
                //console.log(csv)
                res.send(csv);
            }).catch( error => {
                console.log('[!] Failed fetching csv data due to an error',error)
            })
        }
        else{
            console.log(keyword);
            //console.log(typeof startDate);
            console.log(startDate);
            //console.log(typeof endDate);
            console.log(endDate);
            
            //happening too fast concurrently and giving undefined
           /*  explorer.addKeyword(keyword)
            .between(startDate,endDate)
            .download().then( csv => {
                console.log('[✔] Done, take a look at your beautiful CSV formatted data!')
                res.send(csv);
            }).catch( error => {
                console.log('[!] Failed fetching csv data due to an error',error)
            }) */
        }

    }
    
    if (myKeywords.indexOf(',') > -1) { 
        myKeywords = myKeywords.split(",");
    }

    if(typeof myKeywords === 'string'){
        //only 1 value in
        getvalues(myKeywords, myStartDate, myEndDate);
    }
    else{
        for(let i = 0; i < myKeywords.length; i++){
            getvalues(myKeywords[i], myStartDate, myEndDate);
        }
    }    
});

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
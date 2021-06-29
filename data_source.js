var fs = require("fs");
var path = require('path');
var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors') 

var app = express();
app.use(bodyParser.json());
app.use(cors()); //to prevent CORS issue: Access-Control-Allow-Origin

const pagelist1 = {"page":1,"per_page":3,"total":6,"total_pages":2,"data":[
    {"id":1,"title":"15 Best Things To Do In Hong Kong","description":"Hong Kong is an incredible place to explore. Not only Is it a perfect mix of vibrant, busy, hectic and historic, it’s also got a heap of the best things to do in Hong Kong that are dotted all across the area.","avatar":"http://localhost:4000/uploads/1.jpg", "readmore": "https://handluggageonly.co.uk/2017/03/31/14-things-you-need-to-see-and-do-in-hong-kong/"},
    {"id":2,"title":"10 Unforgettable Things To Do In Hong Kong","description":"Hong Kong, undoubtedly one of my favorite places on earth. Hong Kong is a vibrant place, a place that will make you feel alive, but will still give you the possibility of peace and quietness whenever you want to.","avatar":"http://localhost:4000/uploads/2.jpg", "readmore": "https://www.omnivagant.com/10-things-hong-kong/"},
    {"id":3,"title":"Hong Kong Itinerary 3 days","description":"Sip on a cocktail while you cruise the harbour on the best seat in town while watching the spectacular skyline illuminate during the Symphony of Light show (show at 8 pm).","avatar":"http://localhost:4000/uploads/3.jpg", "readmore": "https://travel2next.com/hong-kong-itinerary-3-days/"}]
}

const pagelist2 = {"page":2,"per_page":3,"total":6,"total_pages":2,"data":[
    {"id":4,"title":"11 Must-Do Experiences in Hong Kong","description":"Planning a holiday in Hong Kong? Discover the 11 best things to do in Hong Kong based on my travel experiences in the city, from shopping to the seaside.","avatar":"http://localhost:4000/uploads/4.jpg", "readmore": "http://stylishtravlr.com/11-must-do-experiences-in-hong-kong/"},
    {"id":5,"title":"The Ultimate Guide to Temples of Hong Kong (ALL free entry!)","description":"Hong Kong has no shortage of temples, and as a Buddhist and Taoist based population for the majority of its history, it shouldn’t surprise anyone","avatar":"http://localhost:4000/uploads/5.jpg", "readmore": "https://www.laughtraveleat.com/asia/hong-kong-temples-ultimate-guide/"},
    {"id":6,"title":"12 Easy Hong Kong Day Trip Ideas for When You Need a Change of Scenery","description":"If you're looking to add even more things to do to your Hong Kong itinerary, read on for 12 fantastic day trips from Hong Kong that don't involve too much hassle and travel time!","avatar":"http://localhost:4000/uploads/6.jpg", "readmore": "https://www.yogawinetravel.com/12-easy-hong-kong-day-trip-ideas-for-when-you-need-a-change-of-scenery/"}]
}

app.get('/status', function (req, res) {
    console.log('/status');
    //res.end({'status': 'ok'} );
    res.end('ok');
 })


// app.get('/uploads/:name', function (req, res) {
//     const req_body = req.params;
//     fs.readFile( __dirname + "/" +req_body["name"], 'utf8', function (err, data) {
//         console.log( data );
//         res.end( data );
//     });
// })
 


app.get('/page/:pagenum', (req, res) => {
    const req_body = req.params;
    console.log('/page/:pagenum', req_body);

    let pagenum = req_body["pagenum"]

    if (pagenum == "1"){
        res.end(JSON.stringify(pagelist1));
    }
    else if (pagenum == "2"){
        res.end(JSON.stringify(pagelist2));
    } 
    else {
        res.end(JSON.stringify(pagelist1));
    }    
});




var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

//var dir = path.join(__dirname, '/uploads');
var dir = path.join(__dirname);

app.get('/uploads/:name', function (req, res) {
    console.log('/uploads/:name');
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    console.log("file type:", type, "filename: ", file)
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});


// START THE SERVICE 
var server = app.listen(4000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Web Service listening at http://%s:%s", host, port)
 })

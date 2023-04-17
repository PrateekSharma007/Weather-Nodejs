const http = require('http');
const fs = require('fs');
var requests = require('requests')

const homefile = fs.readFileSync("Home.html", 'utf-8');

const replaceval = (tempval,orival) =>{ 
    let temperature = tempval.replace("{%tempval%}",orival.main.temp)
    temperature = temperature.replace("{%tempmax%}",orival.main.temp_max)
    temperature = temperature.replace("{%tempmin%}",orival.main. temp_min)
    temperature = temperature.replace("{%location%}",orival.name)
    temperature= temperature.replace("{%country%}",orival.sys.country)
    return temperature
    

}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Noida&appid=9a9c791d8fd25c25bae95df7dd081207')
        .on("data" , chunk => {
            const obdata = JSON.parse(chunk)
            const arr = [obdata];
            // console.log(arr[0].main.temp )
            console.log(arr[0].main)
            var realtimedata = arr.map((val) =>{ 
                replaceval(homefile,val)
                
            }).join("");
            // res.write(realtimedata)
            
            console.log(realtimedata)
        })
        .on("end", function(err){
            if(err) return console.log("Connection closed due to error")
            
            console.log('end')
            res.end();
        })
        }
})

server.listen(4000, 'localhost' , () => {
    console.log('listening for request on port 4000')
})

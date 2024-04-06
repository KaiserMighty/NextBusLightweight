// Initial function/main, show routes
loadXML(1,"https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=sfmuni-sandbox");

// Fetch all XML file and redirect to next function
function loadXML(nextFunc, link)
{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let xmlDoc = this.responseXML;
            // Redirect to next function
            switch (nextFunc)
            {
                case 1: // Routes
                    routeDetails(xmlDoc);
                    break;
                case 2: // Stops
                    stopDetails(xmlDoc);
                    break;
                case 3: // Times
                    busDetails(xmlDoc);
            }
        }
    };
    xmlhttp.open("GET", link, true);
    xmlhttp.send();
}

// Parse and display when the next bus is arriving
function busDetails(xml)
{
    let times = xml.getElementsByTagName("prediction");
    let stopInfo = xml.getElementsByTagName("predictions");
    let route = stopInfo[0].getAttribute("routeTag");
    
    // Always only display 3 or less times
    let displayAmount = 3;
    if (times.length < 3) displayAmount = times.length;
    console.log(times.length);

    // Create Back Button
    let HTML = "<h2 class='choice_header'>Next Bus Arrives in</h2>";
    if (displayAmount == 0) HTML = "<h2 class='choice_header'>No Buses Currently</h2>";
    let link = "https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&a=sfmuni-sandbox&r="+route;
    HTML += "<button type='button' class='back_button' onclick='loadXML(2,\""+link+"\")'>Back</button><br>";
    
    // Iterate through times and display them
    for (let i = 0; i < displayAmount; i++)
    {
        // Display as seconds
        if (times[i].getAttribute("minutes") == 0)
        {
            HTML += "<h3 class='time_entry'>" + times[i].getAttribute("seconds") + " seconds</h3>";
        }
        // Display as minute
        else if (times[i].getAttribute("minutes") == 1)
        {
            HTML += "<h3 class='time_entry'>" + times[i].getAttribute("minutes") + " minute</h3>";
        }
        // Display as minutes
        else
        {
            HTML += "<h3 class='time_entry'>" + times[i].getAttribute("minutes") + " minutes</h3>";
        }
    }
    document.getElementById("id").innerHTML = HTML;
}

// Parse and display all stops for chosen route
function stopDetails(xml)
{
    let stops = xml.getElementsByTagName("stop");
    let route = xml.getElementsByTagName("route")[0].getAttribute("tag");
    
    // Create Back Button
    let HTML = "<h2 class='choice_header'>Choose your Stop for " + route + "</h2>";
    let link = "https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=sfmuni-sandbox";
    HTML += "<button type='button' class='back_button' onclick='loadXML(1,\""+link+"\")'>Back</button><br>";
    
    // Iterate through stops and display them
    for (let i = 0; i < stops.length; i++)
    {
        let stop = stops[i].getAttribute("stopId");
        let title = stops[i].getAttribute("title");
        if (title == null || stop == null) continue; // Skip invalid entries
        link = "https://retro.umoiq.com/service/publicXMLFeed?command=predictions&a=sfmuni-sandbox&stopId="+stop+"&routeTag="+route
        HTML += "<button type='button' class='button' onclick='loadXML(3,\""+link+"\")'>"+title+"</button>";
    }
    document.getElementById("id").innerHTML = HTML;
}

// Parse and display all routes
function routeDetails(xml)
{
    let HTML = "<h2 class='choice_header'>Choose your Route</h2>";
    let routes = xml.getElementsByTagName("route");

    // Iterate through all routes and display them
    for (let i = 0; i < routes.length; i++)
    {
        let route = routes[i].getAttribute("tag");
        let title = routes[i].getAttribute("title");
        let link = "https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&a=sfmuni-sandbox&r="+route;
        HTML += "<button type='button' class='button' onclick='loadXML(2,\""+link+"\")'>"+title+"</button>";
    }
    document.getElementById("id").innerHTML = HTML;
}
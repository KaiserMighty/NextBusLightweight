//https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=sfmuni-sandbox
//https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&a=sfmuni-sandbox&r=<ROUTE>
//https://retro.umoiq.com/service/publicXMLFeed?command=predictions&a=sfmuni-sandbox&stopId=<STOPID>&routeTag=<ROUTE>

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {

    // Request finished and response 
    // is ready and Status is "OK"
    if (this.readyState == 4 && this.status == 200) {
        routeDetails(this);
    }
};

// employee.xml is the external xml file
xmlhttp.open("GET", "https://retro.umoiq.com/service/publicXMLFeed?command=predictions&a=sfmuni-sandbox&stopId=14341&routeTag=28", true);
xmlhttp.send();

function loadStops(x)
{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            stopDetails(this);
        }
    };

    xmlhttp.open("GET", xml, true);
    xmlhttp.send();
}

function loadBuses(x, y)
{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            busDetails(this);
        }
    };

    xmlhttp.open("GET", "https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&a=sfmuni-sandbox&stopId=" + x + "&routeTag=" + y, true);
    xmlhttp.send();
}

function busDetails()
{
    let i;
    let xmlDoc = xml.responseXML;
    let table =
        `<h2>Next Bus in Minutes</h2>`;
    let x = xmlDoc.getElementsByTagName("prediction");

    // Start to fetch the data by using TagName 
    for (i = 0; i < x.length; i++)
    {
        table += "<h3>" + x[i].getAttribute("minutes") + "</h3>";
    }

    // Print the xml data in table form
    document.getElementById("id").innerHTML = table;
}

function stopDetails(xml)
{
    let i;
    let xmlDoc = xml.responseXML;
    let button =
        `<h2>Choose your Stop</h2>`;
    let x = xmlDoc.getElementsByTagName("stop");

    // Start to fetch the data by using TagName 
    for (i = 0; i < x.length; i++)
    {
        let y = x[i].getAttribute("stopId")
        let thing = x[i].getAttribute("title")
        button += "<button type='button' class='button' onclick='loadBuses('" + y + ")>" + thing + "</button>";                
    }

    // Print the xml data in table form
    document.getElementById("id").innerHTML = table;
}

function routeDetails(xml)
{
    let i;
    let xmlDoc = xml.responseXML;
    let button =
        `<h2>Choose your Route</h2>`;
    let x = xmlDoc.getElementsByTagName("route");

    // Start to fetch the data by using TagName 
    for (i = 0; i < x.length; i++)
    {
        let y = x[i].getAttribute("tag")
        let thing = x[i].getAttribute("title")
        button += "<button type='button' class='button' onclick='loadStops('" + y + ")>" + thing + "</button>";                
    }

    // Print the xml data in table form
    document.getElementById("id").innerHTML = table;
}
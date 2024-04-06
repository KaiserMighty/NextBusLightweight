let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {

    // Request finished and response 
    // is ready and Status is "OK"
    if (this.readyState == 4 && this.status == 200) {
        routeDetails(this);
    }
};

// employee.xml is the external xml file
xmlhttp.open("GET", "https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=sfmuni-sandbox", true);
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

    xmlhttp.open("GET", "https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&a=sfmuni-sandbox&r="+x, true);
    xmlhttp.send();
}

function loadBuses(x,y)
{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            busDetails(this);
        }
    };

    xmlhttp.open("GET", "https://retro.umoiq.com/service/publicXMLFeed?command=predictions&a=sfmuni-sandbox&stopId="+x+"&routeTag="+y, true);
    xmlhttp.send();
}

function busDetails(xml)
{
    let i;
    let xmlDoc = xml.responseXML;
    let button =
        `<h2>Next Bus in Minutes</h2>`;
    let x = xmlDoc.getElementsByTagName("prediction");
    let y = 3;
    if (x.length < 3) y = x.length;
    // Start to fetch the data by using TagName 
    for (i = 0; i < x.length; i++)
    {
        if (x[i].getAttribute("minutes") == 0)
        {
            button += "<h3>" + x[i].getAttribute("seconds") + " Seconds" + "</h3>";
        }
        else
        {
            button += "<h3>" + x[i].getAttribute("minutes") + " Minutes" + "</h3>";
        }
    }

    // Print the xml data in table form
    document.getElementById("id").innerHTML = button;
}

function stopDetails(xml)
{
    let i;
    let xmlDoc = xml.responseXML;
    let button =
        `<h2>Choose your Stop</h2>`;
    let x = xmlDoc.getElementsByTagName("stop");
    let z = xmlDoc.getElementsByTagName("route")[0].getAttribute("tag");

    // Start to fetch the data by using TagName 
    for (i = 0; i < x.length; i++)
    {
        let y = x[i].getAttribute("stopId");
        let thing = x[i].getAttribute("title");
        if (thing == null) continue;
        button += "<button type='button' class='button' onclick='loadBuses(" +y+","+z+")'>"+thing+"</button>";                
    }

    // Print the xml data in table form
    document.getElementById("id").innerHTML = button;
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
        let y = x[i].getAttribute("tag");
        let thing = x[i].getAttribute("title");
        button += "<button type='button' class='button' onclick='loadStops("+y+")'>"+thing+"</button>";                
    }

    // Print the xml data in table form
    document.getElementById("id").innerHTML = button;
}
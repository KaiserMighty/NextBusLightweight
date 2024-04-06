let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function ()
{
    if (this.readyState == 4 && this.status == 200)
    {
        routeDetails(this);
    }
};

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
        `<h2>Next Bus Arrives in</h2>`;
    let x = xmlDoc.getElementsByTagName("prediction");
    let y = 3;
    if (x.length < 3) y = x.length;
    
    for (i = 0; i < y; i++)
    {
        if (x[i].getAttribute("minutes") == 0)
        {
            button += "<h3>" + x[i].getAttribute("seconds") + " seconds" + "</h3>";
        }
        else if (x[i].getAttribute("minutes") == 1)
        {
            button += "<h3>" + x[i].getAttribute("minutes") + " minute" + "</h3>";
        }
        else
        {
            button += "<h3>" + x[i].getAttribute("minutes") + " minutes" + "</h3>";
        }
    }
    let m = xmlDoc.getElementsByTagName("predictions");
    let j = m[0].getAttribute("stopTag") + " " + m[0].getAttribute("routeTag") + " " + m[0].getAttribute("routeTag") + " " + m[0].getAttribute("stopTitle");
    button += "<button type='button' class='button' onclick='favorite(\""+j+"\")'>Favorite Stop</button>";
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
 
    for (i = 0; i < x.length; i++)
    {
        let y = x[i].getAttribute("stopId");
        let thing = x[i].getAttribute("title");
        if (thing == null || y == null) continue;
        button += "<button type='button' class='button' onclick='loadBuses(\""+y+"\",\""+z+"\")'>"+thing+"</button>";
    }
    document.getElementById("id").innerHTML = button;
}

function routeDetails(xml)
{
    let i;
    let xmlDoc = xml.responseXML;
    let button =
        `<h2>Choose your Route</h2>`;
    let x = xmlDoc.getElementsByTagName("route");

    for (i = 0; i < x.length; i++)
    {
        let y = x[i].getAttribute("tag");
        let thing = x[i].getAttribute("title");
        button += "<button type='button' class='button' onclick='loadStops(\""+y+"\")'>"+thing+"</button>";
    }
    document.getElementById("id").innerHTML = button;
}

function favorite(x)
{
    
}
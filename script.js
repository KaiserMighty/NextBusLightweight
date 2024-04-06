let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {

    // Request finished and response 
    // is ready and Status is "OK"
    if (this.readyState == 4 && this.status == 200) {
        xmlDetails(this);
    }
};

// employee.xml is the external xml file
xmlhttp.open("GET", "https://retro.umoiq.com/service/publicXMLFeed?command=predictions&a=sfmuni-sandbox&stopId=14341&routeTag=28", true);
xmlhttp.send();

function xmlDetails(xml)
{
    let i;
    let xmlDoc = xml.responseXML;
    let table =
        `<tr><th>Table</th></tr>`;
    let x = xmlDoc.getElementsByTagName("prediction");

    // Start to fetch the data by using TagName 
    for (i = 0; i < x.length; i++)
    {
        table += "<tr><td>" + x[i].getAttribute("seconds") + "</td><td>";
    }

    // Print the xml data in table form
    document.getElementById("id").innerHTML = table;
}
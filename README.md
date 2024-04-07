# Where's My MUNI?
## Quickly find out when the next bus arrives
### Lightweight Quick-Refernce Webpage

Where's My MUNI™ is a lightweight and portable webpage made by *G&K* meant to accompany you during your daily commute.<br>
While waiting for your daily bus, quickly check on the device of your choice how long you have to wait by choosing your route and stop.<br>
If desired, compressable down to a single HTML file by moving the script file and style file to in-line declarations.<br>

**Where's My MUNI™ leverages the Next Bus API.**

The webpage requests and parses XML data for all Muni lines and prompts the use to choose their lines.<br>
Upon selection, the page will display the user's choice and create a back button if they mis-chose.<br>
All the stops for the chosen routes will populate and the user will once again need to choose their stop.<br>
After selecting the stop, the page will populate with at most the times of 3 upcoming buses.<br>
If there are no buses, the page will display that there are no buses currently, and the user can press the back button.<br>
The time will display in seconds if there is less than 1 minutes before the next bus is predicted to arrive.<br>
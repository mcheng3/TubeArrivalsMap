 # DataNotStatic by Team PikaMoo-PikaMoo

Contributors: Ishtiaque Mahdi (Project Manager) , Kerry Chen, Philip Park, Michael Cheng

## Data Description and Source

  The data we used is in JSON format and XML. It contains information about the London Underground, which is a network of trains. The data has names of stations as well as expected arrival time. The data is also in real time because we are getting it from the Transport for London Unified API. It can be found here: https://api-portal.tfl.gov.uk/ . For example, we can get the arrival time predictions for all stations on the Tube using this API call https://api.tfl.gov.uk/Mode/tube/Arrivals.

## Relevance And Significance  

  We all hate waiting for the bus and train. That's why our website will allow you to see London's transportation system LIVE! Our European friends will surely find this tool useful in their daily ventures and so will you if you ever visit London. In addition, this also serves as a prototype for our NYC's transit system site, however their API needs work. Until then, we will explore London's bustling transit network!

## Making The Data Come Alive  

  Our data will literally be...a-LIVE! Pardon the pun. We are getting live data from the API which means we will be able to update the page with that live data. We want to have a D3 map of different routes and track each subway car/bus. The stations would be represented as large circles and will contain a changing color enclosed inside. As a train gets closer to the stop, the color changes. How close the train is can be determined by a gradient key on the bottom right of the map.

## User Interface

  When the page loads up, the user will see the route they chose, inbound/outbound trains, as well as the stations on that route. They will also see smaller bubbles along the route that have different colors. When the user hovers on a station, it will give the name of that station. In addition, the user can zoom and pan the map for a better view. They can even use this to compare it to the gradient key to find the time it will take for a train to come.

## Explore And Provoke

  We hope that our project demonstrates the superiority of the United Kingdoms public transport and makes it easy to understand for New Yorkers. In addition, it is very user-friendly and can help both Americans and our British counterparts. We also think that it cool that our map displays the actual distance between stations because the official map is actually distorted to make it easier to read. In addition, our map allows the user to isolate each route and move the map around. Not only that, by having a color changing gradient, it gives a sense of time changing. We chose our gradient so that it changed dramatically and would give a sense of urgency. The hover feature is there so that it's easier to read the map, and it can also encourage users to memorize the stops as well which can very helpful when commuting to new places and serves as a sort of quiz/flashcard.

## D3 Feature Utilization  

  We plan to use SVG and D3 together to create the data visualization of this project. We decided on this because we have many objects, but each one has different requirements and we are utilizing D3 almost everywhere. It takes part in generating the route and making it a live map. It also helps us relay the information when a user triggers a certain event such as the station by hovering over it. It was also very useful while we were testing and debugging. 

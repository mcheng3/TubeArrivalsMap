 # DataNotStatic by Team PikaMoo-PikaMoo

Ishtiaque Mahdi (Project Manager) , Kerry Chen, Phillip Park, Michael Cheng

## Data Description and Source

  The data we used is in JSON format and XML. It contains information about the Tube, DLR, and TfL Rail. The data has names of stations as well as expected arrival time. The data is also in real time because we are getting it from the Transport for London Unified API. It can be found here: https://api-portal.tfl.gov.uk/ . For example, we can get the arrival time predictions for all stations on the Tube using this API call https://api.tfl.gov.uk/Mode/tube/Arrivals.
  
## Relevance And Significance  
  
  We all hate waiting for the bus and train. That's why our website will allow you to see London's transportation system LIVE! Our European friends will surely find this tool useful in their daily ventures and so will you if you ever visit London. In addition, this also serves as a prototype for our NYC's transit system site, however their API needs work. Until then, we will explore London's bustling transit network!
  
## Making The Data Come Alive  

  Our data will literally be...a-LIVE! Pardon the pun. We are getting live data from the API which means we will be able to update the page with that live data. We want to have a D3 map of different routes and track each subway car/bus. The stations would be represented as large circles while vehicles will be represented as smaller circles moving along the route. 

## User Interface

  When the page loads up, the user will see the route they chose as well as the stations on that route. They will also see smaller bubbles moving along the route that represents vehicles. When the user clicks on a station, it will give the approximate times for each bubble to reach that station. When they click on a bubble it will tell the approximate time for arrival to the nearest station. 
  
## Explore And Provoke

  We hope that our project demonstrates the superiority of the United Kingdoms public transport and makes it easy to understand for New Yorkers. In addition, it is very user-friendly and can help both Americans and the British. Not only that, it can help you explore London and ask questions such as: Why is NYC's MTA so bad???
  
## D3 Feature Utilization  

  We plan to use SVG and D3 together to create the data visualization of this project. We decided on this because we have live moving parts in our visualization and SVG objects are useful because we do not have to redraw them. We are utilizing D3 almost everywhere. It takes part in generating the route and making it a live map. It also helps us relay the information when a user triggers a certain event such as the station, bubble, or new route. 

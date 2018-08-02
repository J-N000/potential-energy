
*This application is intended to assist gravity sports participants in finding adequate terrain.*

Currently the best technological assistance for downhill athletes is to simply open Google Earth and look around for elevated areas with pavement. Or to buy topographical maps which are often incorrect, or fail to show roads consistently. Instead of these ineffective methods, most of those who choose to pursue the sport in a locale without a rich scene are forced to search manually.
#

###Proof of Concept:
The initial goal of the app would be to locate a user (or take a user entered location) and allow that user to query paths between two points on a map. Upon completion of the pathing, a grade report would be generated, including infographic visualization from Google charts. This is done to allow a user to analyze the viability of a road surface in a much more concrete and data driven manner. 
#

###Stretch Goals:
In the long term, this app could be expanded to include the following features:

- Searching specified paths (ie. user enters two or more coordinates) manually.
- Conducting a radius search of all roads stemming from a point of highest elevation (high cost).
- Saving locations as named destinations directly on a Waze or Maps account.
- Port the application to a native version for Apple and Android products.
#

###Stack:

- Front end: Vue.js
- Server:    Spring
#

###API: 
- [Elevation API](https://developers.google.com/maps/documentation/elevation/start) - 
    find elevations along a path or at given LAT, LON coordinates.
- [Directions API](https://developers.google.com/maps/documentation/javascript/directions) - 
    find an efficient path of travel from one coordinate to another.
- [Geocoding API](https://developers.google.com/maps/documentation/javascript/geocoding) - 
    find LAT, LON coordinates for a given typical address.      
#

This is an attempt to both assist athletes and genuinely aid in the proliferation of the sport.    

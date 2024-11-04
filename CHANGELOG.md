
# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).
 
## [0.3.0] - 2024-11-06
 
### Added

- Authorization capability that allows users to login, logout, or register
- Authorization, Register, and Login pages
- Protected Route service that prohibits users from accessing restricted pages unless signed in and redirects if necessary
- Authorized Route service that prohibits users from accessing authorization pages if they are signed in and redirects if necessary
- logout button that appears in the navigation bar if the user is logged in
- Link to authorization page in teh navigation bar that appears if the user is NOT logged in

 
### Changed

- Changed Event object to include a pointer to a _User object
- Planner/Optimizer pages only display Events for the current user
- Moved the Header component out of Components.js and into componenets individually to enable dynamically updated navigation bar based on if the user is logged in

### Fixed

 

## [0.2.0] - 2024-10-18
 
### Added

- Three distinct pages with routing between them
- Message informing what class they are coming from in addition to their next class
- Embedded map with directions from where the user is coming from to where the user's next class is
- Parse Object on buildings
- Directions page that allows users to select two buildings on campus and provides an embeded map between them
- Added functinoality to forms for updating classes, so they work and the class list becomes dynamic
- Form for removing event
- Form for adding study time
- Form for adding class
- Form for adding day start/end location
 
### Changed

- Changed source of class information from a local json file to Parse Objects
 
### Fixed

- Bug involved with getting the next class to occur
 

 
## [0.1.0] - 2024-10-03
 
### Added

- Created initial version of application
- Display Planner feature that shows classes on selected day
- Created forms for updating classes on the front end, but they can't be submitted to server
- Form for adding classs
- Form for removing class
- Form for adding study time
- Message informing user when the next class occurs
- Map to display event location

   
### Changed
 
### Fixed
 
# Changelog

All notable changes to this project will be documented in this file.

## [4.0.0-beta-0] - 2023-08-13

### Bug Fixes

- Change access of routes to protected and fix event scopes
- Use context everywhere where there's no arrow function. Better safe than sorry
- Copy routed routes to prevent emptying the array
- Only remove alts in container when requesting new geometry
- Do not reverse received waypoints after routing
- Only execute default route transform when custom transform does not exist
- Allow empty waypoint creation
- Make webpack example compatible with osrm change
- Always make L.Routing available on window
- Add null checks for latlng where necessary
- Do not use space in id
- Make sure context is correct
- Update dependencies and directories
- Remove invalid option

### Documentation

- Add simple typedoc config
- Add typedoc for routing control
- Add leaflet docs resolver for typedoc
- Add typedoc annotations to itinerary builder
- Add typedoc comments for plan
- Add typedoc comments for line
- Add typedoc comments for osrm router
- Add typedoc comments for formatter
- Add typedoc comments to localization and waypoint
- Add typedoc comments for interfaces
- Add more typedoc comments
- Add typedoc annotations for always up to date docs
- Update Readme with v4 information

### Features

- Move to esbuild in preparation for typescript
- Convert localization to typescript
- Convert autocomplete.js to Typescript
- Rewrite error-control.js in Typescript
- Convert itinerary-builder.js to Typescript
- Convert waypoint.js to Typescript
- Convert geocoder-elements.js to Typescript
- Add common types for most LRM data objects
- Convert osrm-v1.js to typescript
- Convert mapbox.js to Typescript
- Convert line.js to Typescript
- Convert plan.js to Typescript
- Convert formatter.js to Typescript
- Convert Itinerary to Typescript
- Convert control.js to Typescript
- Convert index.js to Typescript
- Improve request promise handling
- Make package.json bundle Typescript files
- Clean up remaining function calls
- Remove maintenance and osrm demo notice
- Decouple itinerary from leaflet control
- Add types to event hub
- Use custom esbuild script for bundling files
- Decouple itinerary from leaflet control
- Use custom esbuild script for bundling files
- Add more bundling options and add webpack example for testing
- Convert package-lock.json to v2
- Re-export all routing properties
- Remove dist files for example projects as well
- Add GitHub Action for deploying typedoc to pages
- Make most methods public
- Generate typings on build
- Add type and module fields to package.json
- Change build folder back to dist
- Use npm advised beta tag with dot notation
- Add option for clearing waypoint name on dragend
- Add git-cliff for changelog generation (#685)
- Add option to display message when no route was found
- Allow using custom autocomplete for geocoding
- Add routesfound event logic
- Change package name for publish experiments

### Miscellaneous Tasks

- Update browserify to version 14.0.0
- Update browserify-shim to version 3.8.13
- Update browserify to version 14.1.0
- Update uglify-js to version 2.8.2
- Remove now unused files
- Update copyright date
- Bump dependencies
- Bump dependencies
- Remove unnecessary files
- Update dependencies
- Bump package version

### Styling

- Rename plan to options for geocoder element creation

### Testing

- Migrate and fix tests to jest

### Build

- Add workflow for regular build

### Deps

- Bump example leaflet version
- Bump esbuild 0.12.22 to 0.13.8
- Bump @googlemaps/polyline-codec 1.0.1 to 1.0.6
- Bump typescript 4.4.2 to 4.4.4
- Bump eslint 7.32.0 to 8.0.1
- Bump @types/leaflet 1.7.4 to 1.7.5
- Bump esbuild 0.12.22 to 0.13.8
- Bump @googlemaps/polyline-codec 1.0.1 to 1.0.6
- Bump typescript 4.4.2 to 4.4.4
- Bump eslint 7.32.0 to 8.0.1
- Bump @types/leaflet 1.7.4 to 1.7.5
- Bump package dependencies
- Bump @googlemaps/polyline-codec to latest
- Bump typescript to latest
- Bump typedoc + plugins
- Bump esbuild + plugins
- Bump jest and ts-jest
- Bump eslint + plugins
- Bump types

### Lint

- Add eslint and format code
- Fix indentation of switch statements
- Fix empty constructor, necessary for leaflet overrides

### Misc

- Add .idea to .gitignore in case people use Jetbrains

## [3.2.5] - 2017-01-09

### Miscellaneous Tasks

- Update dependencies
- Update browserify to version 13.1.1
- [**breaking**] Drop support for Node.js 0.10
- Update uglify-js to version 2.7.5
- Update derequire to version 2.0.6
- Update browserify to version 13.3.0

### WIP

- Add option for custom osrm stepToText

## [3.1.0] - 2016-08-09

### Bug Fixes

- Prevent race condition between routing requests by ignoring all but the latest.
- Dragging waypoints work even when no geocoder is specified.
- Blur input when autocomplete result is clicked
- Geocoder focus management
- Don't calculate waypoint indices until they're actually required
- Fix geocoder text selection for iOS
- Fix geocoder text selection for IE8
- Options "addWaypoints" and "draggableWaypoints" can be disabled
- Address route not always updating while dragging; replace timestamping with request count to avoid race among requests
- Fire waypointdragend *after* the waypoint has been updated
- Make sure options are always initialized
- Copy waypoints to avoid possible asynchronous modification during request.
- Direction type for case 8 should be SlightLeft
- Set package.json's main properly
- Support roundabout instructions without numbered exit
- Geocoder results above other elements in Firefox; minor styling changes
- Position geocoder's result container correctly even when page is scrolled
- Remove waypoint icon doesn't interfere with field border
- Removing first waypoint with only two waypoints shouldn't re-arrange waypoints
- Make sure waypoint options exist before checking them.
- Separate normal browserify builds and dist builds.
- Delete last waypoint works
- Don't store geocoder elements in reverse order
- Put L.LatLng instances in coordinates, not arrays.
- Ensure latLng property is actually an L.LatLng instance
- Remove instruction marker when route is changed.
- Add localization for geocoder placeholders.
- Fire geocoding events
- Fire events and update markers with complete waypoints array

### Features

- Add option autoRoute (default true)
- Add request timeout option and error
- Support route preview while dragging the marker
- Add mode to handle unroutable parts
- Add div around geocoder inputs with external setup
- Make it possible to format step instructions yourself
- Add icons for corresponding turn instruction
- Display coordinates in geocoder field if no name was found
- Add fitSelectedRoute mode 'smart' (now default)
- Add default remove waypoint button
- Add initial support for localization
- Move waypoints to own class to add options
- Add class name option for add button
- Add function to download routing as gpx
- [**breaking**] Replace marker icon options with createMarker function
- Add support for uturns at markers.
- Add GraphHopper support
- Allow createMarker to return falsy value when no marker is needed.
- Allow summaryTemplate to be a function or a template string
- Allow styling of itinerary table through column classes
- Initial mobile (small screen) support
- Reverse waypoints button
- Capitalize parts of route name; filter out empty parts
- Introduce separate option for total distance rounding sensitivity.

### Fix

- Incorrect roundabout exit order localization
- Return clamped waypoint indices.

### Miscellaneous Tasks

- Switch build system to use Grunt/Browserify
- Setup grunt-semantic-release
- Use grunt-gh-pages
- Fix do-release task
- Configure release tasks
- Update geocoder lib
- [**breaking**] Remove unused option "geocoderClass", that is no longer meaningful since option "createGeocoder" was introduced.
- Updated dist
- Add info on lrm-mapbox
- Replace jsonp and polyline decode with corslite and polyline libs
- Removed GraphHopper router from core plugin, now exists as lrm-graphhopper (https://github.com/perliedman/lrm-graphhopper)
- Update list of supported backends
- Updated as 2.0.0 build
- V2.0.1
- 2.1.0
- 2.1.1
- 2.2.1
- Update dist files used by project site to latest when publishing
- 2.2.2
- 2.2.3
- 2.2.4
- 2.3.0
- Remove duplicate info from main site, and make link to site more obvious
- 2.4.0

### Refactor

- Break out itineraryBuilder to separate class
- Rename variable to fit description better
- Make geocoder insertion not depend on exact dom layout
- Re-create geocoder inputs on update
- Split out geocoder UI logic to L.Routing.GeocoderElement

### I18n

- Add german localization.
- Add swedish localization
- Add dutch localization

<!-- generated by git-cliff -->

/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  'POST /professional' : { controller: 'ProfessionalController', action: 'create' },
  'POST /user/:propertyId' : { controller: 'UserController', action: 'create' },
  'POST /updateUser' : { controller: 'UserController', action: 'update' },
  'POST /auth_professional' : { controller: 'AuthController', action: 'authProfessional' },
  'POST /event' : { controller: 'EventController', action: 'createEvent' },
  'POST /updateEvent' : { controller: 'EventController', action: 'updateEvent' },
  'POST /deleteEvent' : { controller: 'EventController', action: 'deleteEvent' },
  'POST /services' : { controller: 'ServiceController', action: 'create' },
  'POST /propertyHasServices' : { controller: 'ServiceController', action: 'createPropertyHasService' },
  'POST /updatePropertyHasServices' : { controller: 'ServiceController', action: 'updatePropertyHasService' },
  'POST /checkAvailabilityStart' : { controller: 'EventController', action: 'checkAvailabilityStart' },
  'POST /checkAvailabilityEnds' : { controller: 'EventController', action: 'checkAvailabilityEnds' },

  'GET /propertiesProfessional' : { controller: 'PropertyController', action: 'getProperties' },
  'GET /events/:professionalId/:propertyId' : { controller: 'EventController', action: 'getEventsByProperty' },
  'GET /professionals/:propertyId' : { controller: 'ProfessionalController', action: 'getProfessionalsByProperty' },
  'GET /professional/:id' : { controller: 'ProfessionalController', action: 'getProfessional' },
  'GET /workdays/:propertyId' : { controller: 'PropertyController', action: 'getWorkDays' },
  'GET /servicesProfessional/:professionalId' : { controller: 'ServiceController', action: 'getServicesByProfessional' },
  'GET /usersProperty/:propertyId' : { controller: 'UserController', action: 'getUsersByProperty' },
  'GET /event/:eventId' : { controller: 'EventController', action: 'getEvent' },
  'GET /propertyHasServices/:propertyId' : { controller: 'ServiceController', action: 'getServicesByProperty' },
  'GET /services' : { controller: 'ServiceController', action: 'getAllServices' },
  'GET /professions' : { controller: 'ProfessionController', action: 'getProfessions' },
  'GET /onePropertyHasServices/:id' : { controller: 'ServiceController', action: 'getOnePropertyHasService' },
  'GET /professionalHasServices/:id' : { controller: 'ServiceController', action: 'getProfessionalHasService' },

  'DELETE /deletePropertyHasServices/:id' : { controller: 'ServiceController', action: 'deletePropertyHasService' },
  'DELETE /deleteClient/:id' : { controller: 'UserController', action: 'deleteClient' },



  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};

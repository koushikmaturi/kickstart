// Thhe require statement is importing a function
// That's why we are putting extra ()/ This will directly
// invoke the function
const routes = require("next-routes")();

// Creating variable routing for campaign pages
// :address represents the campaign address which
// gets saved in address and can be used in the
// show component
routes
  .add('/campaigns/new','campaigns/new')
  .add('/campaigns/:address','/campaigns/show')
  .add('/campaigns/:address/requests','/campaigns/requests/index')
  .add('/campaigns/:address/requests/new','/campaigns/requests/new');
// exports some helpers to help us route
module.exports = routes;

// To use dynamic routing, we Need
// to create a server file that
// will manually tell the NEXT
// application to use route.js
// for routing purpose

'use strict';

var _ = require('lodash');

/**
 * Author.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = _.merge(_.cloneDeep(require('../base/Model')), {
  attributes: {
    // Name of the contact
    firstName: {
      type: 'string',
      required: true
    },
    // Contact lastName
    lastName: {
      type: 'text'
    },
    // Contact lastName
    gender: {
      type: 'text'
    },
    // Contact lastName
    address: {
      type: 'text'
    },
    // Contact lastName
    city: {
      type: 'text',
      required: true
    },
    // Contact lastName
    state: {
      type: 'object'
    },
    // Contact lastName
    email: {
      type: 'text',
      required: true
    },
    // Contact lastName
    phoneNumber: {
      type: 'text'
    }
  }
});

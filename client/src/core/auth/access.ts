import { buildRoles, buildAccessLevels } from './AuthHelpers';

/*
  List all the roles you wish to use in the app
  You have a max of 31 before the bit shift pushes the accompanying integer out of
  the memory footprint for an integer
 */
const roles = [
  'banned',
  'public',
  'user',
  'admin'
];

/*
  Build out all the access levels you want referencing the roles listed above
  You can use the "*" symbol to represent access to all roles.
  The left-hand side specifies the name of the access level, and the right-hand side
  specifies what user roles have access to that access level. E.g. users with user role
  'user' and 'admin' have access to the access level 'user'.
 */
const levels = {
  'public': '*',
  'anon': ['public'],
  'user': ['user', 'admin'],
  'admin': ['admin']
};

export const userRoles = buildRoles(roles);
export const accessLevels = buildAccessLevels(levels, userRoles);

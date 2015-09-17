import * as _ from 'lodash';

export function checkAccess(requiredLevel:any, currentLevel:any) {
  return !!(requiredLevel.bitMask & currentLevel.bitMask);
}

export function accessEquals(requiredLevel:any, currentLevel:any) {
  return requiredLevel.bitMask === currentLevel.bitMask;
}

export class NotAuthorizedException {
  redirectTo:string;
  constructor(to = '/login') {
    this.redirectTo = to;
  }
}

export class AccessDeniedException {
  redirectTo:string;
  constructor(to = '/403') {
    this.redirectTo = to;
  }
}

/*
 Method to build a distinct bit mask for each role
 It starts off with "1" and shifts the bit to the left for each element in the
 roles array parameter
 */
export function buildRoles(roles:any):any {
  let bitMask:string = '01';

  if (roles.length > 31) {
    console.log(
      'You have too many roles!' +
      'Max=31 before the bit shift pushes the accompanying integer out of the memory footprint for an integer'
    );
  }

  // dbg
  const userRoles = _.reduce(roles, (result, role) => {
    const intCode:number = parseInt(bitMask, 2);
    result[role] = {
      bitMask: intCode,
      title: role
    };
    bitMask = (intCode << 1 ).toString(2);
    return result;
  }, {});

  return userRoles;
}

/*
 This method builds access level bit masks based on the accessLevelDeclaration parameter which must
 contain an array for each access level containing the allowed user roles.
 */
export function buildAccessLevels(accessLevelDeclarations:any, userRoles:any):any {

  /*
    Zero step - transform
    { level1Name: level1, level2Name: level2 } object
     =>
    [ { name: level1Name, level: level1 }, { name: level2Name, level: level2 } ] array
   */
  const declarationsArr = _.map(accessLevelDeclarations, (level, name) => ({ name, level }));

  /*
    First step: filter access levels like:
     'public': '*',
    That means every user role enabled, so bitMask => sum of all bit masks
   */
  let accessLevels = _
      .filter(declarationsArr, ({ level }) => typeof level === 'string') // eslint-disable-line no-shadow
      .reduce((result, { level, name }) => { // eslint-disable-line no-shadow

        if (level !== '*') {
          console.log(
            level === '*',
            'Access Control Error: Could not parse "' + level + '" as access definition for level "' + name + '"'
          );
        }

        const resultBitMask = _.reduce(userRoles, (result) => result + '1', ''); // eslint-disable-line no-shadow

        result[name] = {
          bitMask: parseInt(resultBitMask, 2)
        };

        return result;
      }, {})
  ;

  /*
    Second step: filter access levels like:
     'user': ['user', 'admin'],
    That means we need to iterate on ['user', 'admin'] array and summ bit mask for 'user' and 'admin'
   */
  accessLevels = _
    .filter(declarationsArr, ({ level }) => typeof level !== 'string') // eslint-disable-line no-shadow
    .reduce((result, { level, name }) => { // eslint-disable-line no-shadow
      const levelName = name;
      const levelsArr = level;
      const resultBitMask = _.reduce((<any>levelsArr), (resultBitMask:number, roleName:string) => { // eslint-disable-line no-shadow

        if (userRoles.hasOwnProperty(roleName) !== true) {
          console.log(
            'Access Control Error: Could not find role "' + roleName + '" in registered roles while building access for "' + levelName + '"'
          );
        }

        return resultBitMask | userRoles[roleName].bitMask;
      }, 0);


      result[name] = {
        bitMask: resultBitMask
      };
      return result;
    }, accessLevels)
  ;
  return accessLevels;
}

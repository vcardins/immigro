export class AuthFilterValueConverter  {

    constructor() {
      //console.log('ops')
    }

    toView(routes, accessLevel){
      if (!accessLevel) { return true;}
      return routes.filter(r => r.config.access.bitMask & accessLevel.bitMask);
    }
}

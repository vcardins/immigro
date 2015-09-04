import {Router} from "aurelia-router"
import { userRoles, accessLevels } from 'core/Auth';

export class Admin{

  public router: Router;
  configureRouter(config: any, router:Router){
    config.map([
      { route: ['','dashboard'], name: 'admin-dashboard',    moduleId: './dashboard', nav: true, title:'Dashboard', access: accessLevels.admin },
      { route: 'roles',         name: 'admin-roles',       moduleId: './roles',       nav: true, title:'Roles', access: accessLevels.admin },
      { route: 'users',   name: 'admin-users', moduleId: './users',         nav: true, title:'Users', access: accessLevels.admin }
    ]);
    this.router = router;
  }
}

import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DataProvider, AuthService } from 'core/Services';
import { DataModel, AccessLevel, UserProfile } from 'core/Models';

@autoinject
export class UserService extends DataModel<UserProfile>{

    constructor(private authService: AuthService, dataProvider: DataProvider, public ea:EventAggregator) {
        super(dataProvider, ea, 'user');
    }

    getProfile():Promise<any> {
      let user = this.authService.user;
      return this.find(user.id).then(user => {
          return new UserProfile(user);
      });
      // return new Promise<any>((resolve) => {
      //     resolve(new UserProfile(user));
      // });
    }

    updateProfile(data:any):Promise<void> {
        return null;
    }

}

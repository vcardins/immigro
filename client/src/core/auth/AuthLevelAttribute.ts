import { inject, customAttribute } from 'aurelia-framework';
import { AuthService } from 'core/Services';

@customAttribute('auth-level')
@inject(Element, AuthService)
/**
 *
 */
export class AccessLevel {

  /**
   * [constructor description]
   * @param  {[type]}      privateelement     [description]
   * @param  {AuthService} privateauthService [description]
   * @return {[type]}                         [description]
   */
  constructor(private element, private authService:AuthService) {}

  valueChanged(newValue){
    let isAuthorized = this.authService.isAuthorized(newValue);
    if (isAuthorized) {
      this.element.classList.remove('aurelia-hide');
    } else {
      this.element.classList.add('aurelia-hide');
    }
  }
}

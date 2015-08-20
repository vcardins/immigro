export class UserProfile {
  
  username = '';
  firstName = '';
  lastName = '';
  email = '';
    
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }
  
}
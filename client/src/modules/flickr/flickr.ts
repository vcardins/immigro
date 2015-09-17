import {bindable, autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@autoinject
export class Flickr{

  public images:any[];
  ENTER:number  = 13;
  @bindable prop = 'soccer';

  get url() {
    return `http://api.flickr.com/services/feeds/photos_public.gne?tags=${this.prop}&tagmode=any&format=json`;
  }

  constructor(public http: HttpClient){
    this.http = http;
  }

  activate(){
    
    try {
      let jsonp:any = this.http.jsonp(this.url).then((response) => {
        this.images = response.content.items;
      }, (error) => {
        console.log(error);
      });
      return jsonp;
    }catch (e) {
      console.log(e);
    }

  }

  search(e:KeyboardEvent) {
    if ((e.type =='keydown' && e.keyCode == this.ENTER) || e.type =='click') {
      this.activate();
    }
    return true;
  }

}


export class FileSizeValueConverter {

  toView(bytes:number, precision:number = 1) {

    let s = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
    if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) ) {
      return '?';
    }
    let e = Math.floor(Math.log(bytes)/Math.log(1024));
    return (bytes/Math.pow(1024, Math.floor(e))).toFixed(precision)+" "+s[e];
    
  }

}

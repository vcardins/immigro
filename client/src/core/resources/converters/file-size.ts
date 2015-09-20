
export class FileSizeValueConverter {

  toView(bytes:number, precision:number = 1) {
    let units = [
      'bytes',
      'KB',
      'MB',
      'GB',
      'TB',
      'PB'
    ];

    if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) ) {
      return '?';
    }

    let unit = 0;

    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }
    let result = bytes.toFixed( + precision ) + ' ' + units[ unit ];
    return result;
  }

}

import { autoinject, customElement, bindable } from 'aurelia-framework';

@autoinject
@customElement('attachments')
export class Attachments {
  @bindable multiple:boolean;
  @bindable files:Array<any>;
  @bindable maxFileSize:number;
  @bindable totalFilesSize:number;

  @bindable attachLabel:string = null;
  @bindable uploadLabel:string = null;
  @bindable uploader:any;

  const MAX_FILE_SIZE = 10;
  const TOTAL_FILES_SIZE = 1000000;
  const MB = 1024 * 1024;
  private filesSize = 0;
  private randomId:string;
  private error:string;

  constructor(private element:Element){
    this.randomId = (Math.random() * 1000).toFixed(3).replace('.','-');
  }

  attached() {
    this.maxFileSize = parseFloat(this.maxFileSize || MAX_FILE_SIZE) * this.MB;
    this.totalFilesSize = parseFloat(this.totalFilesSize || TOTAL_FILES_SIZE) * this.MB;
    this.files = [];
    let filesUpload = this.element.querySelector('input[type="file"]');
    if (this.multiple) {
      filesUpload.setAttribute('multiple', 'multiple');
    }
  }

  handleFileSelect(evt:any):void {
    let files:Array<any> = evt.target.files;
    if (files.length == 0) { return; }
    let unallowedFiles:Array<any> = [];
    let error:string = '';

    for (let i:number = 0, f:any; f = files[i]; i++) {
        let exists = !!this.files.filter((file) => { return file.name == f.name; })[0];
        if (exists) { continue; }
        if ( f.size > this.maxFileSize ) {
            unallowedFiles.push(f.name);
            f = undefined;
        }else{
          this.files.push(f);
        }
    }
    if (unallowedFiles[0]) {
      this.error = 'File size can\'t exceed ' + this.maxFileSize + ' MB ('+ unallowedFiles.join(', ') + ')';
    }
  }

  removeFile(file:any):void {
      file.isDeleted = true;
      this.error = '';
      let index = this.files.indexOf(file);
      if (index== -1) { return; }
      this.files.splice(index, 1);
  }

  getIcon(file:any) {
      return file.type.match('image') ? 'image': 'file';
  }

}

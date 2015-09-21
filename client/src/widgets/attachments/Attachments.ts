import { autoinject, customElement, bindable } from 'aurelia-framework';

// hasClass: does an element have the css class?
function hasClass(el, name) {
    return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(el.className);
}

// addClass: add the css class for the element.
function addClass(el, name) {
    if (!hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
}

// removeClass: remove the css class from the element.
function removeClass(el, name) {
    if (hasClass(el, name)) {
      var c = el.className;
      el.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), " ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
}

// prettySize: convert bytes to a more readable string.
function prettySize(bytes:number, precision:number = 1) {
    let s = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
    let e = Math.floor(Math.log(bytes)/Math.log(1024));
    return (bytes/Math.pow(1024, Math.floor(e))).toFixed(precision)+" "+s[e];
}

// getGroupID: generate a unique int ID for groups.
 var getGroupID = (function(id) {
     return function() {
         return id++;
     };
 })(0);

 // getUniqueID: generate a unique int ID for files
 var getUniqueID = (function(id) {
     return function() {
         return id++;
     };
 })(0);

@autoinject
@customElement('attachments')
/**
 * http://www.html5rocks.com/en/tutorials/file/dndfiles/
 * https://raw.githubusercontent.com/bgrins/filereader.js/master/filereader.js
 * http://www.petermorlion.com/file-upload-with-aurelia/
 */
export class Attachments {
  /**
   * Set whether it allows multiple files selection
   * @type {boolean}
   */
  @bindable multiple:boolean = false;
  /**
   * Set whether it allows drag n' drop capability
   * @type {boolean}
   */
  @bindable dragDrop:boolean = false;
  /**
   * [files description]
   * @type {Array<any>}
   */
  @bindable files:Array<any> = [];
  /**
   * [maxFileSize description]
   * @type {number}
   */
  @bindable maxFileSize:number = 1;
  /**
   * [totalFilesSize description]
   * @type {number}
   */
  @bindable totalFilesSize:number = 100;

  @bindable attachLabel:string = null;
  /**
   * [uploadLabel description]
   * @type {string}
   */
  @bindable uploadLabel:string = null;
  /**
   * [uploader description]
   * @type {any}
   */
  @bindable uploader:any;

  const MAX_FILE_SIZE = 10;
  const TOTAL_FILES_SIZE = 1000000;
  const MB = 1024 * 1024;
  private filesSize = 0;
  private randomId:string;
  private error:string;
  private dropZone:string = 'dropZone';
  private dropbox:Element;
  private dragClass:string = 'drag';

  constructor(private element:Element){
    this.randomId = (Math.random() * 1000).toFixed(3).replace('.','-');
  }

  /**
   * [attached description]
   * @return {[type]} [description]
   */
  attached() {
    this.maxFileSize = parseFloat(this.maxFileSize || MAX_FILE_SIZE) * MB;
    this.totalFilesSize = parseFloat(this.totalFilesSize || TOTAL_FILES_SIZE) * MB;
    this.files = [];
    let filesUpload = this.element.querySelector('input[type="file"]');
    if (this.multiple) {
      filesUpload.setAttribute('multiple', 'multiple');
    }

    filesUpload.addEventListener('change', this.handleFileSelect.bind(this), false);

    if (this.dragDrop) {
      // Setup the dnd listeners.
      this.dropbox = document.getElementById(this.dropZone);
      this.dropbox.addEventListener('dragover', this.handleDragOver.bind(this), false);
      this.dropbox.addEventListener('drop', this.handleDrop.bind(this), false);
      this.dropbox.addEventListener('dragenter', this.handleDragEnter.bind(this), false);
      this.dropbox.addEventListener('dragleave', this.handleDragLeave.bind(this), false);
    }
  }

  /**
   * [clearError description]
   */
  clearError():void {
    this.error = undefined;
  }

  /**
   * [handleDragEnter description]
   * @param {[type]} e [description]
   */
  handleDragEnter(e):void {
    e.stopPropagation();
    e.preventDefault();
    this.clearError();
    if (this.dragClass) {
      addClass(this.dropbox, this.dragClass);
    }
  }

  /**
   * [handleDragLeave description]
   * @param {[type]} e [description]
   */
  handleDragLeave(e):void {
    if (this.dragClass) {
      removeClass(this.dropbox, this.dragClass);
    }
  }

  /**
   * [handleDragOver description]
   * @param {[type]} e [description]
   */
  handleDragOver(e):void {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    if (this.dragClass) {
        addClass(this.dropbox, this.dragClass);
    }
  }

  /**
   * [handleDrop description]
   * @param {any} e [description]
   */
  handleDrop(e:any):void {
    e.stopPropagation();
    e.preventDefault();
    if (this.dragClass) {
        removeClass(this.dropbox, this.dragClass);
    }
    this.processFiles(e.dataTransfer.files);
  }

  /**
   * [handleFileSelect description]
   * @param {any} e [description]
   */
  handleFileSelect(e:any):void {
    e.stopPropagation();
    e.preventDefault();
    this.processFiles(e.target.files);
  }

 /**
 * setupCustomFileProperties: modify the file object with extra properties
 * @param {[type]} files   [description]
 * @param {[type]} groupID [description]
 */
 private setupCustomFileProperties(files, groupID):void {
     for (var i = 0; i < files.length; i++) {
         var file = files[i];
         file.extra = {
             nameNoExtension: file.name.substring(0, file.name.lastIndexOf('.')),
             extension: file.name.substring(file.name.lastIndexOf('.') + 1),
             fileID: i,
             uniqueID: getUniqueID(),
             groupID: groupID,
             prettySize: prettySize(file.size)
         };
     }
 }

 /**
  * [processFiles description]
  * @param {Array<File>} files [description]
  */
 processFiles(files:Array<File>):void {

    if (!files || !files.length) { return; }

    this.files = this.files || [];

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

  /**
   * [removeFile description]
   * @param {any} file [description]
   */
  removeFile(file:any):void {
      file.isDeleted = true;
      this.clearError();
      let index = this.files.indexOf(file);
      if (index== -1) { return; }
      this.files.splice(index, 1);
  }

  /**
   * [getIcon description]
   * @param  {File}   file [description]
   * @return {string}      [description]
   */
  getIcon(file:File):string {
      return file.type.match('image') ? 'image': 'file';
  }

}

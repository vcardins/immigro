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

@autoinject
@customElement('attachments')
/**
 * http://www.html5rocks.com/en/tutorials/file/dndfiles/
 * https://raw.githubusercontent.com/bgrins/filereader.js/master/filereader.js
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
  @bindable files:Array<any> = [];
  @bindable maxFileSize:number = 1;
  @bindable totalFilesSize:number = 100;

  @bindable attachLabel:string = null;
  @bindable uploadLabel:string = null;
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

  clearError() {
    this.error = undefined;
  }

  handleDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    this.clearError();
    if (this.dragClass) {
      addClass(this.dropbox, this.dragClass);
    }
  }

  handleDragLeave(e) {
    if (this.dragClass) {
      removeClass(this.dropbox, this.dragClass);
    }
  }

  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    if (this.dragClass) {
        addClass(this.dropbox, this.dragClass);
    }
  }

  handleDrop(e:any):void {
    e.stopPropagation();
    e.preventDefault();
    if (this.dragClass) {
        removeClass(this.dropbox, this.dragClass);
    }
    this.processFiles(e.dataTransfer.files);
  }

  handleFileSelect(e:any):void {
    e.stopPropagation();
    e.preventDefault();
    this.processFiles(e.target.files);
  }

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

  removeFile(file:any):void {
      file.isDeleted = true;
      this.clearError();
      let index = this.files.indexOf(file);
      if (index== -1) { return; }
      this.files.splice(index, 1);
  }

  getIcon(file:any) {
      return file.type.match('image') ? 'image': 'file';
  }

}

export class TakeValueConverter {
  toView(array:Array<any>, count:number) {
    return array.slice(0, count);
  }
}

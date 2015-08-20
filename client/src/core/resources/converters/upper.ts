export class UpperValueConverter {
  public toView(value){
    return value && value.toUpperCase();
  }
}
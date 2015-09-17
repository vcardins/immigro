import { abstract } from 'core/Helpers';

@abstract()
class Abstract {
  @abstract()
  get foo() {

  }

  @abstract()
  bar() { }
}

class Actual extends Abstract {
  get foo() {
    return 'foo';
  }

  bar() {
    return 'bar';
  }
}

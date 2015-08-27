export function abstract() {
  return (cls, prop, descriptor) => {
    if (prop === undefined) {
      return class Abstract extends cls {
        constructor(...args) {
          super(...args);

          if (this.constructor === Abstract) {
            throw new Error('Class is abstract, and should not be instansiated.');
          }
        }
      };
    }

    function abstract() {
      throw new Error(`Method "${prop}" is abstract, and should have been overridden in a subclass.`);
    }

    if (descriptor.value) {
      // this is a method
      descriptor.value = abstract;
    } else {
      // property (getter and/or setter)
      if (descriptor.get) {
        descriptor.get = abstract;
      }

      if (descriptor.set) {
        descriptor.set = abstract;
      }
    }
  };
}

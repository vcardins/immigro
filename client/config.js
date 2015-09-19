System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "es7.decorators",
      "es7.classProperties",
      "es7.asyncFunctions",
      "runtime"
    ]
  },
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "Mordred/aurelia-sails-socket-client": "github:Mordred/aurelia-sails-socket-client@0.6.0",
    "aurelia-animator-css": "github:aurelia/animator-css@0.16.0",
    "aurelia-binding": "github:aurelia/binding@0.9.0",
    "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.17.0",
    "aurelia-configuration": "github:vheissu/aurelia-configuration@1.0.3",
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.0",
    "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.8.0",
    "aurelia-fetch-client": "github:aurelia/fetch-client@0.1.2",
    "aurelia-flux": "github:tfrydrychewicz/aurelia-flux@0.1.6",
    "aurelia-framework": "github:aurelia/framework@0.16.0",
    "aurelia-history": "github:aurelia/history@0.7.0",
    "aurelia-history-browser": "github:aurelia/history-browser@0.8.0",
    "aurelia-http-client": "github:aurelia/http-client@0.11.0",
    "aurelia-loader": "github:aurelia/loader@0.9.0",
    "aurelia-loader-default": "github:aurelia/loader-default@0.10.0",
    "aurelia-logging": "github:aurelia/logging@0.7.0",
    "aurelia-metadata": "github:aurelia/metadata@0.8.0",
    "aurelia-path": "github:aurelia/path@0.9.0",
    "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.7.0",
    "aurelia-router": "github:aurelia/router@0.12.0",
    "aurelia-sails-socket-client": "github:Mordred/aurelia-sails-socket-client@0.6.0",
    "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
    "aurelia-templating": "github:aurelia/templating@0.15.1",
    "aurelia-templating-binding": "github:aurelia/templating-binding@0.15.0",
    "aurelia-templating-resources": "github:aurelia/templating-resources@0.15.0",
    "aurelia-templating-router": "github:aurelia/templating-router@0.16.1",
    "aurelia-validation": "github:aurelia/validation@0.2.8",
    "aurelia/framework": "github:aurelia/framework@0.15.0",
    "aurelia/validation": "github:aurelia/validation@0.2.8",
    "authFilter": "auth/authFilter",
    "babel": "npm:babel-core@5.8.23",
    "babel-runtime": "npm:babel-runtime@5.8.20",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "commonmark": "npm:commonmark@0.21.0",
    "core-js": "npm:core-js@1.1.4",
    "css": "github:systemjs/plugin-css@0.1.13",
    "fetch": "github:github/fetch@0.9.0",
    "font-awesome": "npm:font-awesome@4.4.0",
    "google-maps-api": "npm:google-maps-api@1.0.2",
    "jquery": "github:components/jquery@2.1.4",
    "lodash": "npm:lodash@3.10.1",
    "moment": "github:moment/moment@2.10.6",
    "nprogress": "github:rstacruz/nprogress@0.2.0",
    "numeral": "npm:numeral@1.5.3",
    "sails.io.js": "github:balderdashy/sails.io.js@0.11.6",
    "smajl/bootstrap": "github:smajl/bootstrap@master",
    "socket.io-client": "github:socketio/socket.io-client@1.3.6",
    "toastr": "github:CodeSeven/toastr@2.1.2",
    "github:Mordred/aurelia-sails-socket-client@0.6.0": {
      "aurelia-path": "github:aurelia/path@0.8.1",
      "core-js": "github:zloirock/core-js@1.1.4",
      "sails.io.js": "github:balderdashy/sails.io.js@0.11.6"
    },
    "github:aurelia/animator-css@0.16.0": {
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-templating": "github:aurelia/templating@0.15.1"
    },
    "github:aurelia/binding@0.8.6": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.2",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/binding@0.9.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/bootstrapper@0.17.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.8.0",
      "aurelia-framework": "github:aurelia/framework@0.16.0",
      "aurelia-history": "github:aurelia/history@0.7.0",
      "aurelia-history-browser": "github:aurelia/history-browser@0.8.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.10.0",
      "aurelia-logging-console": "github:aurelia/logging-console@0.7.1",
      "aurelia-router": "github:aurelia/router@0.12.0",
      "aurelia-templating": "github:aurelia/templating@0.15.1",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.15.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.15.0",
      "aurelia-templating-router": "github:aurelia/templating-router@0.16.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/dependency-injection@0.10.0": {
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/dependency-injection@0.9.2": {
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/event-aggregator@0.6.2": {
      "aurelia-logging": "github:aurelia/logging@0.6.4"
    },
    "github:aurelia/event-aggregator@0.7.0": {
      "aurelia-logging": "github:aurelia/logging@0.6.4"
    },
    "github:aurelia/event-aggregator@0.8.0": {
      "aurelia-logging": "github:aurelia/logging@0.7.0"
    },
    "github:aurelia/fetch-client@0.1.2": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/framework@0.15.0": {
      "aurelia-binding": "github:aurelia/binding@0.8.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-loader": "github:aurelia/loader@0.8.7",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.2",
      "aurelia-templating": "github:aurelia/templating@0.14.4",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/framework@0.16.0": {
      "aurelia-binding": "github:aurelia/binding@0.9.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.0",
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "aurelia-templating": "github:aurelia/templating@0.15.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/history-browser@0.8.0": {
      "aurelia-history": "github:aurelia/history@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/http-client@0.10.3": {
      "aurelia-path": "github:aurelia/path@0.8.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/http-client@0.11.0": {
      "aurelia-path": "github:aurelia/path@0.9.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/loader-default@0.10.0": {
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0"
    },
    "github:aurelia/loader@0.8.7": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "core-js": "npm:core-js@0.9.18",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.6.3"
    },
    "github:aurelia/loader@0.9.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.3.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/logging-console@0.7.1": {
      "aurelia-logging": "github:aurelia/logging@0.7.0"
    },
    "github:aurelia/metadata@0.7.3": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/metadata@0.8.0": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/route-recognizer@0.6.2": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/route-recognizer@0.7.0": {
      "aurelia-path": "github:aurelia/path@0.9.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/router@0.10.4": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.6.2",
      "aurelia-history": "github:aurelia/history@0.6.1",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.6.2",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/router@0.12.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.0",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.8.0",
      "aurelia-history": "github:aurelia/history@0.7.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating-binding@0.15.0": {
      "aurelia-binding": "github:aurelia/binding@0.9.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-templating": "github:aurelia/templating@0.15.1"
    },
    "github:aurelia/templating-resources@0.15.0": {
      "aurelia-binding": "github:aurelia/binding@0.9.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.0",
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "aurelia-templating": "github:aurelia/templating@0.15.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating-router@0.16.1": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-router": "github:aurelia/router@0.12.0",
      "aurelia-templating": "github:aurelia/templating@0.15.1"
    },
    "github:aurelia/templating@0.13.16": {
      "aurelia-binding": "github:aurelia/binding@0.8.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-loader": "github:aurelia/loader@0.8.7",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.2",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating@0.14.4": {
      "aurelia-binding": "github:aurelia/binding@0.8.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-loader": "github:aurelia/loader@0.8.7",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.2",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating@0.15.1": {
      "aurelia-binding": "github:aurelia/binding@0.9.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.0",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.3.0",
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/validation@0.2.8": {
      "aurelia-binding": "github:aurelia/binding@0.8.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-templating": "github:aurelia/templating@0.14.4"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.4.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-punycode@0.1.0": {
      "punycode": "npm:punycode@1.3.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:rstacruz/nprogress@0.2.0": {
      "css": "github:systemjs/plugin-css@0.1.13"
    },
    "github:smajl/bootstrap@master": {
      "css": "github:systemjs/plugin-css@0.1.13",
      "jquery": "github:components/jquery@2.1.4"
    },
    "github:tfrydrychewicz/aurelia-flux@0.1.6": {
      "aurelia-binding": "github:aurelia/binding@0.8.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-router": "github:aurelia/router@0.10.4",
      "aurelia-templating": "github:aurelia/templating@0.13.16",
      "bluebird": "npm:bluebird@2.9.34",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:twbs/bootstrap@3.3.5": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "github:vheissu/aurelia-configuration@1.0.3": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.7.0",
      "aurelia-http-client": "github:aurelia/http-client@0.10.3",
      "core-js": "npm:core-js@0.9.18"
    },
    "npm:asap@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:babel-runtime@5.8.20": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:bluebird@2.9.34": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:buffer@3.4.2": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:commonmark@0.21.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "entities": "npm:entities@1.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "mdurl": "npm:mdurl@1.0.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "punycode": "github:jspm/nodelibs-punycode@0.1.0",
      "string.prototype.repeat": "npm:string.prototype.repeat@0.2.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-js@1.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:entities@1.1.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.13"
    },
    "npm:google-maps-api@1.0.2": {
      "latlng": "npm:latlng@1.0.0",
      "promise": "npm:promise@6.1.0",
      "scriptjs": "npm:scriptjs@2.5.7"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:numeral@1.5.3": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:promise@6.1.0": {
      "asap": "npm:asap@1.0.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:scriptjs@2.5.7": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

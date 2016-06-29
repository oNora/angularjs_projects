declare var app: {
  environment: string;
};

interface WebpackRequire{
  (id: string): any;
  context(dir: string, useSubdirs: boolean, patern: RegExp):any;
}

//declare function require(id: string): any;
declare var require: WebpackRequire;

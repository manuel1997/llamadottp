// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//ng serve --proxy-config proxy.conf.json
//http://localhost:4200/?IDT=89ef33d7-2e82-46e2-94c6-170a321d1d54&IDU=79948840-k


export const environment = {
  production: false,
  empresasJson: './assets/empresas.json',
  //apiUrl:"https://apitolweb.totalpack.cl",
  apiUrl: "api",
  apiHub: "https://apitolweb.totalpack.cl",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

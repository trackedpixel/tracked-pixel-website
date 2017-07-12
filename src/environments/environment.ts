// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8090',
  pusherAuthUri: 'http://localhost:8090/pusher/auth',
  // pusherAuthUri: 'http://api.trackedpixel.com/pusher/auth',
  // apiUrl: 'http://api.trackedpixel.com',
  authRedirectUri: 'http://localhost:4200/callback',
  pusherCluster: 'us2',
  pusherKey: '7ade6cf1b661c4fa8637'
};

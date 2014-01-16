fs-redirect-url [![Build Status](https://travis-ci.org/fs-eng/fs-redirect-url.png?branch=master)](https://travis-ci.org/fs-eng/fs-redirect-url)
===============

Middleware to save the current url in a cookie while the user creates an account to redirect them when they come back afterwards.

##Installation
```
npm install fs-redirect-url --save
```


##Usage
Set the fs_redirect_url cookie containing the current url before it hits auth middleware in app.js.
```js
  /* app.js */

  var fsRedirectUrl = require('fs-redirect-url');

  // call set function before it gets to auth middleware to set it
  app.useBefore("auth", fsRedirectUrl.set());

  // call unset function after it gets to auth middleware
  app.useAfter("auth", fsRedirectUrl.unset());

```

If you are just redirecting (like on the homepage) only use the unset function
```js
  /* app.js */

  var fsRedirectUrl = require('fs-redirect-url');

  // this will read the fs_redirect_url cookie if (req.originalUrl !== fs_redirect_url) 
  // and redirect and then clear the cookie or it'll just clear the cookie
  app.useAfter("auth", fsRedirectUrl.unset());

```


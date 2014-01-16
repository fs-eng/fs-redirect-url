
/**
 * Module dependencies
 */

var debug = require('debug')('fs-redirect-url'),
    clc = require('cli-color');


exports.set = function() {
  return function fsSetRedirectUrl(req, res, next) {
    var base = (req.base) ? req.base : '';

    // if user isn't supposedly signed in (I'm not making a get session call, just checing for fssessionid in cookie.)
    if(!req.cookies.fssessionid && !req.cookies.fs_return_url){
      var returnUrl = encodeURIComponent(req.base + req.originalUrl);

      debug(clc.red.bold('returnUrl: ', returnUrl));

      // set fs_return_url cookie to the current url
      res.cookie('fs_return_url',returnUrl,cookieOpts(base));
    }

    next();
  }
};

exports.unset = function() {
  return function fsUnsetRedirectUrl(req, res, next) {
    var returnUrlFromCookie,
        currentReturnUrl = req.base+req.originalUrl,
        base = (req.base) ? req.base : '';

    // If fs_return_url cookie is set
    if(req.cookies.fs_return_url){
      returnUrlFromCookie = decodeURIComponent(req.cookies.fs_return_url);
    
      debug(clc.red.bold('returnUrlFromCookie: ', returnUrlFromCookie));
      debug(clc.red.bold('currentReturnUrl: ', currentReturnUrl));

    if(returnUrlFromCookie !== currentReturnUrl){
      // if the url in the cookie is different from the current url, redirect to the url in the cookie and then clear it.
      res.clearCookie('fs_return_url', {domain: setDomain(base)});
      res.redirect(returnUrlFromCookie);
    } else {
      // if the url in the cookie is the same as the current url, just clear the cookie
      res.clearCookie('fs_return_url', {domain: setDomain(base)});
    }
  }
    next();
  }
};


function setDomain(host) {
  return ~host.indexOf('familysearch.org') ? '.familysearch.org' : undefined;
}

function cookieOpts(base) {
  return {
    secure: ~base.indexOf("https://"),
    path: '/',
    domain: setDomain(base)
  }
}
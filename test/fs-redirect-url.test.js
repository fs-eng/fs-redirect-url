var expect = require('chai').expect
  , proxyApp = require('./app')
  , express = require('express')
  , request = require('supertest')
  , fsRedirectUrl = require('..');

var app = express();

app.use(express.cookieParser());
app.use(fsRedirectUrl.set());

app.get('/testing', function(req, res, next) {
  res.send('success');
});

describe("fs-redirect-url middleware", function() {
  describe("has a method called set", function() {

    it("that sets the fs_redirect_url cookie if fssessionid doesn't exist.", function() {
      
      request(app)
        .get('/testing')
        .end(function(err, res) {
          if(err) return done(err);
          if(res.ok){
            var cookie = res.header['set-cookie'][0];
            expect(cookie).to.contain('testing');
          }
        });

    });

    it("that doesn't set the fs_redirect_url cookie if fssessionid exists.", function() {
      
      request(app)
        .get('/testing')
        .set( 'Cookie', 'fssessionid=asdf' )
        .end(function(err, res) {
          if(err) return done(err);
          if(res.ok){
            var cookie = res.header['set-cookie'];
            expect(cookie).to.not.exist;
          }
        });

    });
  }); 

}); 

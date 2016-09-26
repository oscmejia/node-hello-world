
var assert = require('assert');
var clean = require('mongo-clean');
var request = require('request');

var chai = require('chai')
var expect = chai.expect;

var config = require('../src/config.json');
var packageInfo = require('../package.json');

var databaseUrl = config.mongoUrl;
var serverRootUrl = "http://localhost:" + config.port + "/" + config.apiRootPath;

// API Endpoints
var apiUrlRegister = serverRootUrl + "/register";
var apiUrlUser = serverRootUrl + "/user";

describe('Setup', function () {
    it('cleanup dev database', function (done) {
        clean(databaseUrl, function (err, db) {
            console.log("cleanup db", err);
            expect(err).to.not.exist
            done();
        })
    });
});

describe('Basic tests to root API endpoint', function () {
    it('Server has correct version and server name', function (done) {
        var opt = {
            url: serverRootUrl
        };

        request.get(opt, function (error, response, body) {
            var r = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(r.version).to.equal(packageInfo.version);
            expect(r.server).to.equal(config.serverName);            
            done();
        })
    });
});

describe('Register endpoint - should faile', function () {
    it('Empty Request should fail', function (done) {
        var opt = {
            url: apiUrlRegister
        };

        request.post(opt, function (error, response, body) {
            expect(response.statusCode).to.equal(400);
            expect(body).to.equal("Invalid request");
            done();
        })
    });

    it('Incomplete Request should fail (only first name)', function (done) {
        var data = {
            first_name: "Joe"
        };

        var opt = {
            url: apiUrlRegister,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        };

        request.post(opt,  function (error, response, body) {
            // console.log(body);
            expect(response.statusCode).to.equal(404);
            expect(body).to.equal('{"error":"users validation failed"}');
            done();
        })
    });

    it('Incomplete Request should fail (all but city)', function (done) {
        var data = {
            first_name: "Joe",
            last_name: "Doe",
            address_1: "101 Main st",
            address_2: "ste 1",
            zipcode: "91203",
            zipcode_plus4: "1000",
            state: "CA",
            country: "US"
        };

        var opt = {
            url: apiUrlRegister,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        };

        request.post(opt,  function (error, response, body) {
            expect(response.statusCode).to.equal(404);
            expect(body).to.equal('{"error":"users validation failed"}');
            done();
        })
    });

    it('Incomplete Request should fail (first name too short)', function (done) {
        var data = {
            first_name: "J",
            last_name: "Doe",
            address_1: "101 Main st",
            address_2: "ste 1",
            city: "Los ANgeles",
            zipcode: "91203",
            zipcode_plus4: "1000",
            state: "CA",
            country: "US"
        };

        var opt = {
            url: apiUrlRegister,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        };

        request.post(opt,  function (error, response, body) {
            expect(response.statusCode).to.equal(404);
            expect(body).to.equal('{"error":"users validation failed"}');
            done();
        })
    });
});

describe('Register endpoint - should work', function () {
    
    it('create user 1', function (done) {
        var data = {
            first_name: "Joe",
            last_name: "Doe",
            address_1: "101 Main st",
            address_2: "ste 1",
            city: "Los Angeles",
            zipcode: "91203",
            zipcode_plus4: "1000",
            state: "CA",
            country: "US"
        };

        var opt = {
            url: apiUrlRegister,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        };

        request.post(opt,  function (error, response, body) {
            
            var r = JSON.parse(body);
            expect(response.statusCode).to.equal(201);
            expect(r.id).to.exist;
            done();
        })
    });

    it('create user 2', function (done) {
        var data = {
            first_name: "Mary",
            last_name: "Doe",
            address_1: "787 Second st",
            address_2: "ste 2",
            city: "Valencia",
            zipcode: "91208",
            zipcode_plus4: "2000",
            state: "CA",
            country: "US"
        };

        var opt = {
            url: apiUrlRegister,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        };

        request.post(opt,  function (error, response, body) {
            
            var r = JSON.parse(body);
            expect(response.statusCode).to.equal(201);
            expect(r.id).to.exist;
            done();
        })
    });
});


describe('user endpoint', function () {
    
    it('list 2 users', function (done) {
        
        var opt = {
            url: apiUrlUser
        };

        request.get(opt,  function (error, response, body) {
            
            var r = JSON.parse(body).data;
            
            expect(response.statusCode).to.equal(200);

            expect(r[0]._id).to.exist;
            expect(r[0].first_name).to.exist;
            expect(r[0].last_name).to.exist;
            expect(r[0].address_1).to.exist;
            expect(r[0].address_2).to.exist;
            expect(r[0].city).to.exist;
            expect(r[0].state).to.exist;
            expect(r[0].zipcode).to.exist;
            expect(r[0].zipcode_plus4).to.exist;
            expect(r[0].country).to.exist;
            expect(r[0].first_name).to.equal("Mary");

            expect(r[1]._id).to.exist;
            expect(r[1].first_name).to.exist;
            expect(r[1].last_name).to.exist;
            expect(r[1].address_1).to.exist;
            expect(r[1].address_2).to.exist;
            expect(r[1].city).to.exist;
            expect(r[1].state).to.exist;
            expect(r[1].zipcode).to.exist;
            expect(r[1].zipcode_plus4).to.exist;
            expect(r[1].country).to.exist;
            expect(r[1].first_name).to.equal("Joe");

            done();
        })
    });

});
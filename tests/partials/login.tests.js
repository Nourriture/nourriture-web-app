/**
 * Created by niels on 12/6/14.
 *
 * Unit tests for login view and controller
 */

describe("Test login view and controller", function() {

    /**
     *  Tested with following server responses:
     *      200: Success
     *      401: Unauthorized
     *      500: Server error
     *      0:   Connection refused
     */


    it('Shows empty login form', function() {
        browser.addMockModule('httpBackendMock', function() {
            angular.module('httpBackendMock', ['nourWebApp', 'ngMockE2E'])
                .run(function($httpBackend) {
                    $httpBackend.whenGET(/partials\/.*/).passThrough();
                    $httpBackend.whenGET('http://localhost:2121/isloggedin').respond(function(method, url, data) {
                        return [200, "", {}];
                    });
                });
        });

        browser.get('http://localhost:8080/#/login');

        expect(element(by.model('credentials.username')).isPresent()).toBe(true);   // Username input
        expect(element(by.model('credentials.password')).isPresent()).toBe(true);   // Password input
        expect(element(by.css('[ng-click="attemptLogin(credentials)"]')).isPresent()).toBe(true);  // Login button
    });

    it('Navigates to front page upon successful login', function() {
        browser.addMockModule('httpBackendMock', function() {
            angular.module('httpBackendMock', ['nourWebApp', 'ngMockE2E'])
                .run(function($httpBackend) {
                    $httpBackend.whenGET(/partials\/.*/).passThrough();
                    $httpBackend.whenGET('http://localhost:2121/isloggedin').respond(function(method, url, data) {
                        return [401, "", {}];
                    });
                    $httpBackend.whenPOST('http://localhost:2121/login').respond(function(method, url, data) {
                        return [200, "", { username: "bob", role:"admin" }];
                    });
                });
        });

        browser.get('http://localhost:8080/#/login');

        element(by.model('credentials.username')).sendKeys("bob");
        element(by.model('credentials.password')).sendKeys("secret");

        element(by.css('#buttonLogin')).click();

        expect(browser.getCurrentUrl()).toEqual("http://localhost:8080/#/");
    });

    it('Shows appropriate alert on invalid credentials', function() {
        browser.addMockModule('httpBackendMock', function() {
            angular.module('httpBackendMock', ['nourWebApp', 'ngMockE2E'])
                .run(function($httpBackend) {
                    $httpBackend.whenGET(/partials\/.*/).passThrough();
                    $httpBackend.whenGET('http://localhost:2121/isloggedin').respond(function(method, url, data) {
                        return [401, "", {}];
                    });
                    $httpBackend.whenPOST('http://localhost:2121/login').respond(function(method, url, data) {
                        return [401, "", {}];
                    });
                });
        });

        browser.get('http://localhost:8080/#/login');

        element(by.model('credentials.username')).sendKeys("bob");
        element(by.model('credentials.password')).sendKeys("secret");

        element(by.css('#buttonLogin')).click();

        expect(element(by.css("#alertInvalidCredentials")).isPresent()).toBe(true);
    });

    it('Shows appropriate alert on unexpected error', function() {
        browser.addMockModule('httpBackendMock', function() {
            angular.module('httpBackendMock', ['nourWebApp', 'ngMockE2E'])
                .run(function($httpBackend) {
                    $httpBackend.whenGET(/partials\/.*/).passThrough();
                    $httpBackend.whenGET('http://localhost:2121/isloggedin').respond(function(method, url, data) {
                        return [401, "", {}];
                    });
                    $httpBackend.whenPOST('http://localhost:2121/login').respond(function(method, url, data) {
                        return [500, "", {}];
                    });
                });
        });

        browser.get('http://localhost:8080/#/login');

        element(by.model('credentials.username')).sendKeys("bob");
        element(by.model('credentials.password')).sendKeys("secret");

        element(by.css('[ng-click="attemptLogin(credentials)"]')).click();

        expect(element(by.css("#alertUnexpectedError")).isPresent()).toBe(true);
    });

    it('Shows appropriate alert on connection issues', function() {
        browser.addMockModule('httpBackendMock', function() {
            angular.module('httpBackendMock', ['nourWebApp', 'ngMockE2E'])
                .run(function($httpBackend) {
                    $httpBackend.whenGET(/partials\/.*/).passThrough();
                    $httpBackend.whenGET('http://localhost:2121/isloggedin').respond(function(method, url, data) {
                        return [401, "", {}];
                    });
                    $httpBackend.whenPOST('http://localhost:2121/login').respond(function(method, url, data) {
                        return [0, "", {}];
                    });
                });
        });

        browser.get('http://localhost:8080/#/login');

        element(by.model('credentials.username')).sendKeys("bob");
        element(by.model('credentials.password')).sendKeys("secret");

        element(by.css('[ng-click="attemptLogin(credentials)"]')).click();

        expect(element(by.css("#alertConncetionIssues")).isPresent()).toBe(true);
    });


    /**
     *  TODO test cases:
     *      * Empty username and password
     *      * Empty username
     *      * Empty password
     *      * Invalid username
     *
     */

});
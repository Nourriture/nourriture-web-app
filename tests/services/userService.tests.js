/**
 * Created by niels on 12/6/14.
 */


describe("Test UserService (login/logout)", function() {
    var UserService, $rootScope;
    var host = "http://mock.com";

    // Before each test
    beforeEach(module("userServices"));
    beforeEach(module("nourConfig"));
    beforeEach(angular.mock.inject(function($injector) {
        // Retrieve root scope so we can spy on events
        $rootScope = $injector.get('$rootScope');
        spyOn($rootScope, '$emit').and.callThrough();

        // Make sure host configuration is set correctly
        config = $injector.get("config");
        config.BE_HOST = host;

        // Mock HTTP
        $httpBackend = $injector.get("$httpBackend");

        // Inject UserService
        UserService = $injector.get('UserService');
    }));

    /**
     *  Server responses tested:
     *      200: Success
     *      401: Unauthorized
     *      500: Server error
     *      0:   Connection refused
     */


    /**
     *  LOGIN
     *  UserService.logIn
     *
     *  Pre-conditions:
     *      * "credentials" are valid
     *          * username: not null, string, /[A-Za-z@\.]{0,32}/
     *          * password: not null, string, /.{0,32}/
     *
     *  Post-conditions:
     *      * (in callback) "status" is an integer HTTP-code corresponding to serve answer (401, 500 e.g.).
     *          Unless successful response (200), in which case it is undefined.
     *          Unless connection refused, in which case it is -1.
     *      * (on self) ".loggedIn" should be set to true if successful response was received (otherwise: what it was before)
     *      * (on self) ".user" should be set to the user object received from the server (otherwise: what it was before)
     *      * (on root) event "user:loginStateChanged" is broadcast containing reference to UserService, if successful response (otherwise: no broadcast)
     */
    it("Logs in successfully", function(done) {
        var serverUser = { username:"john", role:"raw" };
        $httpBackend.expectPOST(host + "/login")
            .respond(200, serverUser);

        UserService.logIn({ username:"john", password:"secret"}, function(status) {
            expect(status).toBeUndefined();
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(serverUser);
            expect($rootScope.$emit).toHaveBeenCalledWith("user:loginStateChanged", UserService);

            done();
        });

        $httpBackend.flush();
    });
    it("Logs in successfully, when already logged in", function(done) {
        var serverUser = { username:"john", role:"raw" };
        $httpBackend.expectPOST(host + "/login")
            .respond(200, serverUser);

        UserService.user = { username: "bob", role:"company" };
        UserService.isLoggedIn = true;

        UserService.logIn({ username:"john", password:"secret"}, function(status) {
            expect(status).toBeUndefined();
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(serverUser);
            expect($rootScope.$emit).toHaveBeenCalledWith("user:loginStateChanged", UserService);

            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on invalid credentials", function(done) {
        $httpBackend.expectPOST(host + "/login")
            .respond(401);

        UserService.logIn({ username:"john", password:"secret"}, function(status) {
            expect(status).toBe(401);
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on invalid credentials, when already logged in", function(done) {
        $httpBackend.expectPOST(host + "/login")
            .respond(401);

        var userBob = { username: "bob", role:"company" };
        UserService.user = userBob;
        UserService.isLoggedIn = true;

        UserService.logIn({ username:"john", password:"secret"}, function(status) {
            expect(status).toBe(401);
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(userBob);
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on server error", function(done) {
        $httpBackend.expectPOST(host + "/login")
            .respond(500);

        UserService.logIn({ username:"john", password:"secret"}, function(status) {
            expect(status).toBe(500);
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on server error, when already logged in", function(done) {
        $httpBackend.expectPOST(host + "/login")
            .respond(500);

        var userBob = { username: "bob", role:"company" };
        UserService.user = userBob;
        UserService.isLoggedIn = true;

        UserService.logIn({ username:"john", password:"secret"}, function(status) {
            expect(status).toBe(500);
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(userBob);
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on connection refused", function(done) {
        $httpBackend.expectPOST(host + "/login")
            .respond(0);

        UserService.logIn({ username:"john", password:"secret"}, function(status) {
            expect(status).toBe(-1);
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on connection refused, when already logged in", function(done) {
        $httpBackend.expectPOST(host + "/login")
            .respond(0);

        var userBob = { username: "bob", role:"company" };
        UserService.user = userBob;
        UserService.isLoggedIn = true;

        UserService.logIn({ username:"john", password:"secret"}, function(status) {
            expect(status).toBe(-1);
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(userBob);
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });


    /**
     *  LOGOUT
     *  UserService.logOut
     *
     *  Pre-conditions:
     *      * None
     *
     *  Post-conditions:
     *      * (in callback) "status" is an integer HTTP-code corresponding to serve answer (401, 500 e.g.).
     *          Unless successful response (200), in which case it is undefined.
     *          Unless connection refused, in which case it is -1.
     *      * (on self) ".loggedIn" should be set to false if successful response was received (otherwise: what it was before)
     *      * (on self) ".user" should be set to undefined  (otherwise: what it was before)
     *      * (on root) event "user:loginStateChanged" is broadcast containing reference to UserService, if successful response (otherwise: no broadcast)
     */
    it("Logs out successfully", function(done) {
        $httpBackend.expectGET(host + "/logout")
            .respond(200);

        UserService.logOut(function(status) {
            expect(status).toBeUndefined();
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).toHaveBeenCalledWith("user:loginStateChanged", UserService);

            done();
        });

        $httpBackend.flush();
    });
    it("Logs out successfully, when already logged in", function(done) {
        $httpBackend.expectGET(host + "/logout")
            .respond(200);

        UserService.user = { username: "bob", role:"company" };
        UserService.isLoggedIn = true;

        UserService.logOut(function(status) {
            expect(status).toBeUndefined();
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).toHaveBeenCalledWith("user:loginStateChanged", UserService);

            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on invalid credentials", function(done) {
        $httpBackend.expectGET(host + "/logout")
            .respond(401);

        UserService.logOut(function(status) {
            expect(status).toBe(401);
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on invalid credentials, when already logged in", function(done) {
        $httpBackend.expectGET(host + "/logout")
            .respond(401);

        var userBob = { username: "bob", role:"company" };
        UserService.user = userBob;
        UserService.isLoggedIn = true;

        UserService.logOut(function(status) {
            expect(status).toBe(401);
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(userBob);
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on server error", function(done) {
        $httpBackend.expectGET(host + "/logout")
            .respond(500);

        UserService.logOut(function(status) {
            expect(status).toBe(500);
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on server error, when already logged in", function(done) {
        $httpBackend.expectGET(host + "/logout")
            .respond(500);

        var userBob = { username: "bob", role:"company" };
        UserService.user = userBob;
        UserService.isLoggedIn = true;

        UserService.logOut(function(status) {
            expect(status).toBe(500);
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(userBob);
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on connection refused", function(done) {
        $httpBackend.expectGET(host + "/logout")
            .respond(0);

        UserService.logOut(function(status) {
            expect(status).toBe(-1);
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on connection, when already logged in", function(done) {
        $httpBackend.expectGET(host + "/logout")
            .respond(0);

        var userBob = { username: "bob", role:"company" };
        UserService.user = userBob;
        UserService.isLoggedIn = true;

        UserService.logOut(function(status) {
            expect(status).toBe(-1);
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(userBob);
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });


    /**
     *  REFRESH LOGIN STATE
     *  UserService.refreshLoginState
     *
     *  NOTE: Should work exactly like login without the credentials submitted. A successful refresh means a valid and not-expired session cookie is present.
     *
     *  Pre-conditions:
     *      * None
     *
     *  Post-conditions:
     *      * (in callback) "status" is an integer HTTP-code corresponding to serve answer (401, 500 e.g.).
     *          Unless successful response (200), in which case it is undefined.
     *          Unless connection refused, in which case it is -1.
     *      * (on self) ".loggedIn" should be set to true if successful response was received (otherwise: what it was before)
     *      * (on self) ".user" should be set to the user object received from the server (otherwise: what it was before)
     *      * (on root) event "user:loginStateChanged" is broadcast containing reference to UserService, if successful response (otherwise: no broadcast)
     */
    it("Refreshes successfully", function(done) {
        var serverUser = { username:"john", role:"raw" };
        $httpBackend.expectGET(host + "/isloggedin")
            .respond(200, serverUser);

        UserService.refreshLoginState(function(status) {
            expect(status).toBeUndefined();
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(serverUser);
            expect($rootScope.$emit).toHaveBeenCalledWith("user:loginStateChanged", UserService);

            done();
        });

        $httpBackend.flush();
    });
    it("Refreshes successfully, when already logged in", function(done) {
        var serverUser = { username:"john", role:"raw" };
        $httpBackend.expectGET(host + "/isloggedin")
            .respond(200, serverUser);

        UserService.user = { username: "bob", role:"company" };
        UserService.isLoggedIn = true;

        UserService.refreshLoginState(function(status) {
            expect(status).toBeUndefined();
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(serverUser);
            expect($rootScope.$emit).toHaveBeenCalledWith("user:loginStateChanged", UserService);

            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on invalid credentials", function(done) {
        $httpBackend.expectGET(host + "/isloggedin")
            .respond(401);

        UserService.refreshLoginState(function(status) {
            expect(status).toBe(401);
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on invalid credentials, when already logged in", function(done) {
        $httpBackend.expectGET(host + "/isloggedin")
            .respond(401);

        var userBob = { username: "bob", role:"company" };
        UserService.user = userBob;
        UserService.isLoggedIn = true;

        UserService.refreshLoginState(function(status) {
            expect(status).toBe(401);
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(userBob);
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on server error", function(done) {
        $httpBackend.expectGET(host + "/isloggedin")
            .respond(500);

        UserService.refreshLoginState(function(status) {
            expect(status).toBe(500);
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on server error, when already logged in", function(done) {
        $httpBackend.expectGET(host + "/isloggedin")
            .respond(500);

        var userBob = { username: "bob", role:"company" };
        UserService.user = userBob;
        UserService.isLoggedIn = true;

        UserService.refreshLoginState(function(status) {
            expect(status).toBe(500);
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(userBob);
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on connection refused", function(done) {
        $httpBackend.expectGET(host + "/isloggedin")
            .respond(0);

        UserService.refreshLoginState(function(status) {
            expect(status).toBe(-1);
            expect(UserService.isLoggedIn).toBe(false);
            expect(UserService.user).toBeFalsy();
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
    it("Responds correctly on connection refused, when already logged in", function(done) {
        $httpBackend.expectGET(host + "/isloggedin")
            .respond(0);

        var userBob = { username: "bob", role:"company" };
        UserService.user = userBob;
        UserService.isLoggedIn = true;

        UserService.refreshLoginState(function(status) {
            expect(status).toBe(-1);
            expect(UserService.isLoggedIn).toBe(true);
            expect(UserService.user).toEqual(userBob);
            expect($rootScope.$emit).not.toHaveBeenCalled();
            done();
        });

        $httpBackend.flush();
    });
});
/**
 * Created by niels on 12/8/14.
 */

var mocks = require('protractor-http-mock');

var frontendRoot = (process.env.FRONTEND_ROOT || 'http://localhost:8080');
var backendRoot = (process.env.BACKEND_ROOT || 'http://localhost:2121');

describe("'Manage Users' view and controller", function() {

    /**
     *  Tested with following server responses:
     *      200: Success
     *      500: Server error
     *      0:   Connection refused
     *
     *  Tested with following user inputs:
     *      Valid
     *      Malformed
     *      Missing
     */

    var mockEndpoints;
    beforeEach(function() {
        mockEndpoints = [
            // Not logged in already
            {
                request: {  method: 'GET', path: backendRoot + '/isloggedin' },
                response: {
                    status: 401
                }
            }
        ];
    });

    afterEach(function() {
        mocks.teardown();
    });

    xdescribe(function() {

    it('Shows correct list of all users returned by backend', function() {
        // ARRANGE
        var mockusers = [
            { "_id": "547ee0785a9d622b468bf652", "modified": "", "created": "2014-12-03T10:05:44.760Z", "username": "paja", "email": "pprochazka72@gmail.com", "authMethod": "local", "role": "admin", "__v": 0 },
            { "_id": "547ee08b5a9d622b468bf653", "modified": "", "created": "2014-12-03T10:06:03.665Z", "username": "niels", "email": "nm@9la.dk", "authMethod": "local", "role": "raw", "__v": 0 },
            { "_id": "548305347b1c1b2d5f802a00", "modified": "", "created": "2014-12-06T13:31:32.240Z", "username": "bob", "email": "bobsaget@gihub.com", "authMethod": "local", "role": "gastro", "__v": 0 },
            { "_id": "548305427b1c1b2d5f802a01", "modified": "", "created": "2014-12-06T13:31:46.062Z", "username": "johndoe", "email": "johndoe@yahoo.com", "authMethod": "local", "role": "comp", "__v": 0 }
        ];
        mockEndpoints.push({
            // List of different types of users
            request: { method: 'GET', path: backendRoot + '/user' },
            response: {
                status: 200,
                data: mockusers
            }
        });
        mocks(mockEndpoints);

        // ACT
        browser.get(frontendRoot + '/#/users');

        // ASSERT
        var rowInfos = element.all(by.css("#users-table tr")).map(function(row) {
            return row.all(by.css("td span")).reduce(function(acc, cell) {
                cell.getText().then(function(text) {
                    acc.push(text);
                });
                return acc;
            }, []);
        });
        expect(rowInfos).toEqual([
            [  ], // <--- Header row
            [ '', 'paja', 'pprochazka72@gmail.com', '(encrypted)', '', '12th Dec 2014', 'a few seconds ago', 'Admin' ],
            [ '', 'niels', 'nm@9la.dk', '(encrypted)', '', '12th Dec 2014', 'a few seconds ago', 'Deactivated' ],
            [ '', 'bob', 'bobsaget@gihub.com', '(encrypted)', '', '12th Dec 2014', 'a few seconds ago', 'Gastronomist' ],
            [ '', 'johndoe', 'johndoe@yahoo.com', '(encrypted)', '', '12th Dec 2014', 'a few seconds ago', 'Company' ]
        ]);
    });

    it('Opens edit-mode on row correctly upon click of ROW edit button', function() {
        // ARRANGE
        var mockusers = [
            { "_id": "547ee0785a9d622b468bf652", "modified": "", "created": "2014-12-03T10:05:44.760Z", "username": "paja", "email": "pprochazka72@gmail.com", "authMethod": "local", "role": "admin", "__v": 0 },
            { "_id": "547ee08b5a9d622b468bf653", "modified": "", "created": "2014-12-03T10:06:03.665Z", "username": "niels", "email": "nm@9la.dk", "authMethod": "local", "role": "raw", "__v": 0 },
            { "_id": "548305347b1c1b2d5f802a00", "modified": "", "created": "2014-12-06T13:31:32.240Z", "username": "bob", "email": "bobsaget@gihub.com", "authMethod": "local", "role": "gastro", "__v": 0 },
            { "_id": "548305427b1c1b2d5f802a01", "modified": "", "created": "2014-12-06T13:31:46.062Z", "username": "johndoe", "email": "johndoe@yahoo.com", "authMethod": "local", "role": "comp", "__v": 0 }
        ];
        mockEndpoints.push({
            // List of different types of users
            request: { method: 'GET', path: backendRoot + '/user' },
            response: {
                status: 200,
                data: mockusers
            }
        });
        mocks(mockEndpoints);

        // ACT
        browser.get(frontendRoot + '/#/users');
        element.all(by.css('#users-table tr button[ng-click="startEdit(user)"]')).get(2).click();

        // ASSERT
        element.all(by.css('#users-table tr')).get(3).then(function(row) {
            // Inputs
            expect(row.all(by.css('td span')).get(1).getText()).toBe("bob");
            expect(row.all(by.model('user.model.email')).first().isPresent()).toBe(true);
            expect(row.all(by.model('user.model.password')).first().isPresent()).toBe(true);
            expect(row.all(by.model('user.model.role')).first().isPresent()).toBe(true);
            // Save specific controls
            expect(row.all(by.css('button[ng-click="attemptSave(user)"]')).first().isPresent()).toBe(true);
            expect(row.all(by.css('button[ng-click="discardEdits()"]')).first().isPresent()).toBe(true);
        });
        expect(element.all(by.model('user.model.email')).count()).toBe(1);
        expect(element.all(by.model('user.model.password')).count()).toBe(1);
        expect(element.all(by.model('user.model.role')).count()).toBe(1);
        expect(element.all(by.css('button[ng-click="attemptSave(user)"]')).count()).toBe(1); // NOTE: Only 1, because the save button at the bottom does not take a user object
        expect(element.all(by.css('button[ng-click="discardEdits()"]')).count()).toBe(2); // NOTE: 2 because there's also a discard button at the bottom of the page
    });

    it('Closes edit-mode on row correctly upon click of ROW abort button', function() {
        // ARRANGE
        var mockusers = [
            { "_id": "547ee0785a9d622b468bf652", "modified": "", "created": "2014-12-03T10:05:44.760Z", "username": "paja", "email": "pprochazka72@gmail.com", "authMethod": "local", "role": "admin", "__v": 0 },
            { "_id": "547ee08b5a9d622b468bf653", "modified": "", "created": "2014-12-03T10:06:03.665Z", "username": "niels", "email": "nm@9la.dk", "authMethod": "local", "role": "raw", "__v": 0 },
            { "_id": "548305347b1c1b2d5f802a00", "modified": "", "created": "2014-12-06T13:31:32.240Z", "username": "bob", "email": "bobsaget@gihub.com", "authMethod": "local", "role": "gastro", "__v": 0 },
            { "_id": "548305427b1c1b2d5f802a01", "modified": "", "created": "2014-12-06T13:31:46.062Z", "username": "johndoe", "email": "johndoe@yahoo.com", "authMethod": "local", "role": "comp", "__v": 0 }
        ];
        mockEndpoints.push({
            // List of different types of users
            request: { method: 'GET', path: backendRoot + '/user' },
            response: {
                status: 200,
                data: mockusers
            }
        });
        mocks(mockEndpoints);

        // ACT
        browser.get(frontendRoot + '/#/users');
        element.all(by.css('#users-table tr button[ng-click="startEdit(user)"]')).get(2).click();
        element(by.css('#users-table tr button[ng-click="discardEdits()"]')).click();

        // ASSERT
        expect(element.all(by.model('user.model.email')).count()).toBe(0);
        expect(element.all(by.model('user.model.password')).count()).toBe(0);
        expect(element.all(by.model('user.model.role')).count()).toBe(0);
        expect(element.all(by.css('button[ng-click="attemptSave(user)"]')).count()).toBe(0);
        expect(element.all(by.css('button[ng-click="discardEdits()"]')).count()).toBe(0);
    });

    });

    it('Opens edit-mode on row correctly upon click of BOTTOM edit button', function() {
        // ARRANGE
        var mockusers = [
            { "_id": "547ee0785a9d622b468bf652", "modified": "", "created": "2014-12-03T10:05:44.760Z", "username": "paja", "email": "pprochazka72@gmail.com", "authMethod": "local", "role": "admin", "__v": 0 },
            { "_id": "547ee08b5a9d622b468bf653", "modified": "", "created": "2014-12-03T10:06:03.665Z", "username": "niels", "email": "nm@9la.dk", "authMethod": "local", "role": "raw", "__v": 0 },
            { "_id": "548305347b1c1b2d5f802a00", "modified": "", "created": "2014-12-06T13:31:32.240Z", "username": "bob", "email": "bobsaget@gihub.com", "authMethod": "local", "role": "gastro", "__v": 0 },
            { "_id": "548305427b1c1b2d5f802a01", "modified": "", "created": "2014-12-06T13:31:46.062Z", "username": "johndoe", "email": "johndoe@yahoo.com", "authMethod": "local", "role": "comp", "__v": 0 }
        ];
        mockEndpoints.push({
            // List of different types of users
            request: { method: 'GET', path: backendRoot + '/user' },
            response: {
                status: 200,
                data: mockusers
            }
        });
        mocks(mockEndpoints);

        // ACT
        browser.get(frontendRoot + '/#/users');
        element.all(by.css('#users-table tr input[ng-click="checkedChanged()"] + span')).get(2).click();
        element.all(by.css('button[ng-click="startEdit()"]')).click();

        // ASSERT
        element.all(by.css('#users-table tr')).get(3).then(function(row) {
            // Inputs
            expect(row.all(by.css('td span')).get(1).getText()).toBe("bob");
            expect(row.all(by.model('user.model.email')).first().isPresent()).toBe(true);
            expect(row.all(by.model('user.model.password')).first().isPresent()).toBe(true);
            expect(row.all(by.model('user.model.role')).first().isPresent()).toBe(true);
            // Save specific controls
            expect(row.all(by.css('button[ng-click="attemptSave(user)"]')).first().isPresent()).toBe(true);
            expect(row.all(by.css('button[ng-click="discardEdits()"]')).first().isPresent()).toBe(true);
        });
        expect(element.all(by.model('user.model.email')).count()).toBe(1);
        expect(element.all(by.model('user.model.password')).count()).toBe(1);
        expect(element.all(by.model('user.model.role')).count()).toBe(1);
        expect(element.all(by.css('button[ng-click="attemptSave(user)"]')).count()).toBe(1); // NOTE: Only 1, because the save button at the bottom does not take a user object
        expect(element.all(by.css('button[ng-click="discardEdits()"]')).count()).toBe(2); // NOTE: 2 because there's also a discard button at the bottom of the page
    });
});
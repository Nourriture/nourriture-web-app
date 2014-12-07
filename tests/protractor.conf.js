/**
 * Created by niels on 12/7/14.
 */

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['partials/login.tests.js'],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': { }
        //'args': [ '--verbose --enable-logging --v=1 --log-path=chromedriver.log' ]
    }
};
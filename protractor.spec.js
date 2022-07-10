describe('e-auction', function() {

    // Instantiate Elasticsearch

    const winston = require('winston');
    const Elasticsearch = require('winston-elasticsearch');

    const esTransportOpts = {
        level: 'info',
        clientOpts: { node: 'http://localhost:9200' },
        transformer: logData => {
            return {
                "@timestamp": (new Date()).getTime(),
                severity: logData.level,
                message: `[${logData.level}] E-Auction e2e test log message: ${logData.message}`,
                fields: {}
            }
        }
    };

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new Elasticsearch.ElasticsearchTransport(esTransportOpts)
        ]
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }
    // Instantiate Elasticsearch

    const BASE_URL = 'http://localhost:4200'

    it('to check the page title', function() {
        browser.get(BASE_URL + '/login');
        browser.driver.getTitle().then(function(pageTitle) {
            expect(pageTitle).toEqual('E-Auction');
        });
    });

    it('to check login username is mandatory', function() {
        browser.get(BASE_URL + '/login');
        element(by.name('password')).sendKeys('Pass');
        element(by.buttonText('Login')).click();
        expect(element(by.css('.alert-danger')).isDisplayed()).toBe(true)
    });

    it('to check login password is mandatory', function() {
        browser.get(BASE_URL + '/login');
        element(by.name('username')).sendKeys('John');
        element(by.buttonText('Login')).click();
        expect(element(by.css('.alert-danger')).isDisplayed()).toBe(true)
    });

    it('to check login password less than 4 character is rejected', function() {
        browser.get(BASE_URL + '/login');
        element(by.name('username')).sendKeys('John');
        element(by.name('password')).sendKeys('Pas');
        element(by.buttonText('Login')).click();
        expect(element(by.css('.alert-danger')).isDisplayed()).toBe(true)
    });

    it('to check successful login redirects to home page', function() {
        browser.get(BASE_URL + '/login');
        element(by.name('username')).sendKeys('4cajei63lki2s909vm70e3nko9');
        element(by.name('password')).sendKeys('guqd9ib258kfn0oai9vk820ea9a5okqnih3q0qumd5tmcq6fcrp');
        element(by.buttonText('Login')).click();
        expect(browser.getPageSource()).toContain('Select a Product to View Bids')
    });

    it('to check product details panel is visible upon product selection', function() {
        element(by.id('selectedProduct')).click();
        element(by.cssContainingText('option', 'New Product 1')).click();

        var source = browser.getPageSource()
        expect(source).toContain('Product Name:')
        expect(source).toContain('Short Description:')
        expect(source).toContain('Detailed Description:')
        expect(source).toContain('Category:')
        expect(source).toContain('Starting Price:')
        expect(source).toContain('Bid End Date:')
    });

    it('to check bids table is visible upon product selection', function() {
        element(by.id('selectedProduct')).click();
        element(by.cssContainingText('option', 'New Product 1')).click();

        var source = browser.getPageSource()
        expect(source).toContain('Bids for Selected Product')

        var expectedHeaders = ['Bid Amount', 'Name', 'Email', 'Mobile'];
        var headers = element.all(by.css('table > thead > tr > th'));

        expectedHeaders.forEach(function(header, index) {
            expect(headers.get(index).getText()).toEqual(header);
            headers.get(index).getText().then(function(actual) {
                expect(actual).toEqual(header)
            })
        });
    });

    // Report test results to Elasticsearch
    const fs = require('fs');
    let results = JSON.parse(fs.readFileSync('./protractor-result.json'))

    results.forEach(result => {
        logger.info('\nTest Description: ' + result.description +
            '\nTest Passed: ' + result.assertions[0].passed +
            (result.assertions[0].errorMsg ? '\nTest Failure Reason: ' + result.assertions[0].errorMsg : '') +
            '\nTest Duration: ' + result.duration + 'ms')
    })

});
# Backbone.History.Polyfill

## Introduction

Within single page RIA applications, there is a very common use case for getting previous hash/fragment. As of now, neither the browser nor History provides any such implementation.

Backbone.History.Polyfil is a plugin which can be loaded along with Backbone framework, which Extends Backbone History to add methods to get previous hash/fragment of URL

This plugin keeps a track of all the hashes being navigated during the journey in application after we start backbone history.

It also have a addition capability to validate the hash against the routes defined within the application before adding the same.

## Download + Source

Clone this repository or simply [download](https://raw.githubusercontent.com/FidelityInternational/BackboneHistoryPolyfill/master/src/backbone.history.polyfill.js)

You must also ensure that Backbone.History.Polyfil's dependencies on Backbone are downloaded.

## API

### config
By default validate hash is set to true, but it can be configured based on the requirement once the plugin is loaded.
`bhp.config({validateHash: false})`

### getPreviousHash
Once the application is started, the below method can be called to get the previous hash.

`Backbone.history.getPreviousHash()`

If Backbone history is not started, on aclling the above method it will throw an error.

`Backbone.history has not been started(…)`

## F.A.Q.

### Why this?

In single page RIA applications, there is a need to get browser’s previous URL fragment during various user navigations based on which certain action can be performed.

The default browser’s/Backbone implementation does not provide any way to get the previous URL fragment. However, using browser’s history we can go to previous fragment, but we cannot control its behaviour before execution.

So, this implementation can come in to rescue...!!!

### Dependencies

Backbone.History.Polyfil currently works with the following libraries:

* [jQuery](http://jquery.com) v1.8+
* [Underscore](http://underscorejs.org) v1.8.3
* [Backbone](http://backbonejs.org) v1.2.1+

### License

MIT

## Change Log

#### 1.0..0

- Initial release.

## How to Contribute

If you would like to contribute to Backbone History Polyfill's source code, please read the [guidelines for pull requests and contributions]().
Following these guidelines will help make your contributions easier to bring into the next release.

### Issue Reporting

Report issues with Backbone History Polyfill, submit pull requests to fix problems, or to
create summarized and documented feature requests (preferably with pull
requests that implement the feature).

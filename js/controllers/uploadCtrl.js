/**
 * Created by niels on 11/30/14.
 *
 * Controller for testing file upload
 */

var upldModule = angular.module("nourUpload", ["nourConfig", "angularFileUpload"]);
upldModule.directive("nourUpload", ["$http", "config", "FileUploader", function($http, config, FileUploader) {
    return {
        link: {
            pre: function ($scope, $linkElm, $linkAttr) {
                var group = $linkAttr["nourGroup"];
                var entity = $linkAttr["nourEntity"];

                // Utility function (invoked just before upload, see below) for getting policy token needed to authorize a user to upload a file to our S3 bucket
                var getPolicyToken = function(callback) {
                    $http.get(config.BE_HOST + "/upload/company/token/" + entity)// TODO: Put group in here instead of "company" when backend is implemented
                        .success(function(data, status, headers, config) {
                            callback(data);
                        })
                        .error(function(data, status, headers, config) {
                            callback(null);
                        });
                };

                // Instantiate uploader
                var uploader = new FileUploader({
                    url: "https://" + config.S3_BUCKET + ".s3.amazonaws.com/",
                    autoUpload: true,
                    formData: [
                        { AWSAccessKeyId: config.AMAZON_ID },
                        { acl: "public-read" }
                    ]
                });

                // Restrict maximum file size
                uploader.filters.push({ name:'maxSize', fn:function(file) {
                    return file.size < 1048576;
                }});

                // Restrict supported image types
                uploader.filters.push({ name:'imageTypes', fn: function(file) {
                    return file.name.match(/^.+\.(png|gif|jpg|jpeg)$/);
                }});

                // Error if above restrictions fail
                uploader.onWhenAddingFileFailed = function(item, filter, options) {
                    uploader.error = filter.name;
                };

                // Final preparations for upload after user submitted file and it passed restrictions
                uploader.onAfterAddingFile = function(item) {
                    uploader.error = null;

                    // Add Content-Type field depending on file submitted by user
                    item.formData.push( { "Content-Type": item._file.type} );

                    // Add key to store under (NOTE: Policy issued from server will only allow keys starting with the company name. This bit is mostly to add the correct file-extension)
                    var ext = item._file.name.match(/^.+\.(png|gif|jpg|jpeg)$/)[1]; // TODO: Add sub-dir here
                    item.formData.push( { "key": entity + "." + ext } );

                    // Inject a policy token retrieval before upload
                    item.upload = function(uploadItem) {
                        return function() {
                            getPolicyToken(function(token) {
                                if(token) {
                                    item.formData.push( { policy: token.s3Policy } );
                                    item.formData.push( { signature: token.s3Signature } );
                                    item.upload = uploadItem;
                                    item.upload();
                                } else {
                                    uploader.error = "policy";
                                    item.cancel();
                                }
                            });
                        };
                    }(item.upload);
                };

                // Successful upload, invoke callback, if given
                uploader.onSuccessItem = function(item, response, status, headers) {
                    var successFunc = $linkAttr["nourSuccess"];
                    if(successFunc) {
                        $scope.$apply(successFunc);
                    }
                };

                // Failed upload, show error message
                uploader.onErrorItem = function(item, response, status, headers) {
                    if(status == 0) {
                        uploader.error = "connection";
                    } else {
                        uploader.error = "unexpected";
                    }
                };

                // Store configured uploader class in controller scope (still accessible for any further configuration)
                $scope[$linkAttr["uploader"]] = uploader;
            }
        }
    }
}]);

ctrls.controller("uploadCtrl", ['$scope', "$http", "config", function ($scope, $http, config) {
    var user = "cocacola";
    $scope.user = { username: user };
    $scope.uploadComplete = function() {
        $scope.imageSrc = "https://" + config.S3_BUCKET + ".s3.amazonaws.com/" + user + ".jpg" + "?cb=" + (new Date()).toString();
    }
}]);
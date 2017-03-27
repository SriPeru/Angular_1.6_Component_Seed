((angular) => {
    'use strict';
    angular.module('app')
    .service('httpReq', httpReq);

    httpReq.$inject=['$http'];

    function httpReq($http){
        this.getData = callAPI;

        function callAPI(urlParams){
            
            const url = 'https://api.github.com/' + urlParams;

            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
                .then(function(err){
                    return err;
                });

        }
    }

})(window.angular);
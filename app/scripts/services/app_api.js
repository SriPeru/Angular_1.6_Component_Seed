((angular)=>{
    angular.module('app')
    .factory('initAPI', initAPI)
    .factory('errorHttpInterceptor', errorHttpInterceptor);

    initAPI.$inject=['httpReq'];

    function initAPI(httpReq) {
        return {
            userSearch: userSearchFn,
            userDetail: userDetailFn
        }

        function userSearchFn(user){
            return httpReq.getData('search/users?q=' + user);
        }

        function userDetailFn(user){
            return httpReq.getData('users/'+user);
        }

    }

    errorHttpInterceptor.$inject = ['$exceptionHandler', '$q'];
    
    function errorHttpInterceptor($exceptionHandler, $q) {
        return {
            responseError: function responseError(rejection) {
                $exceptionHandler("An HTTP request error has occurred.\nHTTP config: " + rejection.config + ".\nStatus: " + rejection.status);
                return $q.reject(rejection);
            }
        };
    }
})(window.angular);
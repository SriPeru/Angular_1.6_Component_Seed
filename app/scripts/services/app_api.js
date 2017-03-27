((angular)=>{
    angular.module('app')
    .factory('initAPI', initAPI);

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
})(window.angular);
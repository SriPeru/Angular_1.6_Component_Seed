((angular)=>{
   "use strict";
    angular.module('app')
    .component('userDetail',  {
        template: `
           User Login: {{$ctrl.user.login}} <br />
                <span data-ng-if="rm.user.name">{{$ctrl.user.name}}<br /></span>

                
                <h1>User</h1>
                <div class="table-responsive">
                <table class="table">
                    <tr data-ng-repeat="(key, value) in $ctrl.user track by $index">
                        <td>{{key}}</td>
                        <td>{{value}}</td>
                    </tr>
                </table>
                    </div>
                
                
        `,
        bindings: { $router: '<' },
        controller: userDetailComponent
    });
        
    userDetailComponent.$inject = ['initAPI'];
    function userDetailComponent(initAPI){
            var $ctrl = this;
            var selectedId = null;

            this.$routerOnActivate = function(next){
                $ctrl.get = searchUser;
                selectedId = next.params.login;

                function searchUser(text){
                    console.log('test');
                    if (text && text.length > 0) {
                        initAPI.userDetail(selectedId)
                            .then(function(response){
                                console.log(response);
                                $ctrl.user = response;
                            }).then(function(err){
                                console.log(err);
                            });
                    }
                }

                searchUser(selectedId);
                
            }
        }
    




})(window.angular);
((angular)=>{
   "use strict";
    angular.module('app')
    .component('user',  {
        template: `
            <form class="navbar-form" role="search">
                    <h1>Search</h1>
                    <div class="input-group add-on">
                    <input class="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text" data-ng-model="$ctrl.searchText">
                    <div class="input-group-btn">
                        <button class="btn btn-default" data-ng-click="$ctrl.search($ctrl.searchText)" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                    </div>
                    </div>
                </form>
                <br />


                <div data-ng-if="$ctrl.searchText.length > 0">
                <div data-ng-if="$ctrl.users.length > 0">
                    <div class="table-responsive">
                    <table class="table">
                    <tr>
                        <th>User Name [User ID]</th>
                        <th>View User</th>
                    </tr>
                    <tr data-ng-repeat="user in $ctrl.currentUsers track by $index">
                        <td>{{user.login}} [{{user.id}}]</td>
                        <td><a ng-link="[\'UserDetail\', {login: user.login}]">
                        View User
                    </a></td>
                    </tr>
                    </table>
                        </div>
                </div>
                </div>
                
        `,
        bindings: { $router: '<' },
        controller: userComponent
    });
        
    userComponent.$inject = ['initAPI'];
    function userComponent(initAPI){
            var $ctrl = this;
            var selectedId = null;

            this.$routerOnActivate = function(next){
                $ctrl.search = searchUser;
                selectedId = next.params.login;

                function searchUser(text){
                    console.log('test');
                    if (text && text.length > 0) {
                        initAPI.userSearch(text)
                            .then(function(response){
                                console.log(response);
                                $ctrl.users = response.items;
                                $ctrl.currentUsers = $ctrl.users.slice(0, $ctrl.pageCount);
                            }).then(function(err){
                                console.log(err);
                            });
                    }
                }
                
            }
        }
    




})(window.angular);
((angular) => {
    'use strict';

    var app = {
        template: `
            <nav class="navbar navbar-inverse col-md-12">
                <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
                            </button>
                    <a class="navbar-brand" href="./">Search :: GitHub</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                    <li></li>
                    </ul>
                </div>
                </div>
            </nav>
            <ng-outlet></ng-outlet>
        `,
        $routeConfig : [
            {path: '/',    name: 'User',   component: 'user', useAsDefault: true},
            {path: '/:login', name: 'UserDetail', component: 'userDetail'}
            ],
        controller: function(){
            
        }
    };


    /* define the top level Root Component by providing a value for the 
    $routerRootComponent service.*/
    angular.module('app', ['ngComponentRouter', 'ngAnimate'])

    .config(function($locationProvider){
        $locationProvider.html5Mode(true)
    })

    .value('$routerRootComponent', 'app')

    .component('app', app);

})(window.angular);
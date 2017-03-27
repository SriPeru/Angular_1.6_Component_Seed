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
            {path: '/User/:login', name: 'UserDetail', component: 'userDetail'}
            ],
        controller: function(){
            
        }
    };

    config.$inject = ['$locationProvider', '$httpProvider', '$provide'];
    function config($locationProvider, $httpProvider, $provide){
            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('errorHttpInterceptor');

            $provide.decorator('$log', ['$delegate', function ($delegate) {
            // Keep track of the original debug method, we'll need it later.
            var origError = $delegate.error;
            /*
             * Intercept the call to $log.debug() so we can add on 
             * our enhancement. We're going to add on a date and 
             * time stamp to the message that will be logged.
             */
                $delegate.error = function () {
                    var args = [].slice.call(arguments);
                    args[0] = [new Date().toString(), ': ', args[0]].join('');

                    // Send on our enhanced message to the original debug method.
                    origError.apply(null, args)
                };

                return $delegate;
            }]);
    }


    /* define the top level Root Component by providing a value for the 
    $routerRootComponent service.*/
    angular.module('app', ['ngComponentRouter', 'ngAnimate'])

    .config(config)

    .value('$routerRootComponent', 'app')

    .component('app', app);

})(window.angular);
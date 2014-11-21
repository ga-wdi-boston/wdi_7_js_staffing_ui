angular.module('StaffingUI', [
    'ngRoute'
]).run(function(
	$rootScope,
	$location,
	$http,
	$window,
	AuthFactory,
	UserFactory, 
	TitleFactory,
	SkillFactory
) {
	$rootScope.$on('$routeChangeStart', function(event, next) {
		if (AuthFactory.isAuthenticated()) {
			if (AuthFactory.isAuthenticated()) {
				$http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('staffingUI.user');
			}

			UserFactory.fetch();
    		TitleFactory.fetch();
    		SkillFactory.fetch();
		} else {
			$location.path('/login');
		}
    });
});
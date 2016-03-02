HeyCommunity

.service('UserService', ['$http', function($http) {
    // sign up verify
    this.signUpVerifyCaptcha = function(params) {
        return $http.post(getApiUrl('/user/sign-up-verify-captcha'), params);
    }

    // sign up
    this.signUp = function(params) {
        var q = $http.post(getApiUrl('/user/sign-up'), params);
        q.then(function(response) {
            if (response.status === 200) {
                localStorage.user = JSON.stringify(response.data);
            }
        });
        return q;
    }

    // sign in
    this.signIn = function(params) {
        var q = $http.post(getApiUrl('/user/sign-in'), params);
        q.then(function(response) {
            if (response.status === 200) {
                localStorage.user = JSON.stringify(response.data);
            }
        });
        return q;
    }

    // sign out
    this.signOut = function() {
        var q = $http.get(getApiUrl('/user/sign-out'));
        q.then(function(response) {
            if (response.status === 200) {
                localStorage.removeItem('user');
            }
        });
        return q;
    }

    // user info
    this.userInfo = function() {
        var q = $http.get(getApiUrl('/user/user-info'));
        q.then(function(response) {
            if (response.status === 200 && typeof(response.data) === 'object') {
                localStorage.user = JSON.stringify(response.data);
            } else {
                localStorage.removeItem('user');
            }
        });
        return q;
    }
}])
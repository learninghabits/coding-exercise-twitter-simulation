function Controller() {
    var lodash = require("lodash");
    var user = require('./user');
    var tweet = require('./tweet');
    var cntl = {
        readUsersFile: function () {
            var path = process.argv[2] || './user.txt';           
            return user.read(path);
        },
        readTweetFiles: function () {
            var path = process.argv[3] || './tweet.txt';           
            return tweet.read(path);
        },
        matchUserTweets: function (users, tweets) {
            return new Promise(function (onSuccess, onError) {
                var userTweets = [];
                users.forEach(function (user) {
                    var combinedTweets = [];
                    combinedTweets = combinedTweets.concat(lodash.filter(tweets, { 'user': user.user.trim() }));
                    user.follows.forEach(function (follow) {
                        combinedTweets = combinedTweets.concat(lodash.filter(tweets, { 'user': follow.trim() }));
                    }, this);
                    userTweets.push({
                        user: user.user,
                        combinedTweets: combinedTweets
                    })
                }, this);
                return onSuccess(userTweets);
            });
        },
        displayOutput: function (userTweets) {
            return new Promise(function (onSuccess, onError) {
                userTweets.forEach(function (ut) {
                    console.log(ut.user);
                    ut.combinedTweets.forEach(function (tweet) {
                        console.log("\t" + tweet.user + " : " + tweet.tweet);
                    });
                }, this);
                return onSuccess();
            });
        }
    }
    return cntl;
};

module.exports = {
    run: function () {
        var controller = new Controller();
        controller.readUsersFile()
            .then(function (users) {
                return controller.readTweetFiles()
                    .then(function (tweets) {
                        return controller.matchUserTweets(users, tweets);
                    });
            })
            .then(controller.displayOutput)
            .catch(function (error) {
                console.log(error);
            });
    }
};
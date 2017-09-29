function User() {
    var _ = require('underscore');
    var lodash = require('lodash');
    return {
        readFile: function (path) {
            return new Promise(function (onSuccess, onError) {
                try {
                    var fs = require('fs-utils');
                    var contents = fs.readFileSync(path).toString();
                    return onSuccess(contents);
                }
                catch (error) {
                    return onError(error);
                }
            });
        },
        splitLines: function (fileContents) {
            return new Promise(function (onSuccess, onError) {
                var lines = fileContents.split('\n');
                return onSuccess(lines);
            });
        },
        extractValidLines: function (lines) {
            return new Promise(function (onSuccess, onError) {
                try {
                    var pattern = /@\w+\s(follows)\s(@\w+)*(\,\s@\w+)*/g //regex to macth pattern @USER1 follows @USER2, @USER3
                    var validLines = lines.filter(function (l) {
                        return l.match(pattern);
                    })
                    return onSuccess(validLines);
                }
                catch (error) {
                    return onError(error);
                }
            });
        },
        removeDuplicatesFollows: function (users) {
            return new Promise(function (onSuccess, onError) {
                try {
                    users.forEach(function (user) {
                        var noDuplicate = [];
                        user.follows.forEach(function (follow) {
                            if (!lodash.includes(noDuplicate, follow)) {
                                noDuplicate.push(follow);
                            }
                        }, this);
                        user.follows = noDuplicate;
                    }, this);
                    return onSuccess(users);
                }
                catch (error) {
                    return onError(error);
                }
            });
        },
        sortByUserName: function (users) {
            return new Promise(function (onSuccess, onError) {
                var sorted = _.sortBy(users, 'user');
                return onSuccess(sorted);
            });
        },
        mapToUserObjects: function (lines) {
            return new Promise(function (onSuccess, onError) {
                try {
                    var users = [];
                    lines.forEach(function (line) {
                        line = line.replace(' follows', ',');
                        var items = line.split(',');
                        var user = items.splice(0, 1)[0];
                        var duplicated = lodash.find(users, { 'user': user });
                        if (duplicated) {
                            var indx = users.indexOf(duplicated);
                            users[indx].follows = users[indx].follows.concat(items);
                        }
                        else {
                            users.push({
                                user: user,
                                follows: items
                            });
                        }
                    }, this);
                    return onSuccess(users);
                }
                catch (error) {
                    return onError(error);
                }
            });
        }
    }
}

module.exports = {
    read: function (path) {
        var user = new User();
        return user.readFile(path)
            .then(user.splitLines)
            .then(user.extractValidLines)
            .then(user.mapToUserObjects)
            .then(user.removeDuplicatesFollows)
            .then(user.sortByUserName);
    }
}
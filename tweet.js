function Tweet() {
    var fs = require('fs-utils');
    return {
        readFile: function (path) {
            return new Promise(function (onSuccess, onError) {
                try {
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
                    var pattern = /@\w+>\s\w+(\s\w+)*/g //regex to macth pattern @USER1> tweet -- a better pattern
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
        mapToTweetObject: function (lines) {
            return new Promise(function (onSuccess, onError) {
                try {
                    var tweets = [];
                    lines.forEach(function (line) {
                        var items = line.split('>');
                        tweets.push({
                            user: items[0],
                            tweet: items[1]
                        });
                    }, this);
                    return onSuccess(tweets);
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
        var tweet = new Tweet();
        return tweet.readFile(path)
            .then(tweet.splitLines)
            .then(tweet.extractValidLines)
            .then(tweet.mapToTweetObject);
    }
}
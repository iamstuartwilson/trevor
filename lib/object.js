var objectKit = require('objectkit').Ok;

var trevorObject = {
    group: function groupValues(data, props) {
        var chain = {};

        if (typeof props === 'string') {
            props = [props];
        }

        props.map(function(prop) {
            chain[prop] = data.map(function(dataSet) {
                return objectKit(dataSet).getIfExists(prop);
            });
        });

        return chain;
    },

    reduce: function reduceValues(data, cbs) {
        var reduced = {};

        for (var prop in cbs) {
            if (typeof data[prop] === 'undefined') {
                reduced[prop] = null;
            } else {
                reduced[prop] = cbs[prop](data[prop]);
            }
        }

        return reduced;
    },

    reduceAll: function reduceAllValue(data, cbs) {
        return data.map(function(item) {
            return trevorObject.reduce(item, cbs);
        });
    },
};

module.exports = trevorObject;

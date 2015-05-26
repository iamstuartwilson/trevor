var objectKit = require('objectkit').Ok;

module.exports = {
    add: function(vals) {
        return vals.reduce(function(a, b) {
            return a + b;
        });
    },

    average: function(vals) {
        return this.add(vals) / vals.length;
    },

    highest: function(vals) {
        return Math.max.apply(null, vals);
    },

    lowest: function(vals) {
        return Math.min.apply(null, vals);
    },

    groupByValue: function(dataSet, val) {
        var data = {};

        dataSet.map(function(item) {
            var itemVal;

            if (typeof val === 'object') {
                var prop = Object.keys(val)[0];

                if (typeof val[prop] === 'function') {
                    itemVal = val[prop](objectKit(item).getIfExists(prop));
                }
            } else {
                itemVal = objectKit(item).getIfExists(val);
            }

            if (itemVal) {
                if (! data[itemVal]) {
                    data[itemVal] = [];
                }

                data[itemVal].push(item);
            }
        });

        return data;
    }
}

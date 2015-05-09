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
    }
}

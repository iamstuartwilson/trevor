module.exports = {
    group: function groupValues(data, props) {
        var chain = {};

        if (typeof props === 'string') {
            props = [props];
        }

        props.map(function(prop) {
            chain[prop] = data.map(function(dataSet) {
                return dataSet[prop];
            });
        });

        return chain;
    },

    reduce: function reduceValues(data, cbs) {
        var reduced = {};

        for (var prop in cbs) {
            reduced[prop] = cbs[prop](data[prop]);
        }

        return reduced;
    }
}

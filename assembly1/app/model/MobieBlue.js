
Ext.define('Assembly1.model.MobieBlue', {
    extend: 'Ext.data.Model',
    fields: ['filter', 'disperser'],

proxy: {
        // Proxy for the command service REST API
        // (from the common package - see common.CommandServiceProxy in ext/packages/common/src)
        type: 'cmdsvc',

        // Function used by the proxy to query the server (and also to submit the values)
        getModelData: function(scope) {
            if (scope instanceof Assembly1.model.MobieBlue) {
                // doing a submit
                var filter = scope.raw['filter'];
                var disperser = scope.raw['disperser'];
                if (!filter && !disperser) return null; // nothing was changed
            }

            if (!filter) filter = '';
            if (!disperser) disperser = '';
            var obsId = "Obs0001"; // XXX TODO FIXME
            var filterConfig = { "setup": { "obsId": obsId, "tmt.mobie.blue.filter": { "value": filter } } };
            var disperserConfig = { "setup": { "obsId": obsId, "tmt.mobie.blue.disperser": { "value": disperser } } };
            var obj = [];

            if (scope instanceof Assembly1.model.MobieBlue) {
                // only submit modified parts
                if (filter) obj.push(filterConfig);
                if (disperser) obj.push(disperserConfig);
            } else {
                obj.push(filterConfig);
                obj.push(disperserConfig);
            }

            var json = { 'configs': obj };
            console.log("json = " + JSON.stringify(json));

//            return Ext.apply(obj); // XXX Ext.apply needed?
            return json;
        }
    }
});

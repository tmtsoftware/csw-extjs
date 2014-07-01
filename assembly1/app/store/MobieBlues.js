
Ext.define('Assembly1.store.MobieBlues', {
    extend:  'Ext.data.Store',
    model: 'Assembly1.model.MobieBlue',
    autoLoad: true,
    getValue: function(records, prefix) {
        for(rec in records) {
            var setup = rec.raw.setup;
            if (setup.hasOwnProperty(prefix)) {
                return setup[prefix].value;
            }
        }
        return null;
    },
    listeners: {
        load: function (store, records, success, operations) {
            var form = Ext.getCmp('assembly1Form');
            var filter = getValue(records, 'tmt.mobie.blue.filter')
            var disperser = getValue(records, 'tmt.mobie.blue.disperser')
            var m = Ext.create('Assembly1.model.MobieBlue', {
                filter: filter,
                disperser: disperser
            });
            form.loadRecord(m);
        }
    }
});




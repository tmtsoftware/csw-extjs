
Ext.define('Assembly1.store.MobieBlues', {
    extend:  'Ext.data.Store',
    model: 'Assembly1.model.MobieBlue',
    autoLoad: true,
    listeners: {
        // TODO: put this in a controller?
        load: function (store, records, success, operations) {
            var form = Ext.getCmp('assembly1Form');
            // XXX Order might be different!?!
            var m = Ext.create(Ext.ModelManager.getModel('Assembly1.model.MobieBlue'), {
                filter: records[0].raw.setup['tmt.mobie.blue.filter'].value,
                disperser: records[1].raw.setup['tmt.mobie.blue.disperser'].value
            });
            form.loadRecord(m);
        }
    }
});




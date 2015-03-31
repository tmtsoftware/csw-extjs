// Common base class for proxies that communicate with the Spray based command service web REST web server.
Ext.define('common.CommandServiceProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: "proxy.cmdsvc",
    actionMethods: {
        create: 'POST',
        read: 'POST',
        update: 'POST'
    },
    api: {
        create: '/queue/submit',
        read: '/get',
        update: '/queue/submit'
    },
    reader: {
        type: 'json',
        root: 'configs'
    },
    writer: {
        type: 'json',
        root: 'configs',
        writeAllFields: true,
        nameProperty: 'mapping',
        expandData: true
    },

    // Need to override this in order to post the config when reading the current values.
    // This method is also called when submitting the edited values.
    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation);

        if (operation.allowWrite()) {
            request = writer.write(request);
        }

        // getModelData(scope) has to be implemented in the model class
        var json = Ext.encode(this.getModelData(scope));

        Ext.apply(request, {
            jsonData: json,
            binary: this.binary,
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false // explicitly set it to false, ServerProxy handles caching
        });

        Ext.Ajax.request(request);

        return request;
    },

    listeners: {
        // This is for displaying an error message when the HTTP server has exited, but the web UI is still running
        exception: function (proxy, request, operation) {
            if (request.responseText != undefined) {
                // responseText was returned, decode it
                responseObj = Ext.decode(request.responseText, true);
                if (responseObj != null && responseObj.msg != undefined) {
                    // message was returned
                    Ext.Msg.alert('Error', responseObj.msg);
                }
                else {
                    // responseText was decoded, but no message sent
                    Ext.Msg.alert('Error', 'There was a problem communicating with the command service');
                }
            }
            else {
                // no responseText sent
                Ext.Msg.alert('Error', 'There was a problem communicating with the command service');
            }
        }
    }

});


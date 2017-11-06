var Ajax = (function(window, document){
    'use strict'
    function get(url, type){
        var xhr = new XMLHttpRequest()
        var exports = {
            type: type || 'text',
            callbacks: [],
            catchers: [],
            then: then,
            catch: catchError
        }
        xhr.onreadystatechange = resolve.bind(exports)
        xhr.open('GET', url, true)
        xhr.send(null)
        return exports
    }

    function resolve(e){
        if(e.target.readyState == 4){
            if(e.target.status == 200){
                var response = (this.type == 'json') ? JSON.parse(e.target.responseText) : e.target.responseText
                callback(this.callbacks, response)
            } else {
                callback(this.catchers, e.target.status)
            }
        }
    }

    function callback(calls, e){
        for(var i = 0, l = calls.length; i<l; i++)
            calls[i].call(this, e)
    }

    function then(callback){
        this.callbacks.push(callback);
        return this
    }

    function catchError(callback){
        this.catchers.push(callback);
        return this
    }

    return get

})(window, document)

var DatabaseResolver = (function(){
    'use strict'

    var onReady = []
    var database = []
    var exports = {
        init: init,
        ready: ready,
        find: find,
        random: random
    }

    function init(url){
        Ajax(url, 'json').then(load)
        return exports;
    }

    function load(data){
        database = data
        callback(onReady, exports)
    }

    function ready(fn){
        onReady.push(fn)
        return exports
    }

    function find(name){
        for(var i = 0, l = database.length; i<l; i++){
            if(database[i].name == name)
                return database[i]
        }

        return null;
    }

    function random(number){
        if(database.length === 0)
            return []
        var db = [].concat(database)
        var rand = []
        while(rand.length < number && db.length > 0)
        {
            var index = Math.floor(Math.random() * db.length)
            rand.push(db.splice(index, 1)[0])
        }
        return rand
    }

    function callback(calls, e){
        for(var i = 0, l = calls.length; i<l; i++)
            calls[i].call(this, e)
    }

    return exports
})()

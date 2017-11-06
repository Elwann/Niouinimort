var url = '';

var star = document.querySelector("#star");
var reponse = document.querySelector("#reponse");
var search = document.querySelector("#search");

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var WikiSearch = (function(){
    var callback = function(data){ console.log(data); };

    function wikiSearch(search){
        return 'https://fr.wikipedia.org/w/api.php?format=json&action=query&titles='+encodeURIComponent(toTitleCase(search))+'&prop=revisions&rvprop=content&callback=parseResponse';
    }

    function checkDeath(name){
        var head = document.getElementsByTagName('head').item(0);
        var script = document.createElement('script');
        script.setAttribute('src', wikiSearch(name));
        head.appendChild(script);
    }

    var naissance = /{{date de naissance\|(.+?)}}/igm;
    var mort = /{{date de décès\|(.+?)}}/igm;
    var redirection = /#redirection \[\[(.+?)\]\]/igm;

    function parseResponse(data){
        for(var page in data.query.pages){
            var title = '<strong>'+data.query.pages[page].title+' :</strong><br>';
            if(page == "-1"){
                return null;
            }

            var revision = data.query.pages[page].revisions[0]['*'];
            var found = redirection.exec(revision);
            if(found){
                checkDeath(found[1]);
                return;
            }

            var birth = naissance.exec(revision);
            var death = mort.exec(revision);

            console.log(birth, death);
            console.log(parseDate(birth), parseDate(death));
            if(birth){
                if(death){
                    showMessage(title+'Mort', 'success');
                } else {
                    showMessage(title+'En vie', 'success');
                }
                return;
            } else {
                showMessage(title+'Date non trouvé', 'error');
                return;
            }

            showMessage(title+'Erreur inconnue', 'error');
        }
    }

    function parseDate(date){
        if(!date)
            return null;
        var d = date[1].split('|');
        return new Date(d[2], parseMonth(d[1]), d[0]);
    }

    function parseMonth(month){
        var m = parseInt(month, 10);
        if(!isNaN(m))
            return m-1;

        switch(month){
            case 'janvier':
                return 0;
            case 'février':
                return 1;
            case 'mars':
                return 2;
            case 'avril':
                return 3;
            case 'mai':
                return 4;
            case 'juin':
                return 5;
            case 'juillet':
                return 6;
            case 'août':
                return 7;
            case 'septembre':
                return 8;
            case 'octobre':
                return 9;
            case 'novembre':
                return 10;
            case 'décembre':
                return 11;
        }
    }


})();

function parseResponse(data){
    for(var page in data.query.pages){
        var title = '<strong>'+data.query.pages[page].title+' :</strong><br>';
        if(page == "-1"){
            return null;
        }

        var revision = data.query.pages[page].revisions[0]['*'];
        var found = redirection.exec(revision);
        if(found){
            checkDeath(found[1]);
            return;
        }

        var birth = naissance.exec(revision);
        var death = mort.exec(revision);

        console.log(birth, death);
        console.log(parseDate(birth), parseDate(death));
        if(birth){
            if(death){
                showMessage(title+'Mort', 'success');
            } else {
                showMessage(title+'En vie', 'success');
            }
            return;
        } else {
            showMessage(title+'Date non trouvé', 'error');
            return;
        }

        showMessage(title+'Erreur inconnue', 'error');
    }
}


function showMessage(message, type){
    type = type || 'message';
    reponse.className = type;
    reponse.innerHTML = message;
}


function validateCheck(){
    if(!star.value)
        return;

    showMessage('Recherche...', 'message');
    checkDeath(star.value);
}

search.addEventListener('click', validateCheck, false);

import { Questioner } from './questioner/questioner.js'

var Config = Config || {};
var url = Config.url || 'http://localhost:3000';

var socket = (io) ? io(url) : null;
var room;

var questioner;

var box = document.querySelector('.box')
var names = document.querySelectorAll('.star-name')
var response = document.querySelector('.response')

var isAlive = document.querySelector('button.is-alive')
var isDead = document.querySelector('button.is-dead')
var next = document.querySelector('button.next')

function onResponse(event){
    var dead = event.target.getAttribute('data-dead')
    var r = questioner.respond(dead == 'true')

    var correct = (r.correct) ? 'Vrai' : 'Faux'
    var death = (r.dead) ? 'Est mort' : 'Il'
    response.innerHTML = correct + ' : ' + death + ' a ' + r.age + ' ans'

    box.classList.add('flipped')

    next.addEventListener('click', questioner.next, false)
    isAlive.removeEventListener('click', onResponse)
    isDead.removeEventListener('click', onResponse)
}

function onGameStart(){
    // init game
}

function onNextQuestion(question){
    // show question
    forEach(names, function(name){
        name.innerHTML = question.name;
    })

    box.classList.remove('flipped')

    next.removeEventListener('click', questioner.next, false)
    isAlive.addEventListener('click', onResponse, false)
    isDead.addEventListener('click', onResponse, false)
}

function onGameEnd(){
    // show score

}

function load(resolver){
    questioner = Questioner.init({
        onGameStart: onGameStart,
        onNextQuestion: onNextQuestion,
        onGameEnd: onGameEnd
    });
    questioner.start(resolver.random(3))
}

function init(){
    DatabaseResolver.init('/assets/database.json').ready(load)
}

function forEach(arr, fn){
    for(var i = 0, l = arr.length; i<l; i++)
        fn.call(this, arr[i], i, l)
}

init()

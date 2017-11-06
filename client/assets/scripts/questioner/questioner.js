var questions = []
var currentQuestion = -1
var onGameStart
var onNextQuestion
var onGameEnd
var scores = {}

export const Questioner = {
    init: init,
    start: start,
    respond: respond,
    next: nextQuestion
}

function init(options){
    onGameStart = options.onGameStart ||  function(){}
    onNextQuestion = options.onNextQuestion ||  function(){}
    onGameEnd = options.onGameEnd ||  function(){}
    return exports
}

function start(_questions){
    currentQuestion = -1
    questions = _questions
    onGameStart.call(exports)
    nextQuestion()
    return exports
}

function respond(response){
    var q = questions[currentQuestion]
    var today = new Date()
    var birth = new Date(q.birth)
    var death = (q.death) ? new Date(q.death) : null
    var dead = (death != null)
    var age = (dead)
        ? death.getFullYear() - birth.getFullYear()
        : today.getFullYear() - birth.getFullYear()
    return {
        name: q.name,
        correct: (dead === response),
        dead: dead,
        age: age
    }
}

function nextQuestion(){
    ++currentQuestion
    if(currentQuestion > questions.length-1){
        end()
        return
    }

    onNextQuestion.call(exports, questions[currentQuestion])
}

function end(){
    onGameEnd.call(exports)
}

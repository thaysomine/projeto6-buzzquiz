let quizData = [];

let numQuestions = 1;  //constante p guardar o número de perguntas que o usuário escolher na criação do quizz
let levelQuestions; //constante p guardar nível que o usuário escolher na criação do quizz



// requisição para buscar todos os quizzes
const promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promisse.then(renderQuizzes);

// função para renderizar os quizzes retirados da api
function renderQuizzes(reply) {
    quizData = reply.data;
    console.log(quizData);
    const quizList = document.querySelector(".all-quizzes");
    console.log(quizList);

    for (let i = 0; i < quizData.length; i++) {
        quizList.innerHTML += `
        <div class="quiz-main">
            <img src="${quizData[i].image}" alt="modelo">
            <div class="description">${quizData[i].title}</div>
        </div>
        `;
    }
}


//função para quando o usuário clicar pra criar quizz
function createQuizz() {
    const hide = document.querySelector('.main-content');
    hide.classList.add('hiden');
    const show = document.querySelector('.first-page');
    show.classList.remove('hiden');
}

//função p salvar as informações básicas da criação do quizz

function saveBasicInfoQuizz() {
    const title = document.querySelector(".title-quizz").value;
    const urlImg = document.querySelector(".image-url-quizz").value;
    const qtQuestion = Number(document.querySelector(".qt-questions-quizz").value);
    const levels = document.querySelector(".level-quizz").value;

    numQuestions = qtQuestion;
    levelQuestions = levels;

    if ((title.length < 20) || (title.length > 65) || (qtQuestion < 4) || (levels < 3) || (validateURL(urlImg) === false)) {
        alert("Preencha os dados corretamente!");
    } else {
        quiz = {
            title: title,
            image: urlImg,
            quenstions: [],
            levels: [],
        }

        questionsQuizz();
    }
}

// função p validar url (acho q vamos usar mais vezes)

function validateURL(url) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

// criando as perguntas do quizz a partir da quantidade definida pelo user na tela anterior
function questionsQuizz() {
    const hide = document.querySelector('.first-page');
    hide.classList.add('hiden');
    const show = document.querySelector('.second-page');
    show.classList.remove('hiden');
    console.log(numQuestions);

    const questionsQuizz = document.querySelector(".screen2-creating-quizz");

    for (let i = 0; i < numQuestions; i++) {
        questionsQuizz.innerHTML += `
        <div onclick="toggleQuestions(${i + 1})" class="question-name">
            <h2>Pergunta ${i + 1}</h2>
            <button><ion-icon class="iconeQuiz" name="create-outline"></ion-icon></button>
        </div>
        <div class="container${i + 1} hiden">
            <div class="containerReal">
                <input type="text" class="n${i + 1}question-text-quiz" placeholder="Texto da pergunta">
                <input type="text" placeholder="Cor de fundo da pergunta" class="n${i + 1}color-question-quiz">
                <h2>Resposta correta</h2>
                <input type="text" placeholder="Resposta correta" class="n${i + 1}right-answer-quiz">
                <input type="text" placeholder="URL da imagem" class="n${i + 1}right-answer-url-quiz">
                <h2>Respostas incorretas</h2>
                <input type="text"  class="spaceCss n${i + 1}incorrect-answer1" placeholder="Resposta incorreta 1">
                <input type="text" class="n${i + 1}incorrect-answer1-url-quiz" placeholder="URL da imagem 1">
                <input type="text"  class="spaceCss n${i + 1}incorrect-answer2" placeholder="Resposta incorreta 2">
                <input type="text" class="n${i + 1}incorrect-answer2-url-quiz" placeholder="URL da imagem 2">
                <input type="text"  class="spaceCss n${i + 1}incorrect-answer-3" placeholder="Resposta incorreta 3">
                <input type="text" class="n${i + 1}incorrect-answer3-url-quiz" placeholder="URL da imagem 3">
            </div>
        </div>
        
        `
    }
    questionsQuizz.innerHTML += `<button class="create-question next" onclick="saveQuestions()">Prosseguir pra criar níveis</button>
    `
}

// função pra agrupar as respostas em cada pergunta na tela 3-2
function toggleQuestions(questionNumber) {
    let question = document.querySelector(".container" + questionNumber);
    question.classList.toggle('hiden');
}

//função pra validar input hexadecimal
function validateHexa(color) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(color);
}

//função pra chamar a função de validação pra cada resposta(i) na tela de respostas 3-2
function saveQuestions() {
    console.log("teste")
    for (i = 0; i < numQuestions; i++) {
        checkQuestions(i + 1);
        console.log("teste2")
    }
}

//função validação pra cada resposta(i) na tela de respostas 3-2
function checkQuestions(numQuest) {
    let checkAnswer3 = true;
    let checkAnswer4 = true;

    const questionTitle = document.querySelector(".n"+numQuest+"question-text-quiz").value;
    const questionColor = document.querySelector(".n"+numQuest+"color-question-quiz").value;

    const questionCorrectAnswer = document.querySelector(".n"+numQuest+"right-answer-quiz").value;
    const questionCorrectAnswerURLImage = document.querySelector(".n"+numQuest+"right-answer-url-quiz").value;

    const questionIncorrectAnswer1 = document.querySelector(".n"+numQuest+"incorrect-answer1").value;
    const questionIncorrectAnswer1URLImage = document.querySelector(".n"+numQuest+"incorrect-answer1-url-quiz").value;

    const questionIncorrectAnswer2 = document.querySelector(".n"+numQuest+"incorrect-answer2").value;
    const questionIncorrectAnswer2URLImage = document.querySelector(".n"+numQuest+"incorrect-answer2-url-quiz").value;

    if ((questionIncorrectAnswer2 === '') || (questionIncorrectAnswer2URLImage === '')) {
        checkAnswer3 = false;
    }

    const questionIncorrectAnswer3 = document.querySelector(".n"+numQuest+"incorrect-answer2").value;
    const questionIncorrectAnswer3URLImage = document.querySelector(".n"+numQuest+"incorrect-answer2-url-quiz").value;

    if ((questionIncorrectAnswer3 === '') || (questionIncorrectAnswer3URLImage === '')) {
        checkAnswer4 = false;
    }


    if ((questionTitle.length < 20) || (questionCorrectAnswer === '') || (validateURL(questionCorrectAnswerURLImage) === false) || (validateHexa(questionColor) === false) || (questionIncorrectAnswer1 === '') || (validateURL(questionIncorrectAnswer1URLImage) === false)) {
        alert("Preencha os dados corretamente!");
    } else {
        alert('ok')
    }
}
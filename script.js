const question = [
    {
        question : "Apa arti aksara Incung dalam bahasa Kerinci?",
        answer : [
            {text : "Bergerigi", correct: false},
            {text : "Miring atau terpancung", correct: true},
            {text : "Lurus", correct : false},
            {text : "Tidak beraturan", correct : false},
        ]
    },
    {
        question : "Pada zaman dahulu, aksara Incung ditulis di berbagai media, kecuali ...",
        answer : [
            {text : "daun lontar", correct: false},
            {text : "tanduk kerbau", correct: false},
            {text : "pohon beringin", correct : true},
            {text : "kulit kayu", correct : false},
        ]
    },
    {
        question : "Tulisan 'kota jambi' yang benar adalah",
        answer : [
            {text : "<img src='kota sarolangun.jpg' alt='Deskripsi Gambar'>", correct : false},
            {text : "<img src='Kota Batanghari incung.jpg' alt='Deskripsi Gambar'>", correct: false},
            {text : "<img src='kota jambi incung.jpg' alt='Deskripsi Gambar'>", correct : true},
            {text : "<img src='Kerinci.jpg' alt='Deskripsi Gambar'>", correct : false},
        ]
    },
    {
        question : " Tulisan aksara Incung 'Bukit Khayangan' yang benar adalah? ",
        answer : [
            {text : "<img src='Danau kerinci.jpg' alt='Deskripsi Gambar'>", correct : false},
            {text : "<img src='Bukit Khayangan.jpg' alt='Deskripsi Gambar'>", correct: true},
            {text : "<img src='Danau Kaca.jpg' alt='Deskripsi Gambar'>", correct : false},
            {text : "<img src='Bukit bulan.jpg' alt='Deskripsi Gambar'>", correct : false},
        ]
    },
    {
        question : "Apa arti kata dibawah ini?<br><img src='kalimat incung.jpg' alt='Deskripsi Gambar'>",
        answer : [ 
            {text : "Kerinci",correct: true},
            {text : "Kota", correct: false},
            {text : "Kabupaten", correct : false},
            {text : "Jambi", correct : false},
        ]
    }, 
    {
        question : "Berapa kemiringan garis pembentuk aksara Incung",
        answer : [
            {text : "45&deg",correct: true},
            {text : "60&deg", correct: false},
            {text : "40&deg", correct : false},
            {text : "70&deg", correct : false},
        ]
    },
    {
        question : "Apa arti kata dibawah ini?<br><img src='Sekepal tanah dari surga.jpg' alt='Deskripsi Gambar'>",
        answer : [
            {text : "Bumi Melayu",correct: false},
            {text : "Serumpun adat serumpun pseko ", correct: false},
            {text : "Sepucuk Jambi sembilan lurah", correct : false},
            {text : "Sekepal tanah dari surga ", correct : true},
        ]
    },
    {
        question : "Kapan aksara Incung ditetapkan sebagai warisan tak benda?",
        answer : [
            {text : "11 Oktober 2014",correct: false},
            {text : "20 Oktober 2014", correct: false},
            {text : "17 Oktober 2014", correct : true},
            {text : "16 Oktober 2014", correct : false},
        ]
    },
    {
        question : "Huruf 'da'dalam aksara Incung ditulis... ",
        answer : [
            {text : "<img src='d.jpg' alt='Deskripsi Gambar'>", correct : true},
            {text : "<img src='a.jpg' alt='Deskripsi Gambar'>", correct: false},
            {text : "<img src='b.jpg' alt='Deskripsi Gambar'>", correct : false},
            {text : "<img src='m.jpg' alt='Deskripsi Gambar'>", correct : false},
        ]
    },
    {
        question : " Aksara Incung pada zaman dahulu digunakan untuk... ",
        answer : [
            {text : "Menulis surat", correct : false},
            {text : "Menulis puisi", correct: false},
            {text : "Sebagai pajangan", correct : false},
            {text : "Dokumentasi sejarah", correct : true},
        ]
    },
];  
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");   

let currentQuestionIndex = 0 ;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;  

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

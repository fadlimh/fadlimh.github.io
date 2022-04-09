const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Manakah dari perusahaan berikut yang tidak terlibat dalam pengembangan Metaverse?',
        choice1: 'Facebook',
        choice2: 'Tencent',
        choice3: 'Apple',
        choice4: 'Amazon',
        answer: 4,
    },
    {
        question: 'Alat pengembangan utama apa yang digunakan untuk mengembangkan Metaverse?',
        choice1: 'Maya',
        choice2: 'Blender',
        choice3: 'Unity',
        choice4: '3DS Max Design',
        answer: 3,
    },
    {
        question: 'Mata uang apa yang digunakan dalam Metaverse?',
        choice1: 'Semua betul',
        choice2: 'Mata uang asing dan aset crypto',
        choice3: 'Hanya aset crypto',
        choice4: 'Non-Fungible Token (NFT) dan aset crypto',
        answer: 4,
    },
    {
        question: 'Manakah dari berikut ini yang tidak bisa dilakukan dalam Metaverse..',
        choice1: 'Games',
        choice2: 'Perbankan Internasional',
        choice3: 'Finansial',
        choice4: 'Arsitektur',
        answer: 2,
    },{
        question: 'Darimanakah istilah "Metaverse" berasal?',
        choice1: 'Berasal dari novel tahun 1992 berjudul "Snow Crash" oleh Neal Stephenson',
        choice2: 'Berasal dari The Echo Wife oleh Sarah Gaile',
        choice3: 'Berasal dari Nineteen Eighty-Four oleh George Orwell',
        choice4: 'Berasal dari Brave New World oleh Aldous Huxley',
        answer: 1,
    },{
        question: 'Pilihlah dari pilihan berikut ini yang menjelaskan secara akurat mengenai Metaverse!',
        choice1: 'Pengaturan virtual yang memungkinkan orang terhubung tanpa internet.',
        choice2: 'Dunia virtual yang mendukung teknologi 5G terbaru',
        choice3: 'Dunia virtual yang dimana tempat pengguna dapat berinteraksi satu sama lain menggunakan avatar',
        choice4: 'Dunia virtual yang dimaksudkan khusus untuk virtual reality games.',
        answer: 3,
    },{
        question: 'Manakah dari pilihan berikut ini yang bukan termasuk dalam pembagian Metaverse..',
        choice1: 'Virtual Reality (VR)',
        choice2: 'Augmented Reality (AR)',
        choice3: 'Mixed Reality (MR)',
        choice4: 'Personal Reality (PR)',
        answer: 4,
    },{
        question: 'Seorang siswa sedang memindai sebuah item di dunia nyata dan smartphone mereka memberi tahu apa itu. Merupakan contoh dari..',
        choice1: 'Augmented Reality (AR)',
        choice2: 'Non-immersive virtual reality',
        choice3: 'Fully-immersive virtual reality',
        choice4: 'MAP',
        answer: 1,
    },{
        question: 'Game Pokemon Go merupakan contoh dari..',
        choice1: 'Mixed Reality (MR)',
        choice2: 'Virtual Reality (VR)',
        choice3: 'Extended Reality (XR)',
        choice4: 'Augmented Reality (AR)',
        answer: 4,
    },{
        question: 'Headset seperti Oculus Rift atau HTC Vive merupakan contoh dari..',
        choice1: 'Mixed Reality (MR)',
        choice2: 'Virtual Reality (VR)',
        choice3: 'Extended Reality (XR)',
        choice4: 'Augmented Reality (AR)',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
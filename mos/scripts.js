let currentEvaluationType = 'MOS';
let currentSampleIndex = 0;
const mosSamples = ['mos-sample1.wav', 'mos-sample2.wav']; // Add your MOS sample URLs here
const pairSamples = [
    { a: 'pair1-a.wav', b: 'pair1-b.wav' }, 
    { a: 'pair2-a.wav', b: 'pair2-b.wav' }
];

function login() {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('evaluation-section').style.display = 'block';
        loadNextSample();
    } else {
        alert('Please enter a username');
    }
}

function loadNextSample() {
    if (currentEvaluationType === 'MOS') {
        document.getElementById('evaluation-title').innerText = 'Mean Opinion Score (MOS) Evaluation';
        document.getElementById('mos-rating').style.display = 'block';
        document.getElementById('cmos-smos-rating').style.display = 'none';
        document.getElementById('audio-source').src = mosSamples[currentSampleIndex];
    } else {
        document.getElementById('evaluation-title').innerText = 'Comparison Mean Opinion Score (CMOS/SMOS) Evaluation';
        document.getElementById('mos-rating').style.display = 'none';
        document.getElementById('cmos-smos-rating').style.display = 'block';
        document.getElementById('audio-a').src = pairSamples[currentSampleIndex].a;
        document.getElementById('audio-b').src = pairSamples[currentSampleIndex].b;
    }
}

function submitRating() {
    const feedback = document.getElementById('feedback').value;
    const rating = document.querySelector('input[name="mos"]:checked')?.value || 
                   document.querySelector('input[name="cmos"]:checked')?.value;
    if (!rating) {
        alert('Please select a rating');
        return;
    }

    // Save or send feedback, rating, and current sample info

    currentSampleIndex++;
    if (currentSampleIndex < mosSamples.length) {
        loadNextSample();
    } else {
        alert('Evaluation complete. Thank you!');
    }
}

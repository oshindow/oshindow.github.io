let currentEvaluationType = 'MOS';
let currentSampleIndex = 0;
let mosSamplesCompleted = 0;
let cmosSamplesCompleted = 0;
let smosTimbreCompleted = 0;
let smosAccentCompleted = 0;

const mosSamples = ['mos-sample1.wav', 'mos-sample2.wav']; // Add your MOS sample URLs here
const cmosSamples = [
    { a: 'pair1-a.wav', b: 'pair1-b.wav' }, 
    { a: 'pair2-a.wav', b: 'pair2-b.wav' }
];
const smosTimbreSamples = [
    { a: 'timbre1-a.wav', b: 'timbre1-b.wav' }, 
    { a: 'timbre2-a.wav', b: 'timbre2-b.wav' }
];
const smosAccentSamples = [
    { a: 'accent1-a.wav', b: 'accent1-b.wav' }, 
    { a: 'accent2-a.wav', b: 'accent2-b.wav' }
];

function register() {
    const name = document.getElementById('name').value;
    const firstLanguage = document.getElementById('first-language').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const email = document.getElementById('email').value;

    if (name && firstLanguage && age && sex && email) {
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('evaluation-section').style.display = 'block';
        loadNextSample();
    } else {
        alert('Please fill in all fields');
    }
}

function loadNextSample() {
    if (mosSamplesCompleted < 60) {
        currentEvaluationType = 'MOS';
        document.getElementById('evaluation-title').innerText = 'Mean Opinion Score (MOS) Evaluation';
        document.getElementById('mos-rating').style.display = 'block';
        document.getElementById('cmos-smos-rating').style.display = 'none';
        document.getElementById('audio-source').src = mosSamples[currentSampleIndex % mosSamples.length];
    } else if (cmosSamplesCompleted < 30) {
        currentEvaluationType = 'CMOS';
        document.getElementById('evaluation-title').innerText = 'Comparison Mean Opinion Score (CMOS) Evaluation';
        document.getElementById('mos-rating').style.display = 'none';
        document.getElementById('cmos-smos-rating').style.display = 'block';
        document.getElementById('audio-a').src = cmosSamples[currentSampleIndex % cmosSamples.length].a;
        document.getElementById('audio-b').src = cmosSamples[currentSampleIndex % cmosSamples.length].b;
    } else if (smosTimbreCompleted < 30) {
        currentEvaluationType = 'SMOS-Timbre';
        document.getElementById('evaluation-title').innerText = 'Similarity Mean Opinion Score (SMOS) for Timbre Evaluation';
        document.getElementById('mos-rating').style.display = 'none';
        document.getElementById('cmos-smos-rating').style.display = 'block';
        document.getElementById('audio-a').src = smosTimbreSamples[currentSampleIndex % smosTimbreSamples.length].a;
        document.getElementById('audio-b').src = smosTimbreSamples[currentSampleIndex % smosTimbreSamples.length].b;
    } else if (smosAccentCompleted < 30) {
        currentEvaluationType = 'SMOS-Accent';
        document.getElementById('evaluation-title').innerText = 'Similarity Mean Opinion Score (SMOS) for Accent Evaluation';
        document.getElementById('mos-rating').style.display = 'none';
        document.getElementById('cmos-smos-rating').style.display = 'block';
        document.getElementById('audio-a').src = smosAccentSamples[currentSampleIndex % smosAccentSamples.length].a;
        document.getElementById('audio-b').src = smosAccentSamples[currentSampleIndex % smosAccentSamples.length].b;
    } else {
        alert('All evaluations completed. Thank you for your participation!');
    }
}

function submitRating() {
    const feedback = document.getElementById('feedback

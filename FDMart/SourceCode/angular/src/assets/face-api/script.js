const video = document.getElementById('video')
const threshold = 0.6
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./assets/face-api/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./assets/face-api/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./assets/face-api/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./assets/face-api/models')
]).then()

function startVideo() {
    navigator.getUserMedia({ video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

async function check_distance(base64_1, base64_2) {

    var my_face = document.getElementById('face1');
    my_face.src = base64_1;
    var check_face = document.getElementById('face2');
    check_face.src = base64_2;

    const descriptor = await faceapi.computeFaceDescriptor(my_face);
    const descriptor_train = await faceapi.computeFaceDescriptor(check_face);
    const distance = faceapi.utils.round(
        faceapi.euclideanDistance(descriptor, descriptor_train)
    )
    return distance;
}
// video.addEventListener('play', () => {
//     const canvas = faceapi.createCanvasFromMedia(video)

//     document.body.append(canvas)
//     const displaySize = { width: video.width, height: video.height }
//     faceapi.matchDimensions(canvas, displaySize)
//     setInterval(async() => {
//         const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//         const resizedDetections = faceapi.resizeResults(detections, displaySize)

//         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//         faceapi.draw.drawDetections(canvas, resizedDetections)
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

//         const canvas2 = document.getElementById('canvas');
//         let image = canvas2.toDataURL('image/jpeg', 1.0);

//         var my_face = document.getElementById('face2');
//         my_face.src = image;
//         const descriptor = await faceapi.computeFaceDescriptor(my_face);
//         const descriptor_train = await faceapi.computeFaceDescriptor(document.getElementById('face1'));
//         const distance = faceapi.utils.round(
//             faceapi.euclideanDistance(descriptor, descriptor_train)
//         )
//         let text = distance
//         let bgColor = '#ffffff'
//         if (distance > threshold) {
//             text += ' (no match)'
//             bgColor = '#ce7575'
//         }
//         document.getElementById('distance').value = text
//     }, 100)
// })

const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
const TINY_FACE_DETECTOR = 'tiny_face_detector'


let selectedFaceDetector = SSD_MOBILENETV1

// ssd_mobilenetv1 options
let minConfidence = 0.5

// tiny_face_detector options
let inputSize = 512
let scoreThreshold = 0.5

function getFaceDetectorOptions() {
    return selectedFaceDetector === SSD_MOBILENETV1 ?
        new faceapi.SsdMobilenetv1Options({ minConfidence }) :
        new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

function onIncreaseMinConfidence() {
    minConfidence = Math.min(faceapi.utils.round(minConfidence + 0.1), 1.0)
    $('#minConfidence').val(minConfidence)
    updateResults()
}

function onDecreaseMinConfidence() {
    minConfidence = Math.max(faceapi.utils.round(minConfidence - 0.1), 0.1)
    $('#minConfidence').val(minConfidence)
    updateResults()
}

function onInputSizeChanged(e) {
    changeInputSize(e.target.value)
    updateResults()
}

function changeInputSize(size) {
    inputSize = parseInt(size)

    const inputSizeSelect = $('#inputSize')
    inputSizeSelect.val(inputSize)
    inputSizeSelect.material_select()
}

function onIncreaseScoreThreshold() {
    scoreThreshold = Math.min(faceapi.utils.round(scoreThreshold + 0.1), 1.0)
    $('#scoreThreshold').val(scoreThreshold)
    updateResults()
}

function onDecreaseScoreThreshold() {
    scoreThreshold = Math.max(faceapi.utils.round(scoreThreshold - 0.1), 0.1)
    $('#scoreThreshold').val(scoreThreshold)
    updateResults()
}

function onIncreaseMinFaceSize() {
    minFaceSize = Math.min(faceapi.utils.round(minFaceSize + 20), 300)
    $('#minFaceSize').val(minFaceSize)
}

function onDecreaseMinFaceSize() {
    minFaceSize = Math.max(faceapi.utils.round(minFaceSize - 20), 50)
    $('#minFaceSize').val(minFaceSize)
}

function getCurrentFaceDetectionNet() {
    if (selectedFaceDetector === SSD_MOBILENETV1) {
        return faceapi.nets.ssdMobilenetv1
    }
    if (selectedFaceDetector === TINY_FACE_DETECTOR) {
        return faceapi.nets.tinyFaceDetector
    }
}

function isFaceDetectionModelLoaded() {
    return !!getCurrentFaceDetectionNet().params
}

async function changeFaceDetector(detector) {
    ['#ssd_mobilenetv1_controls', '#tiny_face_detector_controls']
    .forEach(id => $(id).hide())

    selectedFaceDetector = detector
    const faceDetectorSelect = $('#selectFaceDetector')
    faceDetectorSelect.val(detector)
    // faceDetectorSelect.material_select()

    $('#loader').show()
    if (!isFaceDetectionModelLoaded()) {
        await getCurrentFaceDetectionNet().load('./assets/face-api/models')
    }

    $(`#${detector}_controls`).show()
    $('#loader').hide()
}

async function onSelectedFaceDetectorChanged(e) {
    selectedFaceDetector = e.target.value

    await changeFaceDetector(e.target.value)
    updateResults()
}

function initFaceDetectionControls() {
    const faceDetectorSelect = $('#selectFaceDetector')
    faceDetectorSelect.val(selectedFaceDetector)
    faceDetectorSelect.on('change', onSelectedFaceDetectorChanged)
    faceDetectorSelect.material_select()

    const inputSizeSelect = $('#inputSize')
    inputSizeSelect.val(inputSize)
    inputSizeSelect.on('change', onInputSizeChanged)
    inputSizeSelect.material_select()
}

async function runSetting() {
    // load face detection and age and gender recognition models
    // and load face landmark model for face alignment
    await changeFaceDetector('ssd_mobilenetv1')
    await faceapi.loadFaceLandmarkModel('./assets/face-api/models')
    await faceapi.nets.ageGenderNet.load('./assets/face-api/models')

  }
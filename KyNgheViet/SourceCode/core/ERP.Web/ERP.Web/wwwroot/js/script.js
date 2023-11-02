const video = document.getElementById('video');
    
const SSD_MOBILENETV1 = 'ssd_mobilenetv1';
const TINY_FACE_DETECTOR = 'tiny_face_detector';
let minConfidence = 0.5;
// tiny_face_detector options
let inputSize = 512;
let scoreThreshold = 0.5;

//Promise.all([
//    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//    faceapi.nets.faceExpressionNet.loadFromUri('/models')
//]).then(startVideo)

//function startVideo() {
//    navigator.getUserMedia(
//        { video: {} },
//        stream => video.srcObject = stream,
//        err => console.error(err)
//    )
//}
let selectedFaceDetector = SSD_MOBILENETV1

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

function getFaceDetectorOptions() {
    return selectedFaceDetector === SSD_MOBILENETV1 ?
        new faceapi.SsdMobilenetv1Options({ minConfidence }) :
        new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
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
        await getCurrentFaceDetectionNet().load('/')
    }

    $(`#${detector}_controls`).show()
    $('#loader').hide()
}
async function runSetting() {
    await changeFaceDetector('ssd_mobilenetv1')
    await faceapi.loadFaceLandmarkModel('/')
    await faceapi.nets.ageGenderNet.load('/')

}
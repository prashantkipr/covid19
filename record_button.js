"use strict";

let audio_cough = null;
let audio_count = null;
let audio_aaa = null;
let audio_eee = null;
let audio_ooo = null;
let audio_az = null;

 $(function(){

 window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.URL = window.URL || window.webkitURL;
navigator.getUserMedia =
    navigator.getUserMedia
    || navigator.webkitGetUserMedia
     || navigator.mozGetUserMedia
     || navigator.msGetUserMedia
     || navigator.mediaDevices.getUserMedia;
navigator.cancelAnimationFrame =
    navigator.cancelAnimationFrame
    || navigator.webkitCancelAnimationFrame
     || navigator.mozCancelAnimationFrame;
navigator.requestAnimationFrame =
     navigator.requestAnimationFrame
    || navigator.webkitRequestAnimationFrame
    || navigator.mozRequestAnimationFrame;


let navbuttons = $('.next,.previous');

let createRecorder = function(div, callback){
    let recording = false;
    let rec = null;
    let ctx = null;
    let stream = null;
    let btn = div.find('button');
    let audio = div.find('audio');
    let audioInd = div.find('.audio-playback')
    let ind = div.find('.recording-indicator');

    let startRecording = function(){
        navbuttons.prop('disabled',true);
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia(
            {
              "audio": true
            }).then(streamSuccess).catch(streamFail);
        }else{
                    navigator.getUserMedia(
            {
              "audio": true
            },streamSuccess,streamFail);
        }
    };

    let streamSuccess = function(theStream){
        stream = theStream;
        recording=true;
        console.log("Recording started");
        ctx = new AudioContext();
        let src = ctx.createMediaStreamSource(stream);
        rec = new Recorder( src , {numChannels:1});
        rec.clear();
        rec.record();
        btn.addClass('recording');
        btn.prop("disabled",false);
        ind.show();
        recording=true;
        audioInd.hide();
    };

    let streamFail = function(e){
          console.log(e);
          alert('Error getting audio');
          btn.prop("disabled",false);
        navbuttons.prop('disabled',false);
    };

    let stopRecording = function(){
        console.log("Recording stopped");
        rec.stop();
        stream.getTracks().forEach(function(track){
            track.stop()
        });
        ctx.close();
        ctx = null;
        rec.exportWAV(streamDone);
    };

    let streamDone = function(blob){
        console.log("Stream done");
        const audioUrl = URL.createObjectURL(blob);
        audioInd.show();
        audio.get(0).src = audioUrl;
        audio.get(0).load();
        callback(blob);
        btn.removeClass('recording');
        btn.prop("disabled",false);
        navbuttons.prop('disabled',false);
        ind.hide();
        recording=false;
    };

    let toggleRecording=function(){
        btn.prop("disabled",true);
        if(recording){
            stopRecording();
        }else{
            startRecording();
        }
    };

    btn.click(toggleRecording);
};

createRecorder(
    $('#record-button-cough-div'),
    function(blob){
        audio_cough=blob;
    }
);

createRecorder(
    $('#record-button-count-div'),
    function(blob){
        audio_count=blob;
    }
);

createRecorder(
    $('#record-button-aaa-div'),
    function(blob){
        audio_aaa=blob;
    }
);

createRecorder(
    $('#record-button-eee-div'),
    function(blob){
        audio_eee=blob;
    }
);

createRecorder(
    $('#record-button-ooo-div'),
    function(blob){
        audio_ooo=blob;
    }
);

createRecorder(
    $('#record-button-az-div'),
    function(blob){
        audio_az=blob;
    }
);


 });

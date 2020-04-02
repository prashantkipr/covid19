/*
This is the main js file for the 
webapp used to get data and send it 
to the server and return to display 
results.
*/

$(function(){

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var form_dict = {};

//fix floats need a better solution
let weightInput = $('[name="weight"]');
if(weightInput.val()){
    let val = parseFloat(weightInput.val());
    weightInput.val(Math.floor(val));
}


$(".previous").click(function(){
		current_fs = $(this).closest('.card');
		previous_fs = current_fs.prev();

	//show the previous fieldset
	previous_fs.show();
	current_fs.hide();
});

$("[name='weighttype']:input").change(function(){
    var val = $("[name='weighttype']:input:checked"). val();
    if(val == 'lbs'){
    $('#input-group-kg').hide();
    $('#input-group-lbs').show();
    }else{
    $('#input-group-kg').show();
    $('#input-group-lbs').hide();
    }
});

$("[name='weight']").change(function(){
    var val = $("[name='weight']").val();
    if(val){
        var lbs = parseFloat(val)/2.20462;
        $("[name='weight-lbs']").val(Math.floor(lbs));
    }
});
$("[name='weight-lbs']").change(function(){
    var val = $("[name='weight-lbs']").val();
    if(val){
        var kg = parseFloat(val)*2.20462;
        $("[name='weight']").val(Math.floor(kg));
    }
});


$('#disclaimer-accept').change(function(){
    disclaimerNext = $('#disclaimer-next');
    if($('#disclaimer-accept').prop('checked')){
    disclaimerNext.prop('disabled', false);
    }else{
    disclaimerNext.prop('disabled', true);
    }
});

$("[name='havefever']:input").change(function(){
    var val = $("[name='havefever']:input:checked"). val();
    $('#form-group-temperature').toggle(val==1);
});

$("[name='temperaturetype']:input").change(function(){
    var val = $("[name='temperaturetype']:input:checked"). val();
    if(val=='F'){
    $('#temperature-c-group').hide();
    $('#temperature-f-group').show();
    }else{
    $('#temperature-f-group').hide();
    $('#temperature-c-group').show();
    }
});

$("[name='tested']:input").change(function(){
    var val = $("[name='tested']:input:checked"). val();
    $('#form-group-testpositive').toggle(val==1);
    $('#form-group-testdays').toggle(val==1);
});


$("[name='recovered']:input").change(function(){
    var val = $("[name='recovered']:input:checked"). val();
    $('#form-group-recovereddays').toggle(val==1);
    $('#form-group-hospitalized').toggle(val==1);
});


$('#health-group input').change(function(){
    let dp = $('#days-passed-group');
    let dpi = dp.find('input');
    if($("#id_status_0").prop('checked')){
      dp.show();
      dpi.prop('required', true);
    }else{
      dp.hide();
      dpi.prop('required', false);
    }
});

/*
function update_covid_rating(rating){
	console.log(rating);
	covid_rating = rating['results']['covid_rating']
	uid = rating['results']['uid']
	expected_fvc = rating['results']['expected_fvc']
	expected_llc = rating['results']['expected_llc']
	estimated_fvc = rating['results']['estimated_fvc']
	errors = rating['results']['errors']
	console.log(covid_rating,uid,expected_llc,expected_fvc,estimated_fvc)
	text = "Your generated UID is: "+uid+". Your covid rating is: "+
		covid_rating+". Your expected FVC is:"+expected_fvc+
			". Your estimated FVC is: "+estimated_fvc+
			". Your expected LLC is:"+expected_llc+"."
	$('#rating').text(text);
	$('#rating').removeClass("hidden");
	$('#loaderAndtext').hide();
}
*/


let timeoutId = null;
let waitingTime = 0;

function submitSuccess(data){
    prettyAlerts($('#msform'), data.alerts);
    if(data.submitted){
        timeoutId=setInterval(resultChecker(data.submission_id), 2000)
    }else{
       $('#processing-running').hide();
       $('#processing-start-failed').show();
    }
}


function resultChecker(submission_id){
    return (function(){
        $.ajax({
            url: "/cvd/results_json",
            type: 'GET',
            dataType: "json",
            data: {
                submission_id: submission_id
            },
            success: function(res) {
                if(res.complete){
                    clearInterval(timeoutId);
                    if(res.alerts){
                        prettyAlerts($('#msform'), res.alerts);
                    }
                    $('#processing-running').hide();
                    $('#processing-complete').show();
                }else{
                    waitingTime += 1;
                    if(waitingTime > 30){
                        $('#processing-running').hide();
                        $('#processing-timeout').show();
                        clearInterval(timeoutId);
                    }
                }
            }
        });
    });
}

function submitform(e){
	e.preventDefault();

	var selected = $('#msform > .card:visible');
	var next = selected.next();

    let inputs = selected.find(':input');
	if(next.length > 0){
        if(inputs.valid()){
                next.show();
                selected.hide();
        }else{
            inputs.each(function(i,e){
                if(!$(e).valid()){
                    e.focus();
                }
            });
        }
	}

	if($('#loaderAndtext').is(":visible")){
        var fd = new FormData(this);
        if(audio_cough != null){
            fd.set("audio_cough",audio_cough);
        }
        if(audio_count != null){
            fd.set("audio_count",audio_count);
        }
        if(audio_aaa != null){
            fd.set("audio_aaa",audio_aaa);
        }
        if(audio_eee != null){
            fd.set("audio_eee",audio_eee);
        }
        if(audio_ooo != null){
            fd.set("audio_ooo",audio_ooo);
        }
        if(audio_az != null){
            fd.set("audio_az",audio_az);
        }

        $('#loaderAndtext').show();
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: fd,
            processData: false,
            contentType: false,
            dataType: 'json'
        }).done(submitSuccess);
	}
	return false;
}

$('#msform').submit(submitform);
$('#terms').load('disclaimer.html');


});
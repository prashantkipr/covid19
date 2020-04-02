$(function(){

$.validator.addMethod('checkCm', function(value, element, params) {
    let isCm = $('#heighttype-cm').prop("checked");
    if(isCm){
        return value && parseFloat(value)>0;
    }else{
        return true;
    }
}, "This field is required.");
$.validator.addMethod('checkFt', function(value, element, params) {
    let isCm = $('#heighttype-cm').prop("checked");
    if(isCm){
        return true;
    }else{
        return value && parseFloat(value)>0;
    }
}, "This field is required.");
$.validator.addMethod('checkIn', function(value, element, params) {
    let isCm = $('#heighttype-cm').prop("checked");
        return true;
        /*
    if(isCm){
        return true;
    }else{
        return value;
    }
    */
}, "This field is required.");
$.validator.addMethod('checkKg', function(value, element, params) {
    let isKg = $('#weighttype-kg').prop("checked");
    if(isKg){
        return value && parseFloat(value)>0;
    }else{
        return true;
    }
}, "This field is required.");
$.validator.addMethod('checkLbs', function(value, element, params) {
    let isKg = $('#weighttype-lbs').prop("checked");
    if(isKg){
        return true;
    }else{
        return value && parseFloat(value)>0;
    }
}, "This field is required.");

$.validator.addMethod('checkC', function(value, element, params) {
    let isC = $('#temperaturetype-c').prop("checked");
    if(isC){
        return value && parseFloat(value)>0;
    }else{
        return true;
    }
}, "This field is required.");
$.validator.addMethod('checkF', function(value, element, params) {
    let isC = $('#temperaturetype-c').prop("checked");
    if(isC){
        return true;
    }else{
        return value && parseFloat(value)>0;
    }
}, "This field is required.");


$.validator.addMethod('checkDays', function(value, element, params) {
    if($("#id_status_0").prop('checked')){
        return value && parseFloat(value)>0;
    }else{
        return true;
    }
}, "This field is required.");



$.validator.addMethod('checkPositive', function(value, element, params) {
    var val = $('[name="tested"]').val();
    if(val == 1){
        return value;
    }else{
     return true;
    }
}, "This field is required.");

$.validator.addMethod('checkTestDays', function(value, element, params) {
    var val = $('[name="tested"]').val();
    if(val == 1){
        return value;
    }else{
     return true;
    }
}, "This field is required.");


$.validator.addMethod('checkRecDays', function(value, element, params) {
    var val = $('[name="recovered"]').val();
    if(val == 1){
        return value;
    }else{
     return true;
    }
}, "This field is required.");

$.validator.addMethod('checkHosp', function(value, element, params) {
    var val = $('[name="recovered"]').val();
    if(val == 1){
        return $('[name="hospitalized"]:checked').length>0;
    }else{
     return true;
    }
}, "This field is required.");


$('#msform').validate({
rules: {
					age: "required",
					sex: "required",
					height: "checkCm",
					feet: "checkFt",
					inches: "checkIn",
					weight: 'checkKg',
					weight_lbs: 'checkLbs',
					ethnicity: "required",

					havecough: "required",
					havesneeze: "required",
					havefever: "required",
					temperature: "checkC",
					temperature_f: "checkF",
					tested: "required",
					testpositive: "checkPositive",
					testdays: "checkTestDays",
					recovered: "required",
					recovereddays: "checkRecDays",
					hospitalized: "checkHosp",

					//"disclaimer-accept1": "required",
					//"disclaimer-accept2": "required",
				},
				messages: {
					//height: "Please enter your height",
					},
                errorElement: "em",
				errorPlacement: function ( error, element ) {
					// Add the `invalid-feedback` class to the error element
					error.addClass( "invalid-feedback" );

					if ( element.prop( "type" ) === "checkbox" ) {
						error.insertAfter( element.next( "label" ) );
					}else if(element.parents('.input-group').length>0){
						error.insertAfter( element.parents('.input-group')[0] );
					}else if(element.parents('.form-group').length>0){
                        error.insertAfter( element.parents('.form-group')[0] );
					}else if(element.parents('.form-check').length>0){
                        error.insertAfter( element.parents('.form-check') [0]);
                    }else{
						error.insertAfter( element );
                    }
				},
				highlight: function ( element, errorClass, validClass ) {
					$( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
					$('[name="'+$(element).prop('name')+'"]').addClass( "is-invalid" ).removeClass( "is-valid" );
				},
				unhighlight: function (element, errorClass, validClass) {
					$( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
					$('[name="'+$(element).prop('name')+'"]').addClass( "is-valid" ).removeClass( "is-invalid" );
				}
				});

$(':input').change(function(){
    $(this).valid();
});

});

/*
This file contains the code for 
the height stepper in the form.
*/

$(function(){

$('#height-input-group input').change(function(){
    let isCm = $('#heighttype-cm').prop("checked");
    let cm = $('#height-cm');
    let ft = $('#height-ft');
    if(isCm){
        cm.show();
        ft.hide();
    }else{
        ft.show();
        cm.hide();
    }
});

$('#feet,#inches').change(function(){
    let feet = $('#feet').val();
    let inches = $('#inches').val();

    let inchesTotal = 0;
    if(inches){
        inchesTotal += parseFloat(inches);
    }
    if(feet){
        inchesTotal += parseFloat(feet)*12;
    }

    let cm = inchesTotal*2.54;
    $('#height').val(cm.toFixed(1));
});

$('#height').change(function(){
    let cm = $('#height').val();
    let inchesTotal = 0.0;
    if(cm){
        inchesTotal+=parseFloat(cm)/2.54;
    }
    let feet = Math.floor(inchesTotal / 12);
    let inches = Math.floor(inchesTotal - (feet*12));
    $('#feet').val(feet);
    $('#inches').val(inches);
});

});

let prettyAlert = function (container, text, alertClass) {
    container.append(
        $("<div>")
            .addClass('alert')
            .addClass(alertClass)
            .addClass('alert-dismissible')
            .addClass('fade')
            .addClass('show')
            .attr('role', 'alert').html(text).append(
                $('<button/>')
                    .addClass('close')
                    .attr('data-dismiss', 'alert')
                    .attr('aria-label', 'Close')
                    .append(
                        $("<span>")
                            .attr('aria-hidden', 'true')
                            .html("&times;")
                    )
            )
    );

};

let prettyAlerts = function (container, alerts) {
if(alerts){
    alerts.forEach(function (alert) {
        prettyAlert(container, alert.message, alert.alert_class);
    });
    }
};

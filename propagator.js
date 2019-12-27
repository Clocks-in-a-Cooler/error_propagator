function get_selected(elt) {
    for (var c = 0; c < elt.options.length; c++) {
        if (elt.options[c].selected) {
            return elt.options[c].value;
        }
    }
}

function get_number(measurement, error, type) {
    if (!error) {
        return new Measurement(Number(measurement), 0, get_selected(type));
    } else {
        return new Measurement(Number(measurement), Number(error), get_selected(type));
    }
}
var answer = new Measurement(0, 0, "absolute");
var _ = function(id) { return document.getElementById(id); };

_("answer").addEventListener("click", () => {
    _("measurement_1").value = answer.value;
    _("error_1").value = answer.error;
    _("type_1").value = answer.type;
});

document.getElementById("calculate").addEventListener("click", function() {
    var m_1 = get_number(_("measurement_1").value, _("error_1").value, _("type_1"));
    var m_2 = get_number(_("measurement_2").value, _("error_2").value, _("type_2"));
    var operation = get_selected(_("operation"));
    
    var result;
    
    switch (operation) {
        case "plus":
            result = m_1.add(m_2);
            break;
        case "minus":
            result = m_1.subtract(m_2);
            break;
        case "multiply":
            result = m_1.multiply(m_2);
            break;
        case "divide":
            result = m_1.divide(m_2);
            break;
    }
    
    display(m_1, m_2, operation, result);
    answer = result;
});

function display(a, b, operation, result) {
    var elt = document.createElement("div");
    elt.className = "calculation";
    
    var operator;
    switch (operation) {
        case "plus":
            operator = " + ";
            break;
        case "minus":
            operator = " - ";
            break;
        case "multiply":
            operator = " x ";
            break;
        case "divide":
            operator = " ÷ ";
            break;
    }
    
    elt.innerHTML = a.to_string() + operator + b.to_string() + " = " + result.to_string();
    
    var colour = result.type == "percent" ? "indianred" : "steelblue";
    elt.style.backgroundColor = colour;
    
    //closure time! there goes my RAM!
    elt.addEventListener("click", () => {
        if (result.type == "percent") {
            result = result.to_absolute();
        } else {
            result = result.to_percent();
        }
        colour = result.type == "percent" ? "indianred" : "steelblue";
        elt.style.backgroundColor = colour;
        elt.innerHTML = a.to_string() + operator + b.to_string() + " = " + result.to_string();
    });
    
    _("history").appendChild(elt);
    _("history").scrollTop = _("history").scrollHeight;
}


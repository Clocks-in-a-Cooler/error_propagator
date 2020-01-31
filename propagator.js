function get_number(measurement, error, type) {
    if (!error) {
        return new Measurement(Number(measurement), 0, type.get_selected());
    } else {
        return new Measurement(Number(measurement), Number(error), type.get_selected());
    }
}

var answer = new Measurement(0, 0, "absolute");
var _ = function(id) { return document.getElementById(id); };

var type_1 = new RButton_group(_("type_1"));
var type_2 = new RButton_group(_("type_2"));
var operation = new RButton_group(_("operation"));

_("answer").addEventListener("click", () => {
    _("measurement_1").value = answer.value;
    _("error_1").value = answer.error;
    type_1.select(answer.type);
});

document.getElementById("calculate").addEventListener("click", function() {
    var m_1 = get_number(_("measurement_1").value, _("error_1").value, type_1);
    var m_2 = get_number(_("measurement_2").value, _("error_2").value, type_2);
    var operator = operation.get_selected();
    
    var result;
    
    switch (operator) {
        case "+":
            result = m_1.add(m_2);
            break;
        case "-":
            result = m_1.subtract(m_2);
            break;
        case "x":
            result = m_1.multiply(m_2);
            break;
        case "÷":
            result = m_1.divide(m_2);
            break;
    }
    
    display(m_1, m_2, operator, result);
    answer = result;
});

function display(a, b, operator, result) {
    var elt = document.createElement("div");
    elt.className = "calculation";
    
    elt.innerHTML = a.to_string(5) + " " + operator + " " + b.to_string(5) + " = " + result.to_string(5);
    
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
        elt.innerHTML = a.to_string(5) + operator + b.to_string(5) + " = " + result.to_string(5);
    });
    
    _("history").appendChild(elt);
    _("history").scrollTop = _("history").scrollHeight;
}

type_1.select("absolute");
type_2.select("absolute");
operation.select("+");
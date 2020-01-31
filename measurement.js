function Measurement(value, error, type) {
    this.value = isNaN(value) ? 0 : value;
    this.error = isNaN(error) ? 0 : error;
    this.type = type == "percent" ? "percent" : "absolute";
}

Measurement.prototype.to_percent = function() {
    if (this.type == "percent") {
        return this;
    }
    
    var percent_error = this.error / this.value * 100;
    return new Measurement(this.value, percent_error, "percent");
};

Measurement.prototype.to_absolute = function() {
    if (this.type == "absolute") {
        return this;
    }
    
    var absolute_error = this.error / 100 * this.value;
    return new Measurement(this.value, absolute_error, "absolute");
};

Measurement.prototype.add = function(other) {
    if (typeof other == "number") {
        return new Measurement(this.value + other, this.error, this.type);
    } else if (typeof other == "object" && other != null) {
        if (this.type == "absolute" && other.type == "absolute") {
            return new Measurement(this.value + other.value, this.error + other.error, "absolute");
        } else {
            return this.to_absolute().add(other.to_absolute());
        }
    } else {
        return this;
    }
};

Measurement.prototype.subtract = function(other) {
    if (typeof other == "number") {
        return new Measurement(this.value - other, this.error, this.type);
    } else if (typeof other == "object" && other != null) {
        if (this.type == "absolute" && other.type == "absolute") {
            return new Measurement(this.value - other.value, this.error + other.error, "absolute");
        } else {
            return this.to_absolute().subtract(other.to_absolute());
        }
    } else {
        return this;
    }
};

Measurement.prototype.multiply = function(other) {
    if (typeof other == "number") {
        if (this.type == "absolute") {
            return new Measurement(this.value * other, this.error * other, "absolute");
        } else if (this.type == "percent") {
            return new Measurement(this.value * other, this.error, "percent");
        }
    } else if (typeof other == "object" && other != null) {
        if (this.type == "percent" && other.type == "percent") {
            return new Measurement(this.value * other.value, this.error + other.error, "percent");
        } else {
            return this.to_percent().multiply(other.to_percent());
        }
    }
};

Measurement.prototype.divide = function(other) {
    if (typeof other == "number") {
        if (this.type == "absolute") {
            return new Measurement(this.value / other, this.error / other, "absolute");
        } else if (this.type == "percent") {
            return new Measurement(this.value / other, this.error, "percent");
        }
    } else if (typeof other == "object" && other != null) {
        if (this.type == "percent" && other.type == "percent") {
            return new Measurement(this.value / other.value, this.error + other.error, "percent");
        } else {
            return this.to_percent().divide(other.to_percent());
        }
    }
};

Measurement.prototype.to_string = function(places) {
    if (!isNaN(places) && places >= 0) {
        return "(" + round_to(this.value, places) + "±" + round_to(this.error, places) + (this.type == "percent" ? "%" : "") + ")";
    }
    
    return "(" + this.value + "±" + this.error + (this.type == "percent" ? "%" : "") + ")";
};

function round_to(num, places) {
    var factor = 10 ** places;
    return Math.round(num * factor) / factor;
}
function RButton_group(element) {
    this.element = element;
    this.key = {};
    var buttons = element.childNodes;
    buttons.forEach((b) => {
        this.key[b.innerHTML] = b;
        b.addEventListener("click", (evt) => {
            buttons.forEach(u => {
                u.className = "rbutton";
            });
            
            b.className += " selected";
        });
    });
}

RButton_group.prototype.get_selected = function() {
    return this.element.getElementsByClassName("selected")[0].innerHTML;
};

RButton_group.prototype.select = function(name) {
    if (this.key[name] != undefined) {
        this.key[name].click();
    } else {
        throw new Error(name + "is not part of this group.");
    }
};
function Component(options) {
    this.container = options.container;
    this.render = options.render;
    this.actions = options.actions;
    this.state = options.state;

    this._renderedHTML = null;

    this._initialize();
}

Component.prototype._initialize = function () {
    this._render();
    this._handleEvents(this._renderedHTML, this.actions);
};

Component.prototype._render = function () {
    var renderedHTML = this.render.call(this, this.state);

    var containerElement = document.querySelector(this.container);

    this._renderedHTML = renderedHTML;

    containerElement.append(renderedHTML);
};

Component.prototype._handleEvents = function (renderedHTML, actions) {
    //console.log(id);
    //  Walk in tags
    for (var tag in actions) {
        if (actions.hasOwnProperty(tag)) {
            var events = actions[tag];

            //  Walk in events
            for (var eventName in events) {
                if (events.hasOwnProperty(eventName)) {
                    var method = events[eventName];

                    var elements = renderedHTML.querySelectorAll(tag);

                    //  Walk in elements
                    for (var i = 0; i < elements.length; i++) {
                        var element = elements[i];
                        this.data = element; // dataya idyi yazdırdım
                        element.addEventListener(eventName, method);
                    }
                }
            }
        }
    }
};

new Component({
    container: "#app",
    render: function (state, data) {
        let listItemContainer = document.createElement("div");

        state.forEach(function (item) {
            //console.log(item);
            let listItem = document.createElement("div");
            listItem.classList.add('form__group');
            listItem.innerHTML = item.dom;

            listItemContainer.append(listItem);
        });

        return listItemContainer;
    },
    state: [
        {
            dom: `<input type="text" id="js-input-name" class="form__control js-mask-text" placeholder="Adınız" maxlength="10">`,
        },
        {
            dom: `<input type="text" id="js-input-surname" class="form__control js-mask-text" placeholder="Soyadınız" maxlength="10">`
        },
        {
            dom: `<input type="tel" id="js-input-id" class="form__control js-mask-number" placeholder="TC Kimlik Numaranız" maxlength="11">`
        },
        {
            dom: `<div class="price">
                    <input type="tel" id="js-input-home-value" class="form__control js-mask-number js-money-format" placeholder="Konut Değeri" maxlength="12">
                </div>`
        },
        {
            dom: `<div class="price">
                    <input type="tel" id="js-input-loan-amount" class="form__control js-mask-number js-money-format" placeholder="Kredi Tutarı" maxlength="10">
                </div>`
        },
        {
            dom: `<select id="js-input-loan-term" class="form__select">
                    <option value="12">12 ay</option>
                    <option value="18">18 ay</option>
                    <option value="24">24 ay</option>
                    <option value="36">36 ay</option>
                    <option value="48">48 ay</option>
                    <option value="60">60 ay</option>
                    <option value="72">72 ay</option>
                    <option value="90">90 ay</option>
                    <option value="108">108 ay</option>
                    <option value="120">120 ay</option>
                </select>`
        },
        {
            dom: '<button id="js-button-submit" class="form__btn">Devam Et</button>'
        }
    ],
    actions: {
        "#js-input-name, #js-input-surname": {
            focusout: function (e) {
                let item = e.target,
                    id = e.target.id;
                //console.log(item);
                if(item.value.trim() == '') {
                    compare(id,'Bu alan boş bırakılamaz!');
                }else if(item.value.trim().length < 2){
                    compare(id,'Bu alan 2 karakterden küçük olamaz!');
                }else if(item.value.trim().length > 10){
                    compare(id,'Bu alan 10 karakterden büyük olamaz!');
                }else {
                    compare(id,'');
                }
            }
        },
        "#js-input-id": {
            focusout: function (e) {
                let item = e.target,
                    id = e.target.id;
                if(item.value.trim() == '') {
                    compare(id,'Bu alan boş bırakılamaz!');
                }else if(item.value.trim().length < 11){
                    compare(id,'Bu alan 11 karakterden küçük olamaz!');
                }else if(item.value.trim().length > 11){
                    compare(id,'Bu alan 11 karakterden büyük olamaz!');
                }else if(idControl(item.value.trim()) == false){
                    compare(id,'TC kimlik numarası hatalı!');
                }else {
                    compare(id,'');
                }
            }
        },
        "#js-input-home-value": {
            focusout: function (e) {
                let item = e.target,
                    id = e.target.id;
                    //console.log(item.value < 1000);
                    //console.log(item.oldValue);
                if(item.oldValue == '') {
                    compare(id,'Bu alan boş bırakılamaz!');
                }else if(parseInt(item.oldValue) < 1000){
                    compare(id,'Konut değeri minimum 1.000,00 TL olmalıdır!');
                }else if(parseInt(item.oldValue) > 1000000){
                    compare(id,'Konut değeri maksimum 1.000.000,00 TL olmalıdır!');
                }else {
                    compare(id,'');
                }
            }
        },
        "#js-input-loan-amount": {
            focusout: function (e) {
                let item = e.target,
                    id = e.target.id;
                if(item.oldValue == '') {
                    compare(id,'Bu alan boş bırakılamaz!');
                }else if(parseInt(item.oldValue) < 1000){
                    compare(id,'Kredi tutarı minimum 1.000,00 TL olmalıdır!');
                }else if(parseInt(item.oldValue) > 1000000){
                    compare(id,'Kredi tutarı maksimum 1.000.000,00 TL olmalıdır!');
                }else {
                    compare(id,'');
                }
            }
        },
        "#js-button-submit": {
            click: function(e) {
                let nameInput = document.getElementById('js-input-name'),
                    surnameInput = document.getElementById('js-input-surname'),
                    idInput = document.getElementById('js-input-id'),
                    homeInput = document.getElementById('js-input-home-value'),
                    loanInput = document.getElementById('js-input-loan-amount'),
                    loanTerm = document.getElementById('js-input-loan-term');

                if(nameInput.value.trim() == '' || nameInput.value.trim().length < 2 || nameInput.value.trim().length > 10) {
                    nameInput.focus();
                }else if(surnameInput.value.trim() == '' || surnameInput.value.trim().length < 2 || surnameInput.value.trim().length > 10){
                    surnameInput.focus();
                }else if(idInput.value.trim() == '' || idInput.value.trim().length < 11 || idInput.value.trim().length > 11 || idControl(idInput.value.trim()) == false){
                    idInput.focus();
                }else if(homeInput.value == '' || parseInt(homeInput.oldValue) < 1000 || parseInt(homeInput.oldValue) > 1000000){
                    homeInput.focus();
                }else if(loanInput.value == '' || parseInt(loanInput.oldValue) < 1000 || parseInt(loanInput.oldValue) > 1000000){
                    loanInput.focus();
                }else if(parseInt(loanInput.oldValue) > (parseInt(homeInput.oldValue) * 75)/100){
                    loanInput.parents('.form__group')[0].lastChild.innerHTML = 'Kredi tutarı, ev değerinin %75’inden küçük olmalıdır.(En fazla alabileceğiniz kredi tutarı: '+moneyFormat(((homeInput.oldValue * 75)/100) - 1)+'TL)';
                    loanInput.focus();
                }else {
                    let url = `https://www.hesapkurdu.com/konut-kredisi/${loanTerm.value}-ay-${loanInput.oldValue}-tl?r=${homeInput.oldValue}&n=${nameInput.value}&s=${surnameInput.value}&t=${idInput.value}`;
                    //console.log(url);
                    window.open(url, '_blank');
                    loanInput.parents('.form__group')[0].lastChild.innerHTML = '';
                    location.reload();
                }
            }
        }
    }
});

//id control
function idControl(idNumber) {
    idNumber = String(idNumber);

    //first character 0 control
    if (idNumber.substring(0, 1) === '0') {
        return false;
    }

    let totalArr = idNumber.substr(0,10).split(''),
        total = 0,
        singleNumber = 0,
        doubleNumber = 0;

        //console.log(doubleNumber);

    let b;
    for(let a = 0; a < 9; ++a) {
        b = parseInt(totalArr[a], 10);

        if(a & 1) {
            doubleNumber += b;
        }else {
            singleNumber += b;
        }

        total += b;
    }

    if((singleNumber * 7 - doubleNumber) % 10 !== parseInt(idNumber.substr(-2,1),10)) {
        return false; 
    }

    total += parseInt(totalArr[9],10);
    if(total % 10 !== parseInt(idNumber.substr(-1),10)) {
        return false;
    }

    return true;
}

//parents func
Element.prototype.parents = function(selector) {
	var elements = [];
	var elem = this;
	var ishaveselector = selector !== undefined;
 
	while ((elem = elem.parentElement) !== null) {
		if (elem.nodeType !== Node.ELEMENT_NODE) {
			continue;
		}
 
		if (!ishaveselector || elem.matches(selector)) {
			elements.push(elem);
		}
	}
 
	return elements;
};

//console.log(document.querySelectorAll('.price')[0].parents('.form__group'));

function compare(id, errorText) {
    //console.log(errorText);
    let errorDom = document.createElement('div');
    errorDom.classList.add('form__error');
    //console.log(document.querySelectorAll('#'+id)[0].parentNode.nextSibling);
    if(document.getElementById(id).nextSibling == null || document.getElementById(id).parentNode.nextSibling == null) {
        errorDom.innerHTML = errorText;
        //console.log(document.getElementById(id).parents('.form__group')[0].appendChild(errorDom));
        document.getElementById(id).parents('.form__group')[0].appendChild(errorDom);
        if(errorText !== '') {
            document.getElementById(id).focus();
        }
    }else {
        document.getElementById(id).nextSibling.innerHTML = errorText;
        console.log(document.querySelectorAll('#'+id));
        if(document.getElementById(id).nextSibling) {
            document.getElementById(id).parentNode.nextSibling.innerHTML = errorText;
        }
        console.log(errorText);
        console.log(document.getElementById(id).parentNode.nextSibling == null);
    }
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        //console.log(textbox);
        textbox.forEach((a) => {
            //console.log(a);
            a.addEventListener(event, function() {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                }
            });
        });
        
    });
}

//only text
setInputFilter(document.querySelectorAll(".js-mask-text"), (value) => { return /^[a-zA-Z ]*$/.test(value); });

//only number
setInputFilter(document.querySelectorAll(".js-mask-number"), (value) => { return /^[0-9]*$/.test(value); });

//money
//setInputFilter(document.querySelectorAll(".js-money-format"), (value) => { return /^[0-9.,]+$/.test(value); });

//money format
function moneyFormat(n) {
    return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.').replace(/\.(\d+)$/,',$1');
}

//console.log(moneyFormat(1234567));

moneyItems(document.querySelectorAll(".js-money-format"), (value) => { return /^[0-9]*$/.test(value); })

function moneyItems(textbox, inputFilter) {
    ["keyup", "input", "change", "click", "focus", "drop", "select", "focusout"].forEach(function(event) {
        //console.log(textbox);
        textbox.forEach((a,index) => {
            //console.log(a);
            a.addEventListener(event, function(e) {
                //console.log(inputFilter(this.value));
                if (this.value > 3) {
                    var n = parseFloat(this.value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1.').replace(/\.(\d+)$/,',$1');
                    this.value = n.toLocaleString();
                }
                
            });
        });
        
    });
}
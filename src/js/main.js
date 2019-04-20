let input = () => {
    let html = '';
    input.data.forEach(element => {
        console.log(element);
        if(element.type == 'select') {
            const selectOptions = element.options;  
            let selectOptionsHtml = '';
            selectOptions.forEach(e => {selectOptionsHtml += '<option value="">'+ e.data +'</option>'});
            html += `<div class="form__group">
                        <select name="" id="${element.id}" class="form__select">${selectOptionsHtml}</select>
                    </div>`;
        }else if(element.type == 'button') {
            html += `<button id="${element.id}" class="form__btn">${element.text}</button>`;
        }else {
            html += `<div class="form__group">
                        <input type="text" placeholder="${element.placeholder}" class="form__control" id="${element.id}">
                    </div>`;
        }
    });

    return html;
}

let inputErrorMsg = () => {
    return `<div class="form__error">${inputErrorMsg.data.msg}</div>`
}

input.data = [
    {
        placeholder: 'Adınız',
        id: 'js-input-name',
        type: 'text'
    },
    {
        placeholder: 'Soyadınız',
        id: 'js-input-surname',
        type: 'text'
    },
    {
        placeholder: 'TC Kimlik Numaranız',
        id: 'js-input-id',
        type: 'number'
    },
    {
        placeholder: 'Konut Değeri',
        id: 'js-input-home-value',
        type: 'price'
    },
    {
        placeholder: 'Kredi Tutarı',
        id: 'js-input-loan-amount',
        type: 'price'
    },
    {
        id: 'js-input-loan-term',
        type: 'select',
        options: [
            {
                data: '12 ay'
            },
            {
                data: '18 ay'
            },
            {
                data: '24 ay'
            },
            {
                data: '36 ay'
            },
            {
                data: '48 ay'
            },
            {
                data: '60 ay'
            },
            {
                data: '72 ay'
            },
            {
                data: '90 ay'
            },
            {
                data: '108 ay'
            },
            {
                data: '120 ay'
            }
        ]
    },
    {
        id: 'js-button-submit',
        text: 'Devam Et',
        type: 'button'
    }
]

input.action = {
    "#js-button-submit": {
        click: function(e) {
            if(this.name === '') {
                console.log('BOŞ');
            }
        }
    },
    "input": {
        keypress: function (e) {
            //console.log(e);
            var item = e.target,
                itemId = e.target.id;

            this.name = item.value;
            //console.log(allLetter(e.target));
            if(itemId == 'js-name' && allLetter(item) == true) {
                //console.log('..')
            }
        }
    }
}



function action(element, event) {
    event.forEach(b => {
        console.log(b);
        element.addEventListener(event, () => {

        });
    })
    
}

console.log(input.action);

let app = document.querySelector('#app');
app.innerHTML = input();
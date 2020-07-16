window.addEventListener("DOMContentLoaded", function () {
    var notices = document.getElementById('notices');
    var workName = document.getElementById('work-name');
    var workAlias = document.getElementById('work-alias');
    var workEmail = document.getElementById('work-email');
    var workPhone = document.getElementById("work-phone");
    var workFio = document.getElementById("work-fio");
    var workPosition = document.getElementById("work-position");
    var workCheckbox = document.getElementById("work-checkbox");
    var workInternalDescription = document.getElementById("work-description-internal");
    var workPublicDescription = document.getElementById("work-description-public");
    var workSubmit = document.getElementById("form-work-group__submit");

    window.onbeforeunload = function () {
        localStorage.setItem('name', workName.value);
        localStorage.setItem('alias', workAlias.value);
        localStorage.setItem('email', workEmail.value);
        localStorage.setItem('phone', workPhone.value);
        localStorage.setItem('fio', workFio.value);
        localStorage.setItem('position', workPosition.value);
        localStorage.setItem('InternalDescription', workInternalDescription.value);
        localStorage.setItem('checkbox', workCheckbox.checked);
        localStorage.setItem('PublicDescription', workPublicDescription.value);
    };
    window.onload = function () {
        if (workName.value !== null) workName.value = localStorage.getItem('name');
        if (workAlias.value !== null) workAlias.value = localStorage.getItem('alias');
        if (workEmail.value !== null) workEmail.value = localStorage.getItem('email');
        if (workPhone.value !== null) workPhone.value = localStorage.getItem('phone');
        if (workFio.value !== null) workFio.value = localStorage.getItem('fio');
        if (workPosition.value !== null) workPosition.value = localStorage.getItem('position');
        if (workInternalDescription.value !== null) workInternalDescription.value = localStorage.getItem('InternalDescription');
        if (localStorage.getItem('checkbox') === 'false') {
            workPublicDescription.removeAttribute("required");
            workCheckbox.checked = false;
        } else if (localStorage.getItem('checkbox') === 'true') {
            workPublicDescription.setAttribute("required", "");
            workCheckbox.checked = true;
        }
        if (workPublicDescription.value !== null) workPublicDescription.value = localStorage.getItem('PublicDescription');
        if (workName.value !== '' || workAlias.value !== '' || workEmail.value !== '' || workPhone.value !== '' || workFio.value !== '' || workPosition.value !== '' || workInternalDescription.value !== '' || workPublicDescription.value !== '') {
            notices.classList.add("d-flex");
        }
    };


    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    };
    function mask(event) {
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
        if (event.type == "blur") {
            if (this.value.length == 2) this.value = ""
        } else setCursorPosition(this.value.length, this)
    };
    workPhone.addEventListener("input", mask, false);
    workPhone.addEventListener("focus", mask, false);
    workPhone.addEventListener("blur", mask, false);


    workAlias.oninput = () => {
        var workAliasProp = /[а-яА-Я\s]/;
        var input = workAlias.value;
        if (input.match(workAliasProp)) {
            workAlias.closest('.input-wrapper').classList.add('input-wrapper--notice');
            workAlias.closest('.input-wrapper').classList.remove('input-wrapper--success');
            workSubmit.disabled = true;
        }
        else if (input == 0) {
            workAlias.closest('.input-wrapper').classList.remove('input-wrapper--success');
            workAlias.closest('.input-wrapper').classList.remove('input-wrapper--notice');
            workSubmit.disabled = false;
        }
        else {
            workAlias.closest('.input-wrapper').classList.add('input-wrapper--success');
            workAlias.closest('.input-wrapper').classList.remove('input-wrapper--notice');
            workSubmit.disabled = false;
        }
    };

    workEmail.onchange = () => {
        var workEmailProp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var input = workEmail.value;
        if (workEmailProp.test(input) == false) {
            workEmail.closest('.input-wrapper').classList.add('input-wrapper--notice');
            workEmail.closest('.input-wrapper').classList.remove('input-wrapper--success');
            submit.disabled = true;
        }
        else {
            workEmail.closest('.input-wrapper').classList.add('input-wrapper--success');
            workEmail.closest('.input-wrapper').classList.remove('input-wrapper--notice');
            submit.disabled = false;
        }
    };
    workCheckbox.addEventListener('click', () => {
        if (workCheckbox.checked == false) {
            workPublicDescription.removeAttribute("required");
        }
        else {
            workPublicDescription.setAttribute("required", "");
        }
    });
    workSubmit.onclick = () => {
        let start = Date.now();
        if (notices.classList.contains('d-flex')) {
            let timer = setInterval(function () {
                // сколько времени прошло с начала анимации?
                let timePassed = Date.now() - start;

                if (timePassed >= 1000) {
                    clearInterval(timer); // закончить анимацию через 2 секунды
                    return;
                }

                // отрисовать анимацию на момент timePassed, прошедший с начала анимации
                draw(timePassed);
            }, 20);
            // в то время как timePassed идёт от 0 до 2000
            // left изменяет значение от 0px до 400px
            function draw(timePassed) {
                notices.style.height = 50 - (timePassed * 0.1) + 'px';
            }
            setTimeout(() => {
                notices.classList.remove('d-flex');
            }, 1050);
        }

    }



});


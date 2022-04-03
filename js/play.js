window.addEventListener('DOMContentLoaded', function () {  
    let btnMenu = document.querySelector('.btn-menu'),
        btnOk = document.querySelector('.btn-ok'),
        btnMix = document.querySelector('.btn-mix'),
        btnNumber = document.querySelector('.btn-number');
        frontFace = document.querySelectorAll('.front-face'),
        backFace = document.querySelectorAll('.back-face'),
        cardsActive = document.querySelectorAll('.cards-active'),
        dropdownItem = document.querySelectorAll('.dropdown-item'),
        dropdownMenu = document.querySelector('.dropdown-menu'),
        secondsCount = document.querySelector('.seconds'),
        result = document.querySelector('.result'),
        cards = document.querySelector('.cards');

    const uniqueCards = [{id:1, src: '../img/BlackHorse.svg'}, {id:2, src: '../img/Chubut.svg'}, {id:3, src: '../img/Fish.svg'},
    {id:4, src: '../img/Glossy.svg'}, {id:5, src: '../img/TheresaKnott.svg'}, {id:6, src: '../img/bo.svg'}, {id:7, src: '../img/snowflakes.svg'},
    {id:8, src: '../img/Machovka.svg'}];

    function createCards(arrayCards) {
        function shuffle(arrayCards) {
            arrayCards.sort(() => Math.random() - 0.5);
        }
        shuffle(arrayCards);
        arrayCards.map((obj) => {
        let div = document.createElement('div');
            div.dataset.index = obj.id;
            cards.appendChild(div);
            div.style.backgroundImage = `url('${obj.src}')`;
            div.style.backgroundSize = 'contain';
            div.style.width = '400px';
            div.style.height = '300px';
            div.style.backgroundRepeat = 'no-repeat';
            div.classList.add('cards-back');
            div.classList.add('cards-target');
            div.classList.add('inner-border');
            return div;
        });
    }

    let initialData = {
        second: 0,
        numberCard: 0,
        gameProgress: false,
        win: false,
        flag: true    
    };

    result.style.display = 'none';
    btnMix.disabled = true;
    btnOk.disabled = true;

    btnMenu.addEventListener('click', function () {
        if(dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        } else {
            dropdownMenu.classList.add('show');
        }       
    });

    dropdownMenu.addEventListener('click', function(event) {
        let target = event.target;
        if(target && target.classList.contains("dropdown-item")) {
            let cardsDel = document.querySelectorAll('.cards-target');
            for(let i = 0; i < cardsDel.length; i++) {
                cardsDel[i].remove();
            }
            result.style.display = 'none';
            initialData.flag = false;
            initialData.second = 0;
            for(let i = 0; i < dropdownItem.length; i++) {
                if(target == dropdownItem[i]) {
                    for(let k = 0; k < dropdownItem.length; k++) {
                        dropdownItem[k].classList.remove('active');
                    } 
                    dropdownItem[i].classList.add('active');
                    initialData.numberCard = +dropdownItem[i].textContent/2;
                    btnMix.disabled = true;
                    btnOk.disabled = false;
                    btnNumber.textContent = dropdownItem[i].textContent;
                }
            }
        } 
    });
    
    btnOk.addEventListener('click', function() {
        btnMix.disabled = false;
        btnOk.disabled = true;  
        sum = 0;
        initialData.flag = false;
        initialData.win = false;
        initialData.gameProgress = false;
        initialData.second = 0;
        result.style.display = 'none';
        dropdownMenu.classList.remove('show');
    });

    function getTimer() {      
        initialData.second = 30;
        secondsCount.textContent = initialData.second;
        let interval = setInterval(substraction, 1000);
        function substraction() {
            if (initialData.flag) {
                if (!initialData.gameProgress) {
                    clearInterval(interval);
                }
                let carTar = document.querySelectorAll('.cards-target');
                
                if (initialData.second < 1) {
                    clearInterval(interval);
                    initialData.gameProgress = false;
                    secondsCount.textContent = '00';
                    result.style.display = 'block';
                    result.textContent = 'Время вышло! Вы проиграли!';  
                    for (let i = 0; i < carTar.length; i++) {
                        carTar[i].classList.remove('cards-back');
                        carTar[i].classList.add('cards-active');
                    }   
                }     
                
                if(initialData.second < 10) {
                    secondsCount.textContent = '0' + initialData.second;
                    initialData.second -= 1;
                } else {
                    secondsCount.textContent = initialData.second;
                    initialData.second -= 1;
                }

                if(initialData.second > 0 && initialData.win) {
                    clearInterval(interval);
                    initialData.gameProgress = false;
                    secondsCount.textContent = '00';
                    result.style.display = 'block';
                    result.textContent = 'Поздравляем,вы выйграли!';
                }    
            } else {
                secondsCount.textContent = '00';
                initialData.win = false;
                initialData.gameProgress = false;
                clearInterval(interval);
            }        
        }
    }

    let memmoryIndex = null;
    let sum = 0;
    cards.addEventListener('click', function(event) {
        let target = event.target;
        
        let cardInSum = document.querySelectorAll('.cards-target');
        if (initialData.second > 0) { 
            
            if (target.classList.contains('cards-target')) {
                target.classList.remove('cards-back');
                target.classList.add('cards-active');
                target.style.rotateY = '180';
                target.style.transition = '1s';     
                let index = target.dataset.index;
                if(!memmoryIndex) {
                    memmoryIndex = index;
                    return;
                }

                if(memmoryIndex === index) {
                    memmoryIndex = null;
                    sum += 2;
                    if(sum == cardInSum.length) {
                        initialData.win = true;
                        return;
                    }
                    return;
                }

                if(memmoryIndex !== index) {
                    let huiznaet = document.querySelectorAll(`div[data-index="${memmoryIndex}"]`);
                    let huiznaetCarrent = document.querySelectorAll(`div[data-index="${index}"]`);
                    huiznaet.forEach((elem) => {
                        setTimeout(() => {
                            elem.classList.add('cards-back');
                            return elem;
                        }, 1000);   
                    });
                    huiznaetCarrent.forEach((elem) => {
                        setTimeout(() => {
                            elem.classList.add('cards-back');   
                            return elem;
                        }, 1000);
                        
                    });           
                    memmoryIndex = null; 
                }
            }
        }   
    });

    btnMix.addEventListener('click', function() {
        initialData.gameProgress = true;
        btnMix.disabled = true;
        result.style.display = 'none';
        sum = 0;
        initialData.win = false;
        initialData.flag = true;
        getTimer();
        let count = initialData.numberCard;
        const displayArr = [];
        for (let i = 0; i < count; i++) {
            displayArr.push(uniqueCards[i]);
        }
        createCards([...displayArr, ...displayArr]);
    }); 
});
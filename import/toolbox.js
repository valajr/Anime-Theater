function createElementHTML(tag, cl='dynamic', text='', action='') {
    let element = document.createElement(tag);
    
    element.classList.add(cl);
    element.innerHTML = text;
    element.onclick = action;

    return element;
}

function appendAll(element, list) {
    for(let i=0; i<list.length; i++)
        element.appendChild(list[i]);

    return element;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
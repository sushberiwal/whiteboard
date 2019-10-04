var mode = 'pen';

function handleModeChange(newMode) {
    var currentElement = document.getElementById(newMode);
    currentElement.className += ' active';
    var oldElement = document.getElementById(mode);
    var newClass = oldElement.className.replace(' active', '');
    oldElement.className = newClass;
    if (newMode=='image'){
        var imageOptions = document.getElementById('imageOptions');
        imageOptions.classList.toggle('show');
    }
    if (mode == newMode) {
        if (mode == 'pen') {
            var penOptions = document.getElementById('penOptions');
            penOptions.classList.toggle('show');
        }
    }
    else
        mode = newMode;
}

function changePenSize(newSize) {

    var oldid = 'penSpan' + penSize;
    oldSize = document.getElementsByClassName(oldid)[0];
    oldSize.classList.toggle('active');

    var newid = 'penSpan' + newSize
    selectedSize = document.getElementsByClassName(newid)[0];
    selectedSize.classList.toggle('active');

    penSize = newSize;
}

function changePenColor(newColor) {
    penColor = newColor
    var penSpan = document.getElementById('pen');
    penSpan.src='../icons/pencil_icon_dark.png'
    penSpan.style.backgroundColor=penColor;
}


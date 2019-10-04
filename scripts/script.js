(function () {
    var board = document.getElementById("board");
    var ctx = board.getContext('2d');
    var isDrawing = false;
    var isErasing = false;
    var isStickyMoving = false;
    var movingStickyDiv;
    var location;
    penSize = 2;
    stickyCounter = 0;
    penColor = 'black';
    
    init();
    function init() {
        // var rect = board.getBoundingClientRect();
        // board.height = rect.height;
        // board.width = rect.width;

        window.addEventListener('resize', onResize, false);
        onResize();
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = penSize;
    }

    var onMouseDown = function () {
        location = getLocation();
        if (mode == 'pen') {
            isDrawing = true;
            ctx.lineWidth = penSize;
            ctx.strokeStyle = penColor;
            ctx.globalCompositeOperation = 'source-over';
        }
        if (mode == 'eraser') {
            isErasing = true;
            ctx.lineWidth = 30;
            ctx.globalCompositeOperation = 'destination-out';
        }

        if (mode == 'sticky') {
            location = getLocation();
            var stickydiv = document.createElement('div');
            stickydiv.id = 'sticky' + stickyCounter;
            stickydiv.className = 'sticky';

            var dragIcon = document.createElement('img');
            dragIcon.id = 'drag' + stickyCounter;
            dragIcon.style.height = '20px';
            dragIcon.style.width = '20px';
            dragIcon.onmousedown = dragMouseDown;
            dragIcon.src = '../icons/move_icon_dark.png';

            var crossIcon = document.createElement('img');
            crossIcon.id='cross'+stickyCounter;
            crossIcon.style.height = '20px';
            crossIcon.style.width = '20px';
            crossIcon.onclick = deleteSticky;
            crossIcon.src = '../icons/cross_icon_dark.png';

            var sticky = document.createElement("textarea");
            sticky.className = 'textarea';
            stickydiv.appendChild(crossIcon);
            stickydiv.appendChild(dragIcon);
            stickydiv.appendChild(sticky);
            stickydiv.style.position = 'absolute';
            stickydiv.style.left = location.x - 20 + 'px';
            stickydiv.style.top = location.y + 57 + 'px';
            document.body.appendChild(stickydiv);
            stickyCounter++;
        }

        ctx.imageSmoothingQuality = 'high';
        ctx.moveTo(location.x, location.y);
    };

    var onMouseMove = function () {
        if (isErasing == false || mode != 'eraser') {
            if (isDrawing == false || mode != 'pen') {
                if (isStickyMoving == false || mode != 'sticky') {
                    return;
                }
            }
        }
        if (isErasing == true && mode == 'eraser') {
            ctx.beginPath();
            ctx.moveTo(location.x, location.y);
            ctx.fillStyle = 'white';
            // ctx.arc(location.x, location.y, 30, 0, 2 * Math.PI);
            ctx.fill();
            location = getLocation();
            ctx.lineTo(location.x, location.y);
            ctx.stroke();
        }
        if (isDrawing == true && mode == 'pen') {
            ctx.beginPath();
            ctx.moveTo(location.x, location.y);
            location = getLocation();
            ctx.lineTo(location.x, location.y);
            ctx.stroke();                                                                                                                                                                                                   
            ctx.closePath()
        }
        if (isStickyMoving == true && mode == 'sticky') {
            location = getLocation();
            movingStickyDiv.style.left = location.x + 'px';
            movingStickyDiv.style.top = location.y + 40 + 'px';
        }
    };

    var onMouseUp = function () {
        isDrawing = false;
        isErasing = false;
        isStickyMoving = false;
    };

    var getLocation = function () {
        var rect = board.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    board.addEventListener("mousedown", onMouseDown);
    board.addEventListener("mousemove", onMouseMove);
    board.addEventListener("mouseup", onMouseUp);
    document.addEventListener('keydown', onKeyDown);


    function onResize() {
        board.width = window.innerWidth - 5;
        board.height = window.innerHeight - 60;
    }

    function dragMouseDown(e) {
        isStickyMoving = true;
        var imgId = e.currentTarget.id;
        imgId = imgId.slice(4);
        movingStickyDiv = document.getElementById('sticky' + imgId);
    }

    function deleteSticky(e){
        var imgId = e.currentTarget.id;
        imgId = imgId.slice(5);
        var stickyDiv = document.getElementById('sticky' + imgId);
        document.body.removeChild(stickyDiv);
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') {
            isStickyMoving = false;
        }
    }
    
})();
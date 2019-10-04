var imageCounter = 0;
function uploadImage() {
    var image = document.getElementsByClassName('imageInput')[0];
    if (image != null) {
        console.log(image.files);
    }
    var img = document.createElement('img');
    var imgDiv = document.createElement('div');
    img.src = window.URL.createObjectURL(image.files[0]);
    img.id = 'image' + imageCounter;
    imgDiv.appendChild(img);

    // var crossIcon = document.createElement('img');
    // crossIcon.src = '../icons/cross_icon_dark.png'; 
    // crossIcon.id = 'cross' + imageCounter;
    // crossIcon.onclick = deleteImage;
    // imgDiv.appendChild(crossIcon);


    // img.style.height=200+'px';
    // img.style.width=300+'px';
    document.body.appendChild(imgDiv);
}

function deleteImage(e) {
    var imgId = e.currentTarget.id;
    imgId = imgId.slice(5);
    var stickyDiv = document.getElementById('image' + imgId);
    document.body.removeChild(stickyDiv);
}
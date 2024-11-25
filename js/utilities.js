const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for(let btn of buttons){
        btn.classList.remove('active');
    }
};


// like btn
 const likeBtn = (imgSrc) => {

    const imgContainer = document.getElementById('img-container');
    const newImage = document.createElement('img');
    newImage.src = imgSrc;
    newImage.classList = "p-2 rounded-xl border";
    imgContainer.appendChild(newImage);
    
};
loadPets();
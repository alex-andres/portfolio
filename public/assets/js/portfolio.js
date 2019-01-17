const flip = document.getElementsByClassName('flip');

const githubLink = document.querySelector('.githubLink');
const mobileImg = document.querySelector('.mobileImg');
let containerHeight;

console.log(flip);

for (let i = 0; i <= flip.length; i++) {
  console.log(flip[i]);
  flip[i].addEventListener('click', e => {
    if (e.target === githubLink || e.target === mobileImg) {
      console.log('image or github clicked');
      e.stopPropagation();
      return;
    }
    const card = flip[i].querySelector('.card');
    flip[i].parentElement.style.height;
    card.classList.toggle('flipped');
    if (card.classList.contains('flipped')) {
      console.log('displayBack');
      flip[i].parentElement.style.height = '160vh';
      flip[i].parentElement.style.marginBottom = '10vh';
    } else {
      flip[i].parentElement.style.height = '100vh';
    }
  });
}

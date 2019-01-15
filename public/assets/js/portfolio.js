const flip = document.getElementsByClassName('flip');

const githubLink = document.querySelector('.githubLink');
let displayBack = false;
let containerHeight;

console.log(flip);

for (let i = 0; i <= flip.length; i++) {
  console.log(flip[i]);
  flip[i].addEventListener('click', e => {
    if (e.target === githubLink) {
      console.log('this works');
      e.stopPropagation();
      return;
    }
    const it = flip[i].querySelector('.card');
    flip[i].parentElement.style.height;
    it.classList.toggle('flipped');
    if (!displayBack) {
      displayBack = true;
      flip[i].parentElement.style.height = '160vh';
    } else {
      displayBack = false;
      flip[i].parentElement.style.height = '100vh';
    }
  });
}

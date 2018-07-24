const flip = document.querySelector('#js-flip-1');
const githubLink = document.querySelector('.githubLink');

flip.addEventListener('click', e => {
  if(e.target === githubLink){
    console.log('this works')
    e.stopPropagation();
    return;
  }
  const it = flip.querySelector('.card');
  it.classList.toggle('flipped');
});

// const scroll = document.querySelector('a')

// scroll.addEventListener('click', e => {
//     e.preventDefault();
//   } 
// );


// $('a[href*=#]').on('click', e => {
//   e.preventDefault();
//   $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear');
// });
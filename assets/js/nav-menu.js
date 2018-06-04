const navMenuToggler = document.querySelector('.navbar-toggler');
const navMenuTogglerSingle = document.querySelectorAll('.togglerSingle');
const navMenu = document.querySelector('.nav-menu');

navMenuToggler.addEventListener('click', e => {
  navMenu.classList.toggle('hidden');
  navMenu.classList.toggle('fadeInAnimation');
  navMenu.classList.toggle('fadeOutAnimation');
  navMenuTogglerSingle[0].classList.toggle('togglerSingle1');
  navMenuTogglerSingle[1].classList.toggle('togglerSingle2');
  navMenuTogglerSingle[2].classList.toggle('togglerSingle3');
  navMenuTogglerSingle[0].classList.toggle('togglerX1');
  navMenuTogglerSingle[1].classList.toggle('togglerX2');
  navMenuTogglerSingle[2].classList.toggle('togglerX3');
});

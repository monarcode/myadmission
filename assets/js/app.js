
$(document).ready(function($){
    const navbar = document.querySelector('#navbar');
    const navlinks = document.querySelector('.navbar__links');
    const menuBtn = document.querySelector('.navbar__button');

    $(menuBtn).click(function(){
        navlinks.classList.toggle('active');
    })
})
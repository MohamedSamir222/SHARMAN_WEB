// initiate animation on scroll from asl
  sal();
// nav bar 
let nav = document.querySelector('.navbar');
let canavas = document.querySelectorAll('.offcanvas');
window.onscroll = function(){
  nav.classList.replace('p-3','p-1');
  canavas.forEach(canava => {
    canava.style.marginTop= `  78px `;
    document.querySelector('.cart-bag').style.bottom = `40%`;
  });
  if(window.scrollY  === 0 ) {
    nav.classList.replace('p-1','p-3');
    canavas.forEach(canava => {
      canava.style.marginTop= ` 102px `;
      document.querySelector('.cart-bag').style.bottom = `38%`;
    });
  }
}


// left sidebar 
let leftsidebarbotton = document.querySelector('.leftsidebarbuttom');
console.log(leftsidebarbotton)
leftsidebarbotton.onclick = function() {
  leftsidebarbotton.children[0].classList.toggle('active');
}


let ParentImgModel =document.querySelector('.modal-content-img');
let galleryInRightSideBar = document.querySelectorAll('.offcanvas-end .gallery');
const modalimage = document.getElementById('imagemodel');

galleryInRightSideBar.forEach(gallery => {
    gallery.onclick =function() {

      const img = document.createElement('img');
      // Set the source of the new image to the clicked image source
      img.src = `images/gallery-imag${this.getAttribute('data-image')}-330x240.jpg`;
      // Append the new image to the modal
      ParentImgModel.innerHTML = ''; 
      
      ParentImgModel.appendChild(img);
      // Display the modal
      document.getElementById('imagemodel').classList.add('show');
      document.getElementById('imagemodel').setAttribute('aria-modal', 'true');
      document.getElementById('imagemodel').setAttribute('style', 'display: block; background: rgba(0, 0, 0, 0.5);');
      
      ParentImgModel.style.flex = '1';
      img.style = 'width: -webkit-fill-available;';
    }
  
    });

modalimage.addEventListener('click', function(event) {
  if (event.target === modalimage) {
    modalimage.classList.remove('show');
    modalimage.setAttribute('aria-modal', 'false');
    modalimage.setAttribute('style', 'display: none;');
  }
});

// when click on icon of right sidebar hidden and another icon displayed
let rightbuttom = document.querySelector('.righticon');
let barr = document.querySelector('.icon-bar');
let xicon = document.querySelector('.xicon');

rightbuttom.onclick = function(){
  barr.classList.toggle('active');
  xicon.classList.toggle('active');
}

// when click on share icon 
let share = document.querySelector('.icon-share');
share.onclick = function() {
  share.children[1].classList.toggle('active');
}
let arrowUp = document.querySelector('.arrow-up');

arrowUp.onclick = function(){
  this.parentElement().classList.remove('active');
}

// when click on search icon 
  let iconsearch = document.querySelector('.icon-search');
  let search = document.querySelector('.search-bar');
  iconsearch.onclick = function(){
    search.classList.toggle('active');
    // change icon when click on icon 
    iconsearch.classList.toggle('active');
  }


// cart properties 

// when click on cart icon 
let cart =  document.querySelector('.cart');
let iconcart =document.querySelector('.scalee-cart');
iconcart.onclick = function() {
    document.querySelector('.cart-bag').classList.toggle('active');
  }



let minus = document.querySelectorAll('.minus');
let plus = document.querySelectorAll('.plus');
// when click on minus number decrease and price decrease 
minus.forEach(min => {
  min.onclick = function(){
    this.nextElementSibling.innerHTML -=  '1';
    this.parentElement.children[3].innerHTML =` ${this.parentElement.children[3].getAttribute('data-price') * this.nextElementSibling.innerHTML }$` 
  //fn to check zero orders 
    checker(this);
  //  calculate total price 
  let sum = 0;
  document.querySelectorAll('.price').forEach( price => {
      sum += +price.textContent.slice(0,-1);
      document.querySelector('.totalprice').innerHTML = `${sum}$`;
    });
    

  }
});

// when click on minus number increase and price increase 
plus.forEach(p => {
  p.onclick = function(){
    this.previousElementSibling.textContent = +this.previousElementSibling.textContent  + 1;
    console.log(this.parentElement.children[3].innerHTML);
    this.parentElement.children[3].innerHTML =` ${this.parentElement.children[3].getAttribute('data-price') * +this.parentElement.children[1].innerHTML }$` 
  //fn to check zero orders 
    checker(this);
  //  calculate total price 
    let sum = 0;
    document.querySelectorAll('.price').forEach( price => {
      sum += +price.textContent.slice(0,-1);
      document.querySelector('.totalprice').innerHTML = `${sum}$`;
    });
  }
});

// this fn to check zero orders 
function checker(ele){
  if(ele.parentElement.children[1].innerHTML == '0'){
    ele.parentElement.children[0].style = `pointer-events: none;` ;
    ele.parentElement.children[0].classList.add('btn-outline-secondary');
    ele.parentElement.children[0].classList.remove('btn-outline-danger');
  }else {
    ele.parentElement.children[0].style = `pointer-events: auto;` ;
    ele.parentElement.children[0].classList.remove('btn-outline-secondary');
    ele.parentElement.children[0].classList.add('btn-outline-danger');
  }
}

// start swiper 
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
    // loop: true,
    // autoplay: {
    //   delay: 4000, // Time in milliseconds between transitions
    //   disableOnInteraction: false, // Set to false to continue autoplay even when user interacts with the swiper
    // },
    // Bullet Pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },

  on: {
    init: function () {
      var totalSlides = this.slides.length ;
      var currentSlide = this.realIndex + 1;
      animateText(this.slides[this.activeIndex]);
      document.querySelector('.swiper-pagination-fraction').innerHTML = '<span>' + '0' + currentSlide + '</span>' + ' / ' + '0' + totalSlides;
    },
    transitionEnd: function () { 
      var totalSlides = this.slides.length ;
      var currentSlide = this.realIndex + 1;
      document.querySelector('.swiper-pagination-fraction').innerHTML = '<span>' + '0' + currentSlide + '</span>' + ' / ' + '0' + totalSlides;
    },
    slideChange: function () {

      animateText(this.slides[this.activeIndex]);

    }
    
  }
});

function animateText(slide) {
  const title = slide.querySelector('.hidden-text-right');
  const paragraph = slide.querySelector('.hidden-text-left');
  const buttom = slide.querySelector('.hidden-text-up');
  
  setTimeout(() => {
    title.classList.add('visible-text');
    paragraph.classList.add('visible-text');
    buttom.classList.add('visible-text');
  }, 100);

  // Reset text animation for the next slide
  let prevSlides = document.querySelectorAll('.swiper-slide');
  prevSlides.forEach(prevSlide => {
    if (prevSlide !== slide) {
      const prevTitle = prevSlide.querySelector('.hidden-text-right');
      const prevParagraph = prevSlide.querySelector('.hidden-text-left');
      const prevbuttom = prevSlide.querySelector('.hidden-text-up');
      prevTitle.classList.remove('visible-text');
      prevParagraph.classList.remove('visible-text'); 
      prevbuttom.classList.remove('visible-text'); 
    }
  });
}
// end swiper 
// start content filter 
const filters = document.querySelectorAll('.last-filter div');
filters.forEach(filter => {
  filter.onclick = function(){
    filters.forEach(filter=> {
      filter.classList.remove('active');
    })
    this.classList.add('active');
  }
})


// Assuming you have a container with the class 'last-grid' for Isotope
const grid = document.querySelector('.last-grid');
// Initialize Isotope
const iso = new Isotope(grid, {
  itemSelector: '.last-grid-item',
});

// Assuming you have a container with the class 'last-filter' for your filters
const filterContainer = document.querySelector('.last-filter');
filterContainer.addEventListener('click', function(event) {
  // Check if the clicked element is a div
  if (event.target.tagName === 'DIV') {
    const value = event.target.getAttribute('data-name');
    // Apply the filter
    iso.arrange({
      filter: value
    });
  }
});
// the Lightgallary libaray 
lightGallery(document.querySelector('.last-grid'), {
    selector: '.item',
    animateThumb: true,
    allowMediaOverlap: false,
  plugins:[lgFullscreen , lgRotate , lgShare , lgAutoplay , lgThumbnail ],
});
// end content filter 

// Start Experiance




let experience = document.querySelector('.experience');
let backgroundNumber = document.querySelector('.experience .number span ');
let expNumbers = document.querySelectorAll('.experience .numbers .num');

scroll(backgroundNumber);
expNumbers.forEach(num => {
  scroll(num);
});

function scroll(ele) {
  let started = true;
  window.addEventListener('scroll', function () {
    if (started) {
      if (window.scrollY >= experience.offsetTop - 400) {
        count(ele);
        started = false;
      }
    }
  });
}

function count(ele) {
  let number = ele.dataset.number;
  let interval = setInterval(() => {
    ele.textContent++;
    if (ele.textContent == number) {
      clearInterval(interval);
    }
  }, 1500 / number);
}

// End Experiance 


let LastGrid = document.querySelector('.last-grid');
let lastGridItems = document.querySelectorAll('.last-grid-item');

function scrollgrid(item) {
  if (window.scrollY >= item.offsetTop + 1200) {
    item.classList.add('visible-text');
    item.classList.remove('hidden-text-left','hidden-text-right','hidden-text-top');
    setTimeout(function(){
      item.classList.remove('visible-text','delay-00','delay-200','delay-400','delay-600');
    },2000);
  }
}

lastGridItems.forEach(item => {
  scrollgrid(item);
});

window.addEventListener('scroll', () => {
  lastGridItems.forEach(item => {
    scrollgrid(item);
  });
});
// contact 
let date = new Date();
let year = date.getFullYear();
document.querySelector(".contact .year").innerHTML= `${year}`;
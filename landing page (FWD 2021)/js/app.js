/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

                              /** Class for generating sections */
class sec
{

  //section index
  index=0;

  //content
  get content()
  {
    return `
    <section id="section${this.index}"  data-nav="Section ${this.index}" >
    <div class="landing__container">
       <h2>Section ${this.index}</h2>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
       
       <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
       </div>
       </section>
       `
 };
 
 //To add new section
 ANS()
 {
   this.index += 1;
   document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', this.content);
 }

}//class brackets

                                /** Class for generating a navbar */
class nav
{
//to select navbar elements
selector=document.getElementById('navbar__list');

//to build menu for each element
builder()
{
//to clear options
this.selector.innerHTML='';
document.querySelectorAll('section').forEach(option => {
  this.selector.insertAdjacentHTML('beforeend', `<li><a class="menu__link" href="#${option.id}" data-section-id="${option.id}"  >${option.dataset.nav}</a></li>`);
});
this.mover();
}

//to move to a specific section
mover()
{
  this.selector.addEventListener('click', function (E) {
    E.preventDefault();
    document.getElementById(E.target.dataset.sectionId).scrollIntoView({ behavior: "smooth" });
    generator(E.target.dataset.sectionId);
});
}



}//class brackets

                                /** To define the global variables */
const _sec = new sec();
const _nav = new nav();
const _mover = document.getElementById('toTop');      

                                /** End of declaration and to start helper functions */

//ANS function
function ANS()
{
  _sec.ANS();
  _nav.builder();
}


//To top function
function toTop()
{
  _mover.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
    });
});
}



                                /** "which section is displaying right now" function */
function checker(option,x)
{
x=typeof x=='undefined' ? 0 :x;
//to get the position
const pos=option.getBoundingClientRect();

//to check if option is available
if (pos.top >= x && pos.left >= x && pos.right <=
//to achieve browser compatibility 
  ((window.innerWidth || document.documentElement.clientWidth) - x) &&
  pos.bottom <=
  ((window.innerHeight || document.documentElement.clientHeight) - x)) {
  return true;
} 
else 
{
  return false;
}
}

                                /** To add an active class for generating sections */
function generator(hash)
{
//to add an active link
document.querySelector('.link__active')?.classList.remove('link__active');
document.querySelector(`[href="#${hash}"]`).classList.add('link__active');

//to add an active section
document.querySelector('.your-active-class')?.classList.remove('your-active-class');
document.querySelector(`#${hash}`).classList.add('your-active-class');

//to update location
setTimeout(()=>{
  window.location.hash=hash;
},0);
}

                                /** To scroll */
window.addEventListener('scroll', () => {

let scroller = ((window.innerHeight + window.scrollY) / document.body.offsetHeight) * 100;

//to show or hide the button
if (scroller > 40) {
//to show button
  _mover.classList.remove('display__none');
} else {
//to hide button
  _mover.classList.add('display__none');
}

//to make new added section appear in the navbar
document.querySelectorAll('section').forEach(option => {
  if (checker(option, -300)) {
      generator(option.id);
  }
});

});


                                /** End of helper functions and to start main functions */


//to call the functions and apply changes to the navbar
_sec.ANS();
_sec.ANS();
_sec.ANS();

_nav.builder();
toTop();
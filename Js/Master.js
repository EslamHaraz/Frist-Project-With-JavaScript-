// Check if thereis local storage color option 
let mainColors = localStorage.getItem("Color_Option")
if(mainColors !== null){
    document.documentElement.style.setProperty("--main-color",mainColors)
    // Remove Active Class From All Colors list Item
    document.querySelectorAll(".colors-list li ").forEach(e=> {
        e.classList.remove("active")
        // Add Active class on element with data-color === local storage item 
        if(e.dataset.color===mainColors){
            // Add ACtive  Class 
            e.classList.add("active")
        }
    })

}

// Variable To Control The background Interval 
let backgroundInterval;

// Backgound Random Options
let backgoundOption = true

// check if there is localStorage Random Bacjground Item 
let backgroundLocalitem = window.localStorage.getItem("background_option")
if(backgroundLocalitem!==null){
    if(backgroundLocalitem==='true'){
        backgoundOption=true
    }else {
        backgoundOption=false
    }
    // Remove Active Class From ALL Spans
    document.querySelectorAll(".random-backgrounds span").forEach(e=> {
        e.classList.remove("active")
    })
   backgroundLocalitem==="true"?document.querySelector(".yes").classList.add("active"):document.querySelector(".no").classList.add("active")
}

// Setting Box Open And Close
let Setting = document.querySelector(".icon")
let settingBox = document.querySelector(".Setting-box")
Setting.onclick=function (){
    // Do Rotate On Setting Icon
    Setting.classList.toggle("fa-spin")
    // Make close And Open 
    settingBox.classList.toggle("open")
}
    

// Switch Colors 

const colorsLi = document.querySelectorAll(".colors-list li")
// Loop On Lis items
colorsLi.forEach(li=>{
    // (Click on every items)
    li.addEventListener("click",(e)=> {
        // Set Color On Root
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color)
        // Set Color To Local Storage
        window.localStorage.setItem("Color_Option",e.target.dataset.color)
        // Remove Active From All Childrens 
        // add Active class on self 
        activeHandle(e)

    })
})

// Switch Random Backgrounds option

const randomBacgroundEl = document.querySelectorAll(".random-backgrounds span")
  // Loop On all spans
randomBacgroundEl.forEach(span=>{
  // (Click on every span)
   span.addEventListener("click",(e)=> {
      // Remove Active From All Childrens 
      // add Active class on self 
        activeHandle(e)

      if(e.target.dataset.background==="yes"){
         backgoundOption=true
         ranomizeImgs()
         window.localStorage.setItem("background_option",true)
        }else {
            backgoundOption=false
            window.localStorage.setItem("background_option",false)
        clearInterval(backgroundInterval)
      }
   })
})


// Sellect Landing page Element
let landingPage = document.querySelector(".landing-page")

console.log(landingPage)

// Get Array of imgs 
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"]

// function to randomize imgs 
function ranomizeImgs() {
    if(backgoundOption===true){

     backgroundInterval = setInterval(function(){
            // Get Random Number 

            let randomNumber = Math.floor(Math.random()*imgsArray.length)

            // change backgroungd url 

            landingPage.style.backgroundImage =`url("imgs/${imgsArray[randomNumber]}")`

        },10000 )
        
    }
} 
ranomizeImgs()

// Select Skills Selector 

let ourSkills = document.querySelector(".skills") 
window.onscroll=function (){
    // Skills Offset Top (ده الجزء اللي فوق السيكشن)
    let skillOffsetTop = ourSkills.offsetTop
    // Outer Height (دي هتجيب الارتفاع بتاع السيكشن)
    let skillsOuterhigh = ourSkills.offsetHeight
    // Window Height (ده ارتفاع الشاشه)
    let windowHeight = this.innerHeight
    // window ScrollTop (ده بيرجع البكسل الخاص بالاسكرولينج الجزء اللي انت عملتله سكرول )
    let WindowScrollTop=this.pageYOffset

     if(WindowScrollTop>(skillOffsetTop +skillsOuterhigh-windowHeight)){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
        allSkills.forEach(ele=> {
            ele.style.width=ele.dataset.progress
        })
     }
}

// Create Popup with the image 
let ourGallary = document.querySelectorAll(".gallary img")
ourGallary.forEach(img=> {
    
    img.addEventListener("click",(e)=> {

       // Craete Overlay Element
       let Overlay = document.createElement("div")
       // add class to overlay 
       Overlay.className="popup-overlay"
       // Append Overlay To Body
       document.body.append(Overlay)
       // Create The Popup Box
       let popupBox = document.createElement("div")
       // Add class To The Popup Box
       popupBox.className="popup-box"
       // Create Photo 
       let popupImage = document.createElement("img")
       // Set Src of photo
       popupImage.src=img.src
       // Append Photo To Box
       popupBox.appendChild(popupImage)
       // Append to Body
       document.body.appendChild(popupBox)
       
       if(img.alt!=null){

        // Create Heading
        let imgHeading = document.createElement("h3")
        // Craete Text For Heading
        let imgText= document.createTextNode(img.alt)
        //Append The Text To Heading
        imgHeading.appendChild(imgText)
        // Append the head to popup box
        popupBox.prepend(imgHeading)
        // Create The Close Button 
        let CloseButton = document.createElement("Span")
        CloseButton.style.cursor="pointer"
        // Create The Close Button Text 
        let CloseButtonText = document.createTextNode("X")
        // Append text to close button
        CloseButton.appendChild(CloseButtonText)
        // Add class to close button
        CloseButton.className="classButton"
        // Add close Button to popub Box
        popupBox.appendChild(CloseButton)
       }
    })

})

// Close Popup 

document.addEventListener("click",function(e) {
if(e.target.className=="classButton"){
    // remove the current Popup
    e.target.parentElement.remove()
    // Remove Overlay 
    document.querySelector(".popup-overlay").remove()
}
})

// Select Bullets Elements 
let Bullets = document.querySelectorAll(".nav-bullets .bullet")
// Select Bullets links
let Links = document.querySelectorAll(".links a")        
function scrollToAnyPlace(element) {
    element.forEach(e=> {
        e.addEventListener("click",(ele) => {
            ele.preventDefault()
            if(ele.target.hasAttribute("data-place")){
                document.querySelector(`.${ele.target.dataset.place}`).scrollIntoView({
                    behavior:"smooth"
                })
            }
        })
    })
}
function activeHandle(ev){
    ev.preventDefault()
    ev.target.parentElement.querySelectorAll(".active").forEach(element=> {
        element.classList.remove("active")
    })
    // add Active class on self 
    ev.target.classList.add("active")
}
scrollToAnyPlace(Bullets)
scrollToAnyPlace(Links)

// Show And Hide Bullets 


let bullets = document.querySelectorAll(".bullets-option span")
let navBullets = document.querySelector(".nav-bullets")
let bulletLocalItem = window.localStorage.getItem("bullets-option")
if(bulletLocalItem!==null){
    bullets.forEach((span)=> {
        span.classList.remove("active")
    })
    if(bulletLocalItem==="block"){
        navBullets.style.display=bulletLocalItem
        document.querySelector(".bullets-option .yes").classList.add("active")
    }else {
        navBullets.style.display=bulletLocalItem
        document.querySelector(".bullets-option .no").classList.add("active")

    }
}
bullets.forEach((span)=> {
    span.addEventListener("click",(e)=>{
        if(span.dataset.display==="show"){
            navBullets.style.display="block"
            window.localStorage.setItem("bullets-option",span.dataset.display)
        }else {
            window.localStorage.setItem("bullets-option",span.dataset.display)
            navBullets.style.display="none"

        }
        activeHandle(e)
    })
})
console.log(bullets)

// Reset ALL Settings Function 

let resetButton = document.querySelector(".reset-option")
resetButton.onclick=function() {
    window.localStorage.clear()
    window.location.reload()
}

// Open And Close Nav Bar

let Button = document.querySelector(".toggle-menu")
let ulLinks = document.querySelector("ul.links")
console.log(ulLinks)
Button.onclick=function(e){
 e.stopPropagation()
    ulLinks.classList.toggle("open")
    this.classList.toggle("active")
}
document.addEventListener("click",(e)=>{
   if(e.target!=Button&&e.target!=ulLinks){
    if(ulLinks.classList.contains("open")){
        ulLinks.classList.remove("open")
        Button.classList.remove("active")
    }
   }
})
ulLinks.onclick=function(e) {
    e.stopPropagation()
}
let date= new Date()
let Footer = document.querySelector("footer")
Footer.innerHTML=`Created With Love By Osama Elzero${date.getFullYear()}&#10084;&#65039;`


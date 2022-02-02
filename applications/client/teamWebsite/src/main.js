const aboutElement = document.querySelector("#about");
const headerElement = document.querySelector("#header");
const options = {
    threshold: 0.04
}
  
const observer = new IntersectionObserver((elements)=>{
    if(elements[0].isIntersecting){
        headerElement.classList.add("hide-off-screen")
    }else{
        headerElement.classList.remove("hide-off-screen")
    }
}, options);

observer.observe(aboutElement);
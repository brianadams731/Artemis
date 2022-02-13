let showMenu = false;
const wrapper = document.querySelector(".wrapper");
const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector("#menu")

wrapper.addEventListener("click",()=>{
    showMenu = false;
    closeMenu();
})

menu.addEventListener("click",(e)=>{
    e.stopPropagation();
})

menuIcon.addEventListener("click",(e)=>{
    e.stopPropagation();
    showMenu = !showMenu;
    if(showMenu){
        openMenu();
    }else{
        closeMenu();
    }
})

function openMenu(){
    menu.classList.add("show-menu");
    menuIcon.classList.add("rotate-icon")
}

function closeMenu(){
    menu.classList.remove("show-menu");
    menuIcon.classList.remove("rotate-icon")
}
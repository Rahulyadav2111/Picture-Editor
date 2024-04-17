let Choose_img_btn = document.querySelector(".choos_img button");
let Choose_img_input = document.querySelector(".choos_img input");
let imgSrc = document.querySelector(".view_img img");
let filter_btns = document.querySelectorAll(".icons_room button");

let slider = document.querySelector(".slider input");

let filter_name = document.querySelector(".filter_info .name");
let filter_value = document.querySelector(".filter_info .value");


let brightness = 100, contrast =100, saturate=100, invert = 0, blur = 0, rotate = 0, flip_x=1, flip_y=1;

let reset = document.querySelector(".reset");
let save = document.querySelector(".save");

let rotate_btn = document.querySelectorAll(".icons_room1 button")

Choose_img_btn.addEventListener('click', ()=> Choose_img_input.click())

Choose_img_input.addEventListener('change', ()=>{
    let file = Choose_img_input.files[0];
    if(!file) return;
    imgSrc.src = URL.createObjectURL(file);
    imgSrc.addEventListener('load', ()=>{
        document.querySelector(".container").classList.remove("disabled"); //for enabling all the elements
    })
});

filter_btns.forEach((element) =>{
    element.addEventListener('click', ()=>{
        document.querySelector(".active").classList.remove("active"); //for removing the color
        element.classList.add("active"); //for adding the color on particular button
        filter_name.innerText = element.id;

        if(element.id === "brightness"){
            slider.max = "200";
            slider.value = brightness;
            filter_value.innerText = `${brightness}`;
        }
        else if(element.id == "contrast"){
            slider.max = "200";
            slider.value = contrast;
            filter_value.innerText = `${contrast}`;
        }
        else if(element.id == "saturate"){
            slider.max = "200";
            slider.value = saturate;
            filter_value.innerText = `${saturate}`;
        }
        else if(element.id == "invert"){
            slider.max = "100";
            slider.value = invert;
            filter_value.innerText = `${invert}`;
        }
        else if(element.id == "blur"){
            slider.max = "100";
            slider.value = blur;
            filter_value.innerText = `${blur}`;
        }
    });
});

slider.addEventListener("input", ()=>{
    filter_value.innerText = `${slider.value}%`;
    let SliderState = document.querySelector(".icons_room .active");
    if(SliderState.id === "brightness"){
        brightness = slider.value;
    }
    else if(SliderState.id === "contrast"){
        contrast = slider.value;
    }
    else if(SliderState.id === "saturate"){
        saturate = slider.value;
    }
    else if(SliderState.id === "invert"){
        invert = slider.value;
    }
    else if(SliderState.id === "blur"){
        blur = slider.value;
    }
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%)  saturate(${saturate}%)  invert(${invert}%)  blur(${blur}px)`;
});

rotate_btn.forEach((element)=>{
    element.addEventListener('click', ()=>{
        if(element.id === "rotate_left"){
            rotate -=90;
        }
        else if(element.id === "rotate_right"){
            rotate +=90;
        }
        else if(element.id === "flip_x"){
           flip_x = flip_x === 1 ? -1 : 1;
        }
        else if(element.id === "flip_y"){
            flip_y = flip_y === 1 ? -1 : 1;
        }


        imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
    })
})


reset.addEventListener('click', ()=>{
    brightness = "100";
    contrast = "100";
    saturate = "100";
    invert = "0";
    blur = "0";
    rotate = "0";
    flip_x = "1";
    flip_y = "1";

    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%)  saturate(${saturate}%)  invert(${invert}%)  blur(${blur}px)`;
    imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
  
})


save.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = imgSrc.naturalWidth;
    canvas.height = imgSrc.naturalHeight;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flip_x, flip_y);
    ctx.drawImage(
      imgSrc,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
});

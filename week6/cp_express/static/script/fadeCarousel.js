document.addEventListener("DOMContentLoaded", fadeLoop);

//got this replacement for annoying window.setTimeout() from https://stackoverflow.com/a/39914235/148680
function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function fadeLoop()
{
    //get a live array-like list of slide images
    const slides = document.getElementById("carousel-container").children;

    if(slides.length > 1)
    {
        //let user see inital image for 3s before starting
        await sleep(3000);
        let slide = null;
        for(let i = 0; i < slides.length; i++)
        {
            slide = slides[i];
            //if slide is displayed, fadeout and take it out of the DOM 
            if( ! slide.classList.contains("undisplayed") )
            {
                slide.classList.toggle("fading");
                await sleep(3000);
                slide.classList.add("undisplayed");
                slide.classList.remove("fading");
            }
            else
            {
                slide.classList.add("resolving");
                slide.classList.remove("undisplayed");
                await sleep(3000);
                slide.classList.remove("resolving");
                slide.classList.add("fading");
                await sleep(3000);
                slide.classList.add("undisplayed");
                slide.classList.remove("fading");
            }
            //keep loop going
            if(i == slides.length - 1)
                i = -1;
        }
    } 
};

(() => {

    const box = document.querySelector('.box-container');
    const desc = document.querySelectorAll('.style-desc');
    let rafID;
    let prevWidth;
    box.addEventListener('mouseover',(e)=>{

        function render(){
            const styled = document.defaultView.getComputedStyle(e.target);
            desc[0].innerHTML = styled.width;
            desc[1].innerHTML = styled.transformOrigin;
            desc[2].innerHTML = styled.opacity;
            rafID = requestAnimationFrame(render);

        }
        render();
    })

    window.addEventListener('load' , ()=>{
        desc[0].innerHTML = '0px';
        desc[1].innerHTML = '0px';
        desc[2].innerHTML = '0';
    })

})();


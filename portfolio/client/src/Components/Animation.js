import gsap from 'gsap';

// Fade up for the additonal info on our menu
export const fadeInUp = node => {
    gsap.from(node, {
        y: 60,
        duration: 1,
        delay: 0.2,
        opacity: 0,
        ease: "power3.inOut"
    });
};

export const upDownStaggerElement = (startY,node,trigger,stagger=0.3,delay=0) =>{
    gsap.from(node, {

        y: startY,
        duration: 0.5,
        opacity: 0,
        delay:delay,
        scrollTrigger: {
            trigger: trigger,
            start: 'top 85%',
            indicator:true,
        },
        stagger: {
            amount: stagger
        }
    })
}




export const upDownElement = (startY,node,trigger,delay=0) =>{
    gsap.from(node, {
        y: startY,
        duration: 0.5,
        opacity: 0,
        delay:delay,
        scrollTrigger: {
            trigger: trigger,
            start: 'top 60%',
            // scrub:true,
            toggleActions: 'restart'
        },
    })
}
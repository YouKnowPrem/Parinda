const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);
const c = (e) => document.createElement(e);

const tl = gsap.timeline();





window.onresize = () => {
    lenisFn();
    setDefaults();
    cardAnimation();
}



// Calling functions
lenisFn();
setDefaults();
cardCreator();
cardAnimation();
marquee();
navAnimation();





// Creating functions
function lenisFn() {
    const lenis = new Lenis({
        wheelMultiplier: 2,
        duration: 1.5,
        easing: (x) => 1 - Math.pow(1 - x, 5),
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}

function setDefaults() {
    const pt = $('nav').clientHeight;
    const mainContent = $('.main-content');

    mainContent.style.paddingTop = pt + 'px';
}

function cardCreator() {
    cards.forEach(({ name, occupation, from, image, about }, id) => {


        $('.cards').innerHTML += `
        <div class="card dashed-border" id=${id}>
            ${aboutCreator(about)}
            <div class="user">
                <img src=${image} alt=${name}>
                <div>
                    <h1 class="name">${wrapLettersInSpan(name)}</h1>
                    <p class="occupation">${occupation} <span>${from}</span></p>
                </div>
            </div>
        </div>
        `;
    });


    function aboutCreator(about) {
        let clutter = "";
        for (let i = 0; i < about.length; i++) {
            clutter += `<p class="underline">${about[i]}</p>`
        }
        return `<div class="about">${clutter}</div>`;
    }


    function wrapLettersInSpan(name) {
        let newName = Mr. / Ms. ;
        for (let i = 0; i < name.length; i++) {
            if (name[i].toLowerCase() === 'o' || name[i].toLowerCase() === 'g' || name[i].toLowerCase() === 'c') {
                const span = document.createElement('span');
                span.textContent = name[i];
                newName += span.outerHTML;
            } else {
                newName += name[i];
            }
        }

        return newName;
    }
}

function cardAnimation() {
    const cards = $$('.card');
    let initialPositions = Array.from(cards).map(card => parseFloat(window.getComputedStyle(card).getPropertyValue('left').replace("px", "")));
    let savedInitialPositions = [...initialPositions];
    let shift = $('.cards').clientWidth * 0.2;


    cards.forEach((card, index) => {

        card.onmouseenter = () => {
            gsap.to(card, {
                left: savedInitialPositions[index],
                duration: 1,
                ease: "expo.inOut"
            });
            cards.forEach((c, i) => {
                if (i > index) {
                    gsap.to(c, {
                        left: savedInitialPositions[i] + shift,
                        delay: 0.1 * (i - index),
                        duration: 1,
                        ease: "expo.out"
                    });
                }
            });
        }

        card.onmouseleave = () => {
            cards.forEach((c, i) => {
                if (i !== index) {
                    gsap.to(c, {
                        left: savedInitialPositions[i],
                        delay: 0.1 * (Math.abs(i - index)),
                        duration: 1,
                        ease: "expo.out"
                    });
                }
            });
        }
    });
}

function marquee() {
    let currentScroll = 0;
    let isScrollingDown = true;

    let tween = gsap.to(".marquee__part", { xPercent: -100, repeat: -1, duration: 5, ease: "linear" }).totalProgress(0.5);

    gsap.set(".marquee__inner", { xPercent: -50 });

    window.addEventListener("scroll", function () {

        if (window.pageYOffset > currentScroll) {
            isScrollingDown = true;
        } else {
            isScrollingDown = false;
        }

        gsap.to(tween, {
            timeScale: isScrollingDown ? 1 : -1
        });

        currentScroll = window.pageYOffset;
    });

    $('.marquee').onmouseenter = () => {
        tween.pause();
    }
    $('.marquee').onmouseleave = () => {
        tween.resume();
    }
}

function navAnimation() {
    const togglers = $$('.line-container');
    const h1s = $$('.hamburger >div:nth-child(2) h1');
    const lineHeight = $('.toggler .line').clientHeight;
    const navTl = gsap.timeline({ paused: true });


    // Hover animation
    navTl.to(".toggler .line:nth-child(1)", { x: -3, ease: "none", duration: .3 })
         .to(".toggler .line:nth-child(2)", { x: 3, ease: "none", duration: .3 }, 0);




        
    let count = 1;
    togglers.forEach(toggler => {
        toggler.onmouseenter = () => navTl.play();
        toggler.onmouseleave = () => navTl.reverse();
        toggler.onclick = () => {
            if(count) {
                count--;
                $('body').style.overflow = 'hidden';
                tl
                    .to('.line-container', {
                        gap: 0
                    })
                    .to('.line-container .line:nth-child(1)', {
                        rotate: 45,
                        y: lineHeight / 2,
                        x: 0
                    }, "<")
                    .to('.line-container .line:nth-child(2)', {
                        rotate: -45,
                        y: -lineHeight / 2,
                        x: 0
                    }, "<")
                    .to('.hamburger', {
                        height: "100%",
                        ease: "power4.inOut",
                        duration: 1,
                    })
                    .to('#animated-line', {
                        left: 0,
                        ease: 'power4',
                    }, "-=.2")
                    .to('#animated-line', {
                        left: "100%",
                        ease: 'power4',
                    }, "-=.2")
                    .to('.hamburger h1', {
                        top: 0,
                        ease: "power4.inOut",
                        duration: 1,
                        stagger: .1
                    }, '-=0.5')
                    .to('.hamburger h1 >div:nth-child(1)', {
                        width: "100%",
                        ease: "power4.inOut",
                        duration: 1,
                    }, '-=0.6')
                    .to('.hamburger >div:last-child', {
                        bottom: '5%',
                        opacity: 1
                    }, '<')
            } else {
                tl
                .to('.line-container', {
                    gap: 3
                })
                .to('.line-container .line:nth-child(1)', {
                    rotate: 0,
                    y: 0,
                    x: 0
                }, "<")
                .to('.line-container .line:nth-child(2)', {
                    rotate: 0,
                    y: 0,
                    x: 0
                }, "<")
                .to('.hamburger h1 >div', {
                    width: "0",
                    ease: "power4.inOut",
                    duration: 1,
                })
                .to('.hamburger >div:last-child', {
                    bottom: 0,
                    opacity: 0
                }, '<')
                .to('.hamburger h1', {
                    top: "100%",
                    ease: "power4.inOut",
                    duration: 1,
                    stagger: .1
                }, '-=0.5')
                .to('#animated-line', {
                    left: 0,
                    ease: 'power4',
                }, "-=.2")
                .to('#animated-line', {
                    left: "-100%",
                    ease: 'power4',
                }, "-=.2")
                .to('.hamburger', {
                    height: "0",
                    ease: "power4.inOut",
                    duration: 1,
                    onComplete: () => {
                        $('body').style.overflow = 'auto';
                        count++;
                    }
                }, '-=0.6')
            }
        }
    })


    h1s.forEach(h1 => {
        h1.onclick = () => {
            const line = h1.querySelector('div');
            gsap.to('.hamburger >div:nth-child(2) h1 div', {
                width: "0",
                ease: "power4.inOut",
                duration: 1,
            })
            gsap.to(line, {
                width: "100%",
                ease: "power4.inOut",
                duration: 1,
            })
        }
    })
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target, animationProps, scrollProps = {}) => {
  if (!target) return; 

  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%", 
    },
  });
};

export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  if (!timeline || !rotationRef.current || !firstTarget || !secondTarget) return; 

  timeline
    .to(rotationRef.current.rotation, {
      y: rotationState,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(
      firstTarget,
      {
        ...animationProps,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(
      secondTarget,
      {
        ...animationProps,
        ease: "power2.inOut",
      },
      "<"
    );

  if (window.innerWidth < 768) {
    ScrollTrigger.create({
      animation: timeline,
      trigger: firstTarget,
      start: "top center",
      toggleActions: "play none none reverse",
      onEnter: () => {
      },
    });
  } else {
    ScrollTrigger.create({
      animation: timeline,
      trigger: firstTarget,
      start: "top center",
      toggleActions: "play none none reverse",
    });
  }
};

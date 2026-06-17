import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useNavbarScrollAnimation() {
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom 80px",
      onEnter: () => {
        gsap
          .timeline()
          .to("#logo-white", { opacity: 0, duration: 0.4, ease: "power2.out" })
          .to(
            ".animate-bg-color",
            {
              backgroundColor: "rgba(255, 255, 255,1)",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
              duration: 0.4,
              ease: "power2.out",
            },
            "<",
          )
          .to(
            ".animate-text-color",
            { color: "#296FDA", duration: 0.4, ease: "power2.out" },
            "<",
          );
      },
      onEnterBack: () => {
        gsap
          .timeline()
          .to("#logo-white", { opacity: 1, duration: 0.4, ease: "power2.out" })
          .to(
            ".animate-bg-color",
            {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              duration: 0.4,
              ease: "power2.out",
            },
            "<",
          )
          .to(
            ".animate-text-color",
            { color: "#FFFFFF", duration: 0.4, ease: "power2.out" },
            "<",
          );
      },
    });
  });
}

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
    title: { min: 400, max: 900, default: 400 },
    subtitle: { min: 100, max: 400, default: 100 },
};

// Split text into span-wrapped characters
const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
        >
      {char === " " ? "\u00A0" : char}
    </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return () => {}

    const letters = container.querySelectorAll("span");
    const { min, max } = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `"wght" ${weight}`,

        });
    };

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const letterCenter = l - left + w / 2;

            const distance = Math.abs(mouseX - letterCenter);

            // Gaussian falloff — smooth and realistic
            const intensity = Math.exp(-(distance ** 2) / 25000);

            animateLetter(letter, min + (max - min) * intensity);
        });
    };

    container.addEventListener("mousemove", handleMouseMove);

    // cleanup function
    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const cleanups = [];

        cleanups.push(setupTextHover(titleRef.current, "title"));
        cleanups.push(setupTextHover(subtitleRef.current, "subtitle"));

        return () => {
            cleanups.forEach((fn) => fn && fn());
        };
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText("Hey, I'm Bhuvi! Welcome to my", "text-3xl font-georama", 100)}
            </p>

            <h1 ref={titleRef} className="mt-7">
                {renderText("Portfolio", "text-9xl italic font-georama")}
            </h1>

            <div className="small-screen">
                <p>This portfolio is designed for desktop/tablet screens only.</p>
            </div>
        </section>
    );
};

export default Welcome;

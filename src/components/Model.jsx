import { yellowImg } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { models, sizes } from "../constants";
import ModelView from "./ModelView";
import { animateWithGsapTimeline } from "../utils/animations";
import { useEffect, useRef, useState } from "react";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  const [isUpClicked, setIsUpClicked] = useState(false);
  const [isDownClicked, setIsDownClicked] = useState(false);

  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      gsap.set("#view2", { display: "block" });

      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });

      tl.to("#view2", { display: "none", delay: 2 });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  const handleScrollUp = () => {
    setIsUpClicked(true);
    const highlightsSection = document.getElementById("highlights");
    if (highlightsSection) {
      highlightsSection.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => setIsUpClicked(false), 300);
  };

  const handleScrollDown = () => {
    setIsDownClicked(true);
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => setIsDownClicked(false), 300);
  };

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            {size === "large" && (
              <ModelView
                index={2}
                groupRef={large}
                gsapType="view2"
                controlRef={cameraControlLarge}
                setRotationState={setLargeRotation}
                item={model}
                size={size}
              />
            )}

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>

            <div className="absolute top-4 right-4">
              <button
                onClick={handleScrollUp}
                className={`bg-white p-2 rounded-full transition-opacity duration-300 ${
                  isUpClicked ? "bg-opacity-25" : "bg-opacity-50"
                }`}
                aria-label="Scroll to highlights section"
              >
                ↑
              </button>
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={handleScrollDown}
                className={`bg-white p-2 rounded-full transition-opacity duration-300 ${
                  isDownClicked ? "bg-opacity-25" : "bg-opacity-50"
                }`}
                aria-label="Scroll to features section"
              >
                ↓
              </button>
            </div>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;

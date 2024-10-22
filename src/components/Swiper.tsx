import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

import { Autoplay, Pagination, Navigation } from "swiper/modules";

type Slide = {
  src: string;
  style?: React.CSSProperties; // Optional in case some slides don't have style
  isVideo?: boolean; // Optional if you're adding the `isVideo` flag manually
};

interface SwiperSliderProps {
  slides: Slide[];
}

type SlideType = {
  realIndex: string | number;
  autoplay: { stop: () => void; start: () => void };
};

const SwiperSlider = ({ slides }: SwiperSliderProps) => {
  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const swiperRef = useRef<any>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const handleSlideChange = (swiper: SlideType) => {
    const currentSlide = slides[swiper.realIndex];
    if (currentSlide.isVideo) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  };

  const handleVideoPlay = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleVideoPause = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  const isVideo = (src: string) => {
    const videoExtensions = [".mp4", ".webm", ".ogg"];

    const lowerSrc = src.toLowerCase();

    return videoExtensions.some((extension) => lowerSrc.endsWith(extension));
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
        style={{
          direction: "ltr",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} style={slide.style}>
            {isVideo(slide.src) ? (
              <video
                src={slide.src}
                typeof="video/mp4"
                autoPlay
                muted
                loop
                playsInline
                width="100%"
                height="100%"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoPause}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img src={slide.src} alt={`slide ${index + 1}`} />
            )}
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default SwiperSlider;

import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const SwiperSlider = ({ slides }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
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

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
        style={{
          direction: "ltr"
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} style={slide.style}>
            {slide.isVideo ? (
              <video
                src={slide.src}
                type="video/mp4"
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

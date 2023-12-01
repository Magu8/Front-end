import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Carousel.scss";

import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

export default function Carousel({ slides }) {
  const { activeUser } = useContext(UserContext);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (activeUser) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [activeUser]);

  return (
    <Swiper
      modules={[EffectCoverflow, Navigation, Pagination]}
      navigation={{
        prevEl: ".button-prev",
        nextEl: ".button-next",
      }}
      pagination={{
        clickable: true,
      }}
      speed={1000}
      slidesPerView={"auto"}
      centeredSlides
      effect={"coverflow"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="slide-card">
          <img className="art-image" src={slide.image} alt={slide.title} />
          <Link to={`/${slide._id}`}>
            <h2 className="art-title">{slide.title}</h2>
          </Link>
        </SwiperSlide>
      ))}
      <div className={`button-prev ${logged && "my-button"}`}>
        <img src={arrowLeft} alt="Left" />
      </div>
      <div className={`button-next ${logged && "my-button"}`}>
        <img src={arrowRight} alt="Right" />
      </div>
    </Swiper>
  );
}

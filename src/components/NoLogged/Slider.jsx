// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SliderImg1 from './SliderImg1';
import SliderImg2 from './SliderImg2';


const Slider = () => {
    return (
        <>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide><SliderImg1></SliderImg1></SwiperSlide>
            <SwiperSlide><SliderImg2></SliderImg2></SwiperSlide>
            
          </Swiper>
        </>
      );
}

export default Slider
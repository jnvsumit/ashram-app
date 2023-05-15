import React from "react";
import Carousel from '../../components/carousel/Carousel';
const Images = [
  "https://picsum.photos/id/1018/800/400",
  "https://picsum.photos/id/1020/800/400",
  "https://picsum.photos/id/1021/800/400",
  "https://picsum.photos/id/1022/800/400",
];

const HomePageCarousel = () => {
  return <Carousel images={Images} />;
};

export default HomePageCarousel;

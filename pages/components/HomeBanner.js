import React, { useRef, useState } from 'react';
import Image from 'next/image';
import banner from '@/public/assets/banner/dummy.png';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';

const HomeBanner = () => {
    return (
        <section className='banner'>
            <div className='section_wrapper container'>
                <div className='homebanner'>
                    <div className='bannerside'>
                        <div className='bannerContent'>
                            <h1 className='bannerTitle'>What is Lorem Ipsum?</h1>
                            <p className='bannerCon'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </p>
                            <Link href="/dashboard">Check Now</Link>
                        </div>
                    </div>
                    <div className='imageside'>
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            modules={[EffectCards]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className='bannerImage'>
                                    <Image
                                        className='img-fluid'
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        src={banner}
                                        alt='Banner image'
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='bannerImage'>
                                    <Image
                                        className='img-fluid'
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        src={banner}
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default HomeBanner;

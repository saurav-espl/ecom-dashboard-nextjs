import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import category from '@/public/assets/category/Category.png';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const CategorySec = () => {
    return (
        <>
            <section className="categorySec">
                <div className='section_wrapper container'>
                    <div className='Categorycontent'>
                        <div className='SecTitle'>
                            <h2>What is Lorem Ipsum? </h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className='categoryImgDiv'>
                            <Swiper watchSlidesProgress={true} pagination={true} breakpoints={{
                                600: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                                1200: {
                                    slidesPerView: 6,
                                },
                            }} className="mySwiper">
                                <SwiperSlide>
                                    <div className='categoryImages'>
                                        <Image
                                            className='img-fluid'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            src={category}
                                            alt='Banner image'
                                        />
                                        <div className='categoryName'>
                                            <Link href="">Lorem Ipsum Lorem</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='categoryImages'>
                                        <Image
                                            className='img-fluid'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            src={category}
                                            alt='Banner image'
                                        />
                                        <div className='categoryName'>
                                            <Link href="">Lorem Ipsum Lorem</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='categoryImages'>
                                        <Image
                                            className='img-fluid'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            src={category}
                                            alt='Banner image'
                                        />
                                        <div className='categoryName'>
                                            <Link href="">Lorem Ipsum Lorem</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='categoryImages'>
                                        <Image
                                            className='img-fluid'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            src={category}
                                            alt='Banner image'
                                        />
                                        <div className='categoryName'>
                                            <Link href="">Lorem Ipsum Lorem</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='categoryImages'>
                                        <Image
                                            className='img-fluid'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            src={category}
                                            alt='Banner image'
                                        />
                                        <div className='categoryName'>
                                            <Link href="">Lorem Ipsum Lorem</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='categoryImages'>
                                        <Image
                                            className='img-fluid'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            src={category}
                                            alt='Banner image'
                                        />
                                        <div className='categoryName'>
                                            <Link href="">Lorem Ipsum Lorem</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='categoryImages'>
                                        <Image
                                            className='img-fluid'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            src={category}
                                            alt='Banner image'
                                        />
                                        <div className='categoryName'>
                                            <Link href="">Lorem Ipsum Lorem</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='categoryImages'>
                                        <Image
                                            className='img-fluid'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            src={category}
                                            alt='Banner image'
                                        />
                                        <div className='categoryName'>
                                            <Link href="">Lorem Ipsum Lorem</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>

                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CategorySec
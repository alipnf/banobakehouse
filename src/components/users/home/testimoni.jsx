import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star } from "lucide-react";

const Testimoni = () => {
  const originalItems = [
    {
      id: 1,
      name: "Siti Aisyah",
      rating: 5,
      message:
        '"Kue coklat dari BanoBakehouse sangat lezat! Rasa manisnya pas dan teksturnya begitu lembut. Pasti akan membeli lagi!"',
    },
    {
      id: 2,
      name: "Andi Pratama",
      rating: 4,
      message:
        '"Kue red velvet-nya enak banget! Hanya sedikit lebih manis dari yang saya suka, tapi overall sangat nikmat!"',
    },
    {
      id: 3,
      name: "Dewi Lestari",
      rating: 5,
      message:
        '"Kue tart ulang tahun yang saya pesan sangat cantik dan enak! Semua tamu saya suka dan memberikan pujian."',
    },
    {
      id: 4,
      name: "Budi Santoso",
      rating: 4,
      message:
        '"Kue pisang coklatnya luar biasa! Cuma sedikit lebih padat dari yang saya harapkan, tapi tetap enak!"',
    },
    {
      id: 5,
      name: "Fajar Pratama",
      rating: 5,
      message:
        '"BanoBakehouse tidak pernah mengecewakan. Kue-kue mereka selalu segar dan terasa homemade. Pasti akan kembali lagi!"',
    },
    {
      id: 6,
      name: "Rina Maheswari",
      rating: 5,
      message:
        '"Kue keju yang saya pesan adalah yang terbaik yang pernah saya coba. Rasanya sempurna, tidak terlalu berat dan sangat lezat!"',
    },
  ];

  return (
    <div className="bg-primary">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Apa Kata Pelanggan Kami
        </h2>
        <p className="mt-4 text-xl text-gray-500">
          Testimoni dari pelanggan setia BanoBakehouse
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-full mt-10">
        <div className="md:w-4/5 w-full mx-auto h-fit">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            speed={5000}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            allowTouchMove={false}
            className="h-[600px]"
          >
            {originalItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col items-center">
                  <img
                    src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                    className="w-24 h-24 rounded-full object-cover object-top relative top-14"
                    alt={item.name}
                  />
                  <div className="bg-white shadow-lg rounded-xl w-80 h-96 flex flex-col justify-center items-center p-6 mt-2">
                    <div className="text-center my-10">
                      <p className="text-gray-700">{item.message}</p>
                    </div>
                    <div className="text-center">
                      <h1 className="font-bold text-2xl">{item.name}</h1>
                    </div>
                    {/* Star Rating */}
                    <div className="flex mt-4">
                      {[...Array(item.rating)].map((_, index) => (
                        <Star
                          key={index}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* End Slider */}
    </div>
  );
};

export default Testimoni;

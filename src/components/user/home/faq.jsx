import { getFAQ } from "@/services/firebase/faq-service";
import { useEffect, useState } from "react";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const faqData = await getFAQ();
        if (faqData && faqData.faqs) {
          setFaqs(faqData.faqs);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFAQs();
  }, []);

  // Fungsi untuk toggle accordion
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Jika sudah aktif, tutup; jika tidak, buka
  };

  return (
    <div className="mt-5 pt-4 max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold dark:text-primary text-secondary sm:text-4xl">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-500">
          Temukan jawaban untuk pertanyaan umum tentang layanan kami
        </p>
      </div>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          <button
            className="py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-200 dark:hover:text-neutral-400"
            onClick={() => toggleAccordion(index)} // Toggle accordion saat tombol diklik
          >
            <span className="text-base sm:text-lg">{faq.question}</span>
            <svg
              className={`size-4 transition-transform duration-300 ${
                activeIndex === index ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
          <div
            className={`${
              activeIndex === index ? "block" : "hidden"
            } overflow-hidden transition-[height] duration-300`}
          >
            <p className="text-gray-800 dark:text-neutral-200 text-base sm:text-lg py-4">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;

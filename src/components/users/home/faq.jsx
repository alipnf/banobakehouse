import { useEffect } from "react";

const Faq = () => {
  useEffect(() => {
    window.dispatchEvent(new Event("load"));
  }, []);

  const faqs = [
    {
      question: "Berapa lama waktu pemesanan yang dibutuhkan?",
      answer:
        "Untuk kue reguler, pemesanan minimal 3 hari sebelum pengambilan. Untuk kue pernikahan atau acara besar, disarankan memesan minimal 2 minggu sebelumnya.",
    },
    {
      question: "Apakah bisa request desain kue khusus?",
      answer:
        "Ya, kami menerima request desain khusus. Silakan konsultasikan desain yang Anda inginkan minimal 1 minggu sebelum pemesanan.",
    },
    {
      question: "Apakah tersedia layanan pengiriman?",
      answer:
        "Ya, kami menyediakan layanan pengiriman melalui GoFood dan GrabFood untuk area tertentu. Untuk kue pernikahan, kami memiliki layanan pengiriman khusus.",
    },
    {
      question: "Apakah tersedia opsi kue untuk diet khusus?",
      answer:
        "Ya, kami menyediakan opsi kue bebas gluten, rendah gula, dan vegetarian. Harap informasikan kebutuhan diet khusus Anda saat memesan.",
    },
    {
      question: "Bagaimana cara melakukan pembayaran?",
      answer:
        "Kami menerima pembayaran melalui transfer bank dan e-wallet (GoPay, OVO, Dana). Untuk pemesanan kue pernikahan, diperlukan DP minimal 50%.",
    },
  ];

  return (
    <div className="hs-accordion-group mt-5 pt-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-500">
          Temukan jawaban untuk pertanyaan umum tentang layanan kami
        </p>
      </div>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="hs-accordion"
          id={`hs-basic-with-title-and-arrow-stretched-heading-${index + 1}`}
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
            aria-expanded="false"
            aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${index + 1}`}
          >
            <span className="text-base sm:text-lg">{faq.question}</span>
            <svg
              className="hs-accordion-active:hidden block size-4"
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
            <svg
              className="hs-accordion-active:block hidden size-4"
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
              <path d="m18 15-6-6-6 6"></path>
            </svg>
          </button>
          <div
            id={`hs-basic-with-title-and-arrow-stretched-collapse-${index + 1}`}
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            role="region"
            aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${index + 1}`}
          >
            <p className="text-gray-800 dark:text-neutral-200 text-base sm:text-lg">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;

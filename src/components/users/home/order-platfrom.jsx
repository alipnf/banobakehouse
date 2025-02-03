const OrderPlatforms = () => {
  return (
    <section className="bg-light dark:bg-dark mt-10 pt-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold dark:text-primary text-secondary sm:text-4xl">
            Pemesanan
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-300">
            Pesan Melalui WhatsApp atau Order Lewat GoFood
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center space-x-6">
          <button className="py-3 px-5 text-sm sm:text-base font-medium rounded-lg bg-secondary text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 dark:bg-light dark:text-dark">
            WhatsApp
          </button>
          <button className="py-3 px-5 text-sm sm:text-base font-medium rounded-lg bg-secondary text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 dark:bg-light dark:text-dark">
            GoFood
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderPlatforms;

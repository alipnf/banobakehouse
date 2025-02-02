const OrderPlatforms = () => {
  return (
    <section className="bg-gray-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pemesanan
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Pesan Melalui Platform Favorit
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center space-x-6">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black">
            GoFood
          </button>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black">
            GrabFood
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderPlatforms;

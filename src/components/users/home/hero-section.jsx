const HeroSection = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
              <span className="block">Kue Terbaik untuk</span>
              <span className="block text-primary-600 dark:text-primary-400">
                Momen Spesialmu
              </span>
            </h1>

            <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 sm:mt-5 sm:max-w-xl mx-auto lg:mx-0">
              Temukan kue yang sempurna untuk setiap momen spesial dalam
              hidupmu. Dibuat dengan cinta dan bahan berkualitas terbaik.
            </p>

            <div className="mt-5 sm:mt-8 flex justify-center lg:justify-start">
              <button
                type="button"
                className="py-3 px-5 text-sm sm:text-base font-medium rounded-lg bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 dark:bg-white dark:text-gray-800"
              >
                Mulai Pilih Kue
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              className="h-48 w-full sm:h-64 md:h-80 lg:h-full lg:w-auto object-cover rounded-lg"
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80"
              alt="Birthday cake"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

const VerifiedSection = () => {
  return (
    <div className="flex flex-col w-full mb-40 relative">
      <div className="z-20 flex flex-col">
        <div className="flex justify-between items-center">
          <span className="font-extrabold text-[3rem] text-mds-white">Verified users</span>
          <a href="https://www.youtube.com/" className="text-mds-cyan text-xl font-semibold">
            View more
            <i className="fa-solid fa-arrow-up-right-from-square ml-2" />
          </a>
        </div>
        {/* Simulando o espaço ocupado pelo carrossel  */}
        <div className="h-[400px] w-full bg-mds-gray-300 mt-10" />
      </div>
    </div>
  );
};

export default VerifiedSection;

export const Footer = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[108px]">
        <div className="">
          <input className="my-3 w-80 h-9 bg-[#F1F5F9] rounded-full" />
        </div>
        <div className="flex items-center mb-3 text-white">
          <button className="px-4 mr-2 h-9 text-sm bg-primary rounded-full">
            + 今日する
          </button>
          <button className="px-4 mr-2 h-9 text-sm bg-secondary rounded-full">
            + 明日する
          </button>
          <button className="px-4 h-9 text-sm bg-tertiary rounded-full">
            + 今度する
          </button>
        </div>
      </div>
    </>
  );
};

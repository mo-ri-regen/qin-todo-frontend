import { useState } from "react";
import { Footer } from "src/layout/Footer";

export const TodoToday = () => {
  const [isFooterShow, setIsFooterShow] = useState(false);
  const handleOnToggleFooter = () => {
    setIsFooterShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };
  return (
    <>
      <div className="mb-3 text-2xl text-primary">今日する</div>
      <div className="flex items-center">
        <button
          className="px-2 mr-2 text-white bg-gray-500 rounded-full"
          onClick={handleOnToggleFooter}
        >
          +
        </button>
        <input placeholder="タスクを追加する" />
      </div>
      <div
        className={`overflow-hidden fixed w-full h-3/5 bottom-14 right-0 z-10 transform ease-in-out duration-300 ${
          isFooterShow ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer />
      </div>
    </>
  );
};

import { useState } from "react";
// import { Footer } from "src/layout/Footer";

export const TodoToday = () => {
  const [todos, setTodos] = useState<any>([]);
  const [tmpTodo, setTmpTodo] = useState("");
  const [error, setError] = useState(" ");
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
  const handleAddTodo = () => {
    if (tmpTodo === "") {
      setError("入力してください");
      return;
    }
    setTodos([...todos, tmpTodo]);
    setTmpTodo("");
  };
  const handleOnChange = (e: any) => {
    setTmpTodo(e.target.value);
    setError("");
  };
  return (
    <>
      <div className="mb-3 text-2xl text-primary">今日する</div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <button
            className="px-2 mr-2 text-white bg-gray-500 rounded-full"
            onClick={handleOnToggleFooter}
          >
            +
          </button>
          <input placeholder="タスクを追加する" />
        </div>
        <div className="overflow-y-scroll m-5 max-h-36">
          <ol>
            {todos.map((todo: any, index: any) => {
              return (
                <div key={index}>
                  <li>{todo}</li>
                </div>
              );
            })}
          </ol>
        </div>
      </div>
      <div
        className={`overflow-hidden fixed w-full h-2/5 bottom-12 right-0 z-10 transform ease-in-out duration-300 ${
          isFooterShow ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* <Footer /> */}
        <>
          <div className="flex flex-col justify-center items-center h-[108px]">
            <div className="">
              <input
                className="p-2 my-3 w-80 h-9 bg-[#F1F5F9] rounded-full"
                onChange={handleOnChange}
                value={tmpTodo}
              />
            </div>
            <div className="flex items-center mb-3 text-white">
              <button
                className="px-4 mr-2 h-9 text-sm bg-primary rounded-full"
                onClick={handleAddTodo}
              >
                + 今日する
              </button>
              <button className="px-4 mr-2 h-9 text-sm bg-secondary rounded-full">
                + 明日する
              </button>
              <button className="px-4 h-9 text-sm bg-tertiary rounded-full">
                + 今度する
              </button>
            </div>
            <div className="text-sm text-gray-400"> {error}</div>
          </div>
        </>
      </div>
    </>
  );
};

export const TodoToday = () => {
  return (
    <>
      <div className="mb-3 text-2xl text-primary">今日する</div>
      <div className="flex items-center">
        <button className="px-2 mr-2 text-white bg-gray-500 rounded-full">
          +
        </button>
        <input placeholder="タスクを追加する" />
      </div>
    </>
  );
};

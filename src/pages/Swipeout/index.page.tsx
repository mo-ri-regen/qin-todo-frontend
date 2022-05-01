import "rc-swipeout/assets/index.css";

import Swipeout from "rc-swipeout";

const Swipe = () => {
  return (
    <div style={{ marginBottom: 12 }}>
      <Swipeout
        right={[
          {
            text: "複製",
            // onPress: handleCopyTodo,
            className:
              "custom-class-2 text-sm sm:hidden bg-secondary text-white",
          },
          {
            text: "削除",
            // onPress: handleDeleteTodo,
            className: "custom-class-2 text-sm sm:hidden bg-primary text-white",
          },
        ]}
        autoClose={true}
      >
        <div className="h-11 text-2xl leading-[44px] bg-white border-[#dedede] border-x-2">
          swipe out simple demo
        </div>
      </Swipeout>
    </div>
  );
};

export default Swipe;

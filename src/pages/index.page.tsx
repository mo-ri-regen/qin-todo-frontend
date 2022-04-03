import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  Over,
  PointerActivationConstraint,
} from "@dnd-kit/core";
import { closestCorners } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import type { DOMAttributes } from "react";
import { useEffect } from "react";
import { ListTodo } from "src/components/ListTodo";
import { AddTaskButton } from "src/components/shared/Buttons/AddTaskButton";
import { Layout } from "src/layout";
import { FooterButtons } from "src/layout/Footer/FooterButtons";
import { getStringFromDate } from "src/libs/dateFunc";
import { useStore } from "src/libs/store";
import type { TodosState } from "src/types";

const Home = () => {
  const getTodos = useStore((state) => {
    return state.getTodos;
  });
  const allTodos = useStore((state: TodosState) => {
    return state.todos;
  });
  const findTarget = useStore((state) => {
    return state.findTarget;
  });
  const activeTarget = useStore((state) => {
    return state.activeTarget;
  });
  const orveTarget = useStore((state) => {
    return state.orveTarget;
  });
  const setActiveId = useStore((state) => {
    return state.setActiveId;
  });
  const taskDropOver = useStore((state) => {
    return state.taskDropOver;
  });
  const taskDropEnd = useStore((state) => {
    return state.taskDropEnd;
  });
  const toggleIsAddInput = useStore((state) => {
    return state.toggleIsAddInput;
  });
  const date = new Date();
  const strDate = getStringFromDate(date);

  const todayTodosLen = allTodos.filter((todo) => {
    return (
      (todo.dueDate <= strDate && todo.dueDate != "") || todo.completeDate != ""
    );
  }).length;
  const nextdayTodosLen = allTodos.filter((todo) => {
    return todo.dueDate > strDate && todo.completeDate == "";
  }).length;
  const otherTodosLen = allTodos.filter((todo) => {
    return todo.dueDate == "";
  }).length;
  // 削除処理などのクリックと、並び替え処理のドラッグアンドドロップの判断用に５ミリ秒
  // 以上つかんだらドラッグアンドドロップと判断する。（これがないと削除できない）
  const activationConstraint: PointerActivationConstraint = {
    distance: 5,
  };
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint }),
    useSensor(MouseSensor, { activationConstraint }),
    useSensor(TouchSensor, { activationConstraint }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // つかんだとき;
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;

    // つかんだタスクがあるコンテナを保存しておく
    setActiveId(id);
  };

  //動かして他の要素の上に移動した時
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as Over;

    // Find the containers
    findTarget(id, true);
    findTarget(overId, false);

    taskDropOver(id, overId, strDate);
  };

  //要素を離したとき
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as Over;

    findTarget(id, true);
    findTarget(overId, false);

    if (!activeTarget || !orveTarget || activeTarget !== orveTarget) {
      return;
    }

    taskDropEnd(id, overId, strDate);
  };

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AddMobileTaskButton = () => {
    const handleOnClick: DOMAttributes<HTMLButtonElement>["onClick"] = () => {
      toggleIsAddInput(true);
    };
    return (
      <div className="lg:hidden">
        <AddTaskButton onClick={handleOnClick} />
      </div>
    );
  };

  return (
    <Layout>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 mb-6">
          <div>
            <div className="mb-3 text-2xl font-semibold text-primary">
              今日する
            </div>
            <div className="flex flex-col">
              {todayTodosLen === 0 && <AddMobileTaskButton />}
              <ListTodo title="今日する" target="today" />
            </div>
          </div>
          <div>
            <div />
            <div className="mb-3 text-2xl font-semibold text-secondary">
              明日する
            </div>
            <div className="flex flex-col">
              {nextdayTodosLen === 0 && <AddMobileTaskButton />}
              <ListTodo title="明日する" target="nextday" />
            </div>
          </div>
          <div>
            <div className="mb-3 text-2xl font-semibold text-tertiary">
              今度する
            </div>
            <div className="flex flex-col">
              {otherTodosLen === 0 && <AddMobileTaskButton />}
              <ListTodo title="今度する" target="other" />
            </div>
          </div>
          <FooterButtons />
        </div>
      </DndContext>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/signin",
})(Home);

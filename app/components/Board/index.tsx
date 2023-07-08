"use client";

import { useEffect } from "react";
import { useBoardStore } from "@/store/boardStore";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableColumn from "@/app/components/Board/SortableColumn";

const Board = () => {
  const { columns, todos, fetchBoard, changeColumnOrder } = useBoardStore();

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  console.log(columns);
  console.log(todos);

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(PointerSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event);

    if (event.over === null) return;

    const activeId = event.active.id as string;
    const overId = event.over.id as string;

    changeColumnOrder(activeId, overId);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext id="board" items={columns.allIds}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {columns.allIds.map((status) => (
            <SortableColumn key={status} id={status} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Board;

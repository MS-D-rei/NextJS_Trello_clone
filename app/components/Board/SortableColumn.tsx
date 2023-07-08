import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableColumnProps {
  id: string;
}

const SortableColumn: React.FC<SortableColumnProps> = ({ id, index, todos }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-2 rounded-2xl shadow-sm">
      <h2>{id}</h2>
    </div>
  )
};

export default SortableColumn;

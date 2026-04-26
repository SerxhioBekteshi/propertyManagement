interface NoResultsProps {
  title: string;
  description?: string;
  onAddClick?: () => void;
  titleButton?: string;
  isSingle?: boolean;
}

import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const NoResults = (props: NoResultsProps) => {
  const { title, description, onAddClick, titleButton } = props;

  return (
    <div className="w-full flex-col flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center p-4 rounded-lg  max-w-md">
        <img
          src={"/images/notFound.svg"}
          alt="No results"
          width={500}
          height={500}
        />
        <div className="text-lg font-semibold text-gray-900">{title}</div>
        {description && (
          <div className="text-sm text-gray-500">{description}</div>
        )}
      </div>
      {titleButton && (
        <Button onClick={onAddClick} size="sm">
          <Plus size={16} />
          {titleButton}
        </Button>
      )}
    </div>
  );
};
export default NoResults;

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
  const {
    title,
    description,
    onAddClick,
    titleButton,
    isSingle = false,
  } = props;

  return (
    <div className="w-full flex-col flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3 text-center  rounded-lg bg-white p-8 max-w-md">
        <img
          src={!isSingle ? "/noRecordsFound.png" : "/noDataFound.png"}
          alt="No results"
          width={120}
          height={120}
        />
        <div className="text-lg font-semibold text-gray-900">{title}</div>
        {description && (
          <div className="text-sm text-gray-500">{description}</div>
        )}
      </div>
      {titleButton && (
        <Button
          onClick={onAddClick}
          size="sm"
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} />
          {titleButton}
        </Button>
      )}
    </div>
  );
};
export default NoResults;

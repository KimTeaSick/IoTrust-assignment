const ListItemSkeleton = () => {
  return (
    <div className="flex justify-between p-3 border-t border-b border-gray-300 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded"></div>
      <div className="flex-1 ml-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default ListItemSkeleton;

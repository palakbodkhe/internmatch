const Spinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
};

export default Spinner;

/* eslint-disable react/prop-types */
const ComicPanel = ({ selected, setSelectedBlock, imageUrl, loading }) => {
  return (
    <div
      className={`rounded-lg cursor-pointer hover:bg-cyan-200 border-2 border-gray-300 shadow-lg m-2 flex justify-center items-center ${
        selected && "bg-cyan-200"
      }`}
      style={{ width: "300px", height: "300px" }}
      onClick={setSelectedBlock}
    >
      {imageUrl && <img src={imageUrl} className="w-full h-full rounded-lg" />}
      {loading && (
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default ComicPanel;

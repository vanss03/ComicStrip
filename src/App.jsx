import "./App.css";
import { useState } from "react";
import ComicPanel from "./components/comic-panel";

function App() {
  const [prompt, setPrompt] = useState("");
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [imageUrls, setImageUrls] = useState(new Array(10).fill(null));
  const [loadingStatus, setLoadingStatus] = useState(new Array(10).fill(false));

  const setLoadingStatusToTrue = () => {
    setLoadingStatus((prev) => {
      const arr = [...prev];
      arr[selectedBlock] = true;
      return arr;
    });
  };

  const setLoadingStatusToFalse = () => {
    setLoadingStatus((prev) => {
      const arr = [...prev];
      arr[selectedBlock] = false;
      return arr;
    });
  };

  const resetImageUrl = () => {
    setImageUrls((prev) => {
      const arr = [...prev];
      arr[selectedBlock] = null;
      return arr;
    });
  };

  const setImageUrl = (imageUrl) => {
    setImageUrls((prev) => {
      const arr = [...prev];
      arr[selectedBlock] = imageUrl;
      return arr;
    });
  };

  const onSubmitPrompt = async (e) => {
    e.preventDefault();
    setLoadingStatusToTrue();
    resetImageUrl();
    setSelectedBlock(null);

    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          Accept: "image/png",
          Authorization:
            "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );
    const blob = await response.blob();
    const newImageUrl = URL.createObjectURL(blob);

    setImageUrl(newImageUrl);
    setLoadingStatusToFalse();
  };

  return (
    <div
      className="flex flex-col items-center py-5 md:py-10 px-5 md:px-10 lg:px-16 xl:px-24 ml-auto mr-auto"
      style={{ height: "100vh" }}
    >
      <div className="w-full">
        <form onSubmit={onSubmitPrompt}>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter a prompt..."
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={selectedBlock === null}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {selectedBlock === null && (
        <div className="mt-5 text-red-400 font-semibold text-sm border rounded-lg px-4 py-2 bg-red-100 border-red-600">
          Please select a comic panel for image generation!
        </div>
      )}
      <div className="mt-10 w-full rounded-lg p-1 flex flex-wrap justify-center">
        {Array.from(Array(10).keys()).map((number) => (
          <ComicPanel
            key={number}
            selected={selectedBlock !== null && selectedBlock === number}
            setSelectedBlock={() => setSelectedBlock(number)}
            imageUrl={imageUrls[number]}
            loading={loadingStatus[number]}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

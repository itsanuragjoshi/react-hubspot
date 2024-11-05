import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  currentPage,
  totalResults,
  resultsPerPage,
  onPageChange,
  onResultsPerPageChange,
}) {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const startIndex = (currentPage - 1) * resultsPerPage + 1;
  const endIndex = Math.min(currentPage * resultsPerPage, totalResults);

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <label htmlFor="resultsPerPage" className="mr-2">
          Results per page
        </label>
        <select
          id="resultsPerPage"
          className="bg-background text-foreground border border-input p-1"
          onChange={(e) => onResultsPerPageChange(Number(e.target.value))}
          value={resultsPerPage}
        >
          {[10, 25, 50, 100].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="totalResults">
        {startIndex}&ndash;{endIndex} of {totalResults}
      </div>

      <div className="flex items-center">
        <Button
          variant="outline"
          size="sm"
          icon={ChevronLeft}
          showIcon={true}
          showText={false}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          title="Previous"
        >
          Previous
        </Button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          icon={ChevronRight}
          showIcon={true}
          showText={false}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          title="Next"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Pagination;

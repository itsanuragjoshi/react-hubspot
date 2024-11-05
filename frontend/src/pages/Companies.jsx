import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import Pagination from "../components/ui/Pagination";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [displayedCompanies, setDisplayedCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [nextAfter, setNextAfter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchCompanies = async (nextAfter = null, abortSignal) => {
    try {
      setIsLoading(true);

      const url = new URL("http://localhost:3000/api/companies");
      if (nextAfter) {
        url.searchParams.append("after", nextAfter);
      }

      const response = await fetch(url.toString(), { signal: abortSignal });

      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }

      const data = await response.json();
      const newCompanies = data.companies || [];

      setCompanies((prevCompanies) => [...prevCompanies, ...newCompanies]);
      setTotalResults((prevTotal) => prevTotal + newCompanies.length);
      setNextAfter(data.nextAfter);
      setHasMore(data.hasMore);
      setError(null);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchCompanies(null, signal);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;

    if (endIndex >= companies.length && hasMore) {
      const controller = new AbortController();
      const { signal } = controller;

      fetchCompanies(nextAfter, signal);

      return () => {
        controller.abort();
      };
    } else {
      setDisplayedCompanies(companies.slice(startIndex, endIndex));
    }
  }, [companies, page, resultsPerPage, hasMore]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleResultsPerPageChange = (newResultsPerPage) => {
    setResultsPerPage(newResultsPerPage);
    setPage(1);
  };

  const columnHeaders = { name: "Name", domain: "Domain" };

  return (
    <div className="flex flex-col w-full p-3 gap-3">
      <div className="flex">
        <div className="flex flex-1 items-center">
          <h1>All Companies</h1>
        </div>
      </div>

      {isLoading && page === 1 ? (
        <p>Loading companies...</p>
      ) : displayedCompanies.length > 0 ? (
        <>
          <Table data={displayedCompanies} columnHeaders={columnHeaders} />
          <Pagination
            currentPage={page}
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onPageChange={handlePageChange}
            onResultsPerPageChange={handleResultsPerPageChange}
          />
        </>
      ) : (
        <p>No companies to display.</p>
      )}
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}

export default Companies;

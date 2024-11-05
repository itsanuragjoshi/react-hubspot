import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import Pagination from "../components/ui/Pagination";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [displayedTickets, setDisplayedTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [nextAfter, setNextAfter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchTickets = async (nextAfter = null, abortSignal) => {
    try {
      setIsLoading(true);

      const url = new URL("http://localhost:3000/api/tickets");
      if (nextAfter) {
        url.searchParams.append("after", nextAfter);
      }

      const response = await fetch(url.toString(), { signal: abortSignal });

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await response.json();
      const newTickets = data.tickets || [];

      setTickets((prevTickets) => [...prevTickets, ...newTickets]);
      setTotalResults((prevTotal) => prevTotal + newTickets.length);
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

    fetchTickets(null, signal);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;

    if (endIndex >= tickets.length && hasMore) {
      const controller = new AbortController();
      const { signal } = controller;

      fetchTickets(nextAfter, signal);

      return () => {
        controller.abort();
      };
    } else {
      setDisplayedTickets(tickets.slice(startIndex, endIndex));
    }
  }, [tickets, page, resultsPerPage, hasMore]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleResultsPerPageChange = (newResultsPerPage) => {
    setResultsPerPage(newResultsPerPage);
    setPage(1);
  };

  const columnHeaders = {
    hs_pipeline: "Pipeline",
    hs_pipeline_stage: "Pipeline Stage",
  };

  return (
    <div className="flex flex-col w-full p-3 gap-3">
      <div className="flex">
        <div className="flex flex-1 items-center">
          <h1>All Tickets</h1>
        </div>
      </div>

      {!isLoading && displayedTickets?.length > 0 ? (
        <>
          <Table data={displayedTickets} columnHeaders={columnHeaders} />
          <Pagination
            currentPage={page}
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onPageChange={handlePageChange}
            onResultsPerPageChange={handleResultsPerPageChange}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}

export default Tickets;

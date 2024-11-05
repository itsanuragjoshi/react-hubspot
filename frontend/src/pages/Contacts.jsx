import { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import Pagination from "../components/ui/Pagination";
import { Button } from "../components/ui/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Contacts() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [nextAfter, setNextAfter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchContacts = async (nextAfter = null, abortSignal) => {
    try {
      setIsLoading(true);

      const url = new URL("http://localhost:3000/api/contacts");
      if (nextAfter) {
        url.searchParams.append("after", nextAfter);
      }

      const response = await fetch(url.toString(), { signal: abortSignal });

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      const newContacts = data.contacts || [];

      setContacts((prevContacts) => [...prevContacts, ...newContacts]);
      setTotalResults((prevTotal) => prevTotal + newContacts.length);
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

    fetchContacts(null, signal);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;

    if (endIndex >= contacts.length && hasMore) {
      const controller = new AbortController();
      const { signal } = controller;

      fetchContacts(nextAfter, signal);

      return () => {
        controller.abort();
      };
    } else {
      setDisplayedContacts(contacts.slice(startIndex, endIndex));
    }
  }, [contacts, page, resultsPerPage, hasMore]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleResultsPerPageChange = (newResultsPerPage) => {
    setResultsPerPage(newResultsPerPage);
    setPage(1);
  };

  const columnHeaders = { fullname: "Full Name", email: "Email" };

  return (
    <div className="flex flex-col w-full p-3 gap-3">
      <div className="flex">
        <div className="flex flex-1 items-center">
          <h1>All Contacts</h1>
        </div>
        <Button
          icon={Plus}
          showIcon={true}
          showText={true}
          onClick={() => navigate("/contacts/new")}
          aria-label="Add Contact"
          title="Add Contact"
        >
          New Contact
        </Button>
      </div>

      {!isLoading && displayedContacts.length > 0 ? (
        <>
          <Table data={displayedContacts} columnHeaders={columnHeaders} />
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

export default Contacts;

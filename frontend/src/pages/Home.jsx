import { Check } from "lucide-react";

function Home() {
  return (
    <div className="flex flex-col p-3 gap-3">
      <h1 className="text-xl font-bold">
        Welcome to the HubSpot CRM Integration Project!
      </h1>
      <p>
        This app makes it easy to view and manage contacts, companies, and
        tickets stored in HubSpot. Here are the key features to help you
        navigate efficiently:
      </p>
      <div className="flex items-start gap-2">
        <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
        <span>
          <strong>View Contacts and Companies:</strong> See lists of contacts
          with their full names and emails, and look up company details like
          domain and name.
        </span>
      </div>
      <div className="flex items-start gap-2">
        <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
        <span>
          <strong>Add New Contacts:</strong> Use a simple form to quickly add
          new contacts with essential details.
        </span>
      </div>
      <div className="flex items-start gap-2">
        <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
        <span>
          <strong>Pagination for Large Data:</strong> For bigger lists,
          pagination keeps everything organized. Navigate between pages,
          selecting results per page (e.g., 10, 50, or 100 items).
        </span>
      </div>

      <div className="flex items-start gap-2">
        <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
        <span>
          <strong>Ticket Status Tracking:</strong> Check support tickets and see
          where each one is in the pipeline.
        </span>
      </div>
    </div>
  );
}

export default Home;

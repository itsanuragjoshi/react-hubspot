import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="flex flex-1 justify-end gap-4 p-3">
      <NavLink
        to="/contacts"
        className={({ isActive }) =>
          isActive ? "text-primary" : ""
        }
      >
        Contacts
      </NavLink>
      <NavLink
        to="/companies"
        className={({ isActive }) =>
          isActive ? "text-primary" : ""
        }
      >
        Companies
      </NavLink>
      <NavLink
        to="/tickets"
        className={({ isActive }) =>
          isActive ? "text-primary" : ""
        }
      >
        Tickets
      </NavLink>
    </nav>
  );
}

export default Navigation;

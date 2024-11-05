// Header.js
import { Link } from "react-router-dom";
import { ThemeToggle } from "../features/themes";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="flex flex-row p-3 border-b border-input">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-xl">ReactHubspot</h1>
        </Link>
      </div>
      <Navigation />
      <ThemeToggle />
    </header>
  );
}

export default Header;

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col gap-6 flex-wrap items-center p-3 justify-center border-t border-input">
      <pre>
        <span>React-Hubspot © {currentYear}, </span>
        <span>Developed with ❤️ by </span>
        <a
          href="https://github.com/itsanuragjoshi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Anurag Joshi
        </a>
      </pre>
    </footer>
  );
}

export default Footer;

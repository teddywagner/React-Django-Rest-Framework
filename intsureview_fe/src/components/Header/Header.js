import "./Header.css";

export const Header = () => {
  const onClick = (e, site) => {
    e.preventDefault();

    if (site === "github") {
      window.open("https://www.github.com/teddywagner", "_blank");
    } else if (site === "linkedIn") {
      window.open("https://www.linkedin.com/in/nicholas-e-wagner/", "_blank");
    }
  };

  return (
    <div className="site-header">
      <div className="logo">
        <h1 className="name">Shelf It</h1>
        <p className="tagline">A place to store your stuff</p>
      </div>
      <div className="nav">
        <button className="nav-button" onClick={(e) => onClick(e, "github")}>
          <i className="pi pi-github" />
        </button>
        <button className="nav-button" onClick={(e) => onClick(e, "linkedIn")}>
          <i className="pi pi-linkedin" />
        </button>
      </div>
    </div>
  );
};

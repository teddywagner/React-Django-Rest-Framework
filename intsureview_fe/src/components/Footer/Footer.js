import "./Footer.css";

// simple footer compenent with mock links to different pages
// modeled after the LinkedIn 404 page footer
export const Footer = () => {
  return (
    <div className="site-footer">
      <a href="/">Shelf It © 2023</a>
      <a href="/">User Agreement</a>
      <a href="/">Privacy Policy</a>
      <a href="/">About</a>
    </div>
  );
};

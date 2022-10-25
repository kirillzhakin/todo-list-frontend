import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__project-name">
        TODO list
      </p>
     
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        

    </footer>
  );
}

export default Footer;

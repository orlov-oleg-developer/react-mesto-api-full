export default function Footer() {

  const year = new Date().getFullYear();

  return(
    <footer className="footer root__footer">
      <p className="footer__copyright">&copy; {year} Mesto Russia</p>
    </footer>
  )
}

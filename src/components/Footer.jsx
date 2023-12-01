import "../styles/Footer.scss";

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-black text-base-300">
      <aside>
        <h4> (z) {new Date().getFullYear()} - All left reserved by Magu </h4>
      </aside>
    </footer>
  );
}

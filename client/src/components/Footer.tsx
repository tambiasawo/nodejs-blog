export default function Footer() {
  return (
    <footer
      style={{
        margin: "4rem",
        textAlign: "center",
        borderTop: "1px solid #ccc",
        paddingTop: "15px",
      }}
    >
      © {new Date().getFullYear()} Tambi’s Blog • Built with ❤️ and Node
    </footer>
  );
}

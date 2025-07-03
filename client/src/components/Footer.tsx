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
      © {new Date().getFullYear()} Built by{" "}
      <a href="https://linkedin.com/in/asawot">Tambi</a> • Built with ❤️ and
      Node
    </footer>
  );
}

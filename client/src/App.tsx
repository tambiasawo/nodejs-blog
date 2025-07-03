import React from "react";
import About from "./pages/About";
import Home from "./pages/Home";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import useAuth from "./authContext";
import Post from "./pages/Post";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "./action";
import Footer from "./components/Footer";

function App() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    const result = await signOut();
    if (result?.ok) {
      updateUser(null);
      navigate("login");
    }

    setAnchorEl(null);
  };

  return (
    <main
      className="app-container"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <header className="header">
        <nav>
          <h1>
            <Link to="/" style={{ textDecoration: "none" }}>
              NodeJS Blog
            </Link>
          </h1>
          <section className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About </Link>
            {user ? (
              <div>
                <img
                  src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?t=st=1715897070~exp=1715900670~hmac=9e79fa53774f246c5bf20aa780028b41065c4bc057850f7282f041dd51e94d4f&w=35"
                  style={{
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  height={"35px"}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </section>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:id" element={<Post />} />

          {user && <Route path={"/profile"} element={<Profile />} />}
        </Routes>
      </header>

      <Footer />
    </main>
  );
}

export default App;

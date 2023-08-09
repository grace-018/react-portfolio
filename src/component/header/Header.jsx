import { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { Link as ScrollLink } from "react-scroll";
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  IconButton,
  Stack,
  SwipeableDrawer,
} from "@mui/material";

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenNavMenu = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setIsDrawerOpen(false);
  };

  const pages = [
    { to: "about", text: "About" },
    { to: "skills", text: "Skills" },
    { to: "projects", text: "Projects" },
    { to: "contact", text: "Contact Me" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#65451F", width: "100vw" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontFamily: "Merriweather",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "#EAC696",
            textDecoration: "none",
            marginRight: "5px",
            cursor: "pointer",
          }}
        >
          <ScrollLink
            to="home"
            smooth={true}
            activeClass="active"
            spy={true}
            duration={500}
          >
            {" "}
            GRACE
          </ScrollLink>
        </Typography>

        <Typography
          variant="body"
          component="span"
          sx={{ flexGrow: 1, marginRight: "10px" }}
        ></Typography>

        {/*Mobile Navigation with hamburger icon */}
        <IconButton
          color="inherit"
          aria-label="menu"
          sx={{ display: { sm: "flex", md: "none" }, marginLeft: "5px" }}
          onClick={handleOpenNavMenu}
        >
          <FcMenu />
        </IconButton>

        <SwipeableDrawer
          anchor="right"
          open={isDrawerOpen}
          onClose={handleCloseNavMenu}
          onOpen={handleOpenNavMenu}
          PaperProps={{
            sx: { width: "50vw" },
          }}
        >
          <br />
          {pages.map((item, index) => (
            <div key={index}>
              <MenuItem onClick={handleCloseNavMenu}>
                {" "}
                <ScrollLink
                  activeClass="active"
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  {item.text}{" "}
                </ScrollLink>
              </MenuItem>
            </div>
          ))}
          <MenuItem
            onClick={handleCloseNavMenu}
            component="a"
            href="https://tinyurl.com/grace018"
            target="_blank"
          >
            Resume
          </MenuItem>
        </SwipeableDrawer>

        <Stack spacing={5} direction="row">
          <Typography
            variant="body1"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Arial",
              letterSpacing: ".1rem",
              color: "#FAF0D7",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <ScrollLink to="about" smooth={true}>
              About
            </ScrollLink>
          </Typography>

          <Typography
            variant="body1"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Arial",
              letterSpacing: ".1rem",
              color: "#FAF0D7",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <ScrollLink to="skills" smooth={true} offset={-100}>
              Skills
            </ScrollLink>
          </Typography>

          <Typography
            variant="body1"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Arial",
              letterSpacing: ".1rem",
              color: "#FAF0D7",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <ScrollLink
              to="projects"
              smooth={true}
              offset={-100} // Set your desired offset value here
            >
              Projects
            </ScrollLink>
          </Typography>

          <Typography
            variant="body1"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Arial",
              letterSpacing: ".1rem",
              color: "#FAF0D7",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <ScrollLink to="contact" smooth={true}>
              {" "}
              Contact Me
            </ScrollLink>
          </Typography>

          <Typography
            variant="body1"
            noWrap
            component="a"
            href="https://tinyurl.com/grace018"
            target="_blank"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Arial",
              letterSpacing: ".1rem",
              color: "#FAF0D7",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Resume
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

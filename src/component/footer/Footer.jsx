// Footer.js
import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Stack,
  Icon,
} from "@mui/material";
import { FaGitlab, FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#65451F", width: "100vw" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box flexGrow={1}>
            <Typography variant="body2" color="inherit">
              © {new Date().getFullYear()} Grace Sio. <br />
              All rights reserved.
            </Typography>
          </Box>
          <Stack spacing={0} direction="column" sx={{ paddingBottom: "10px" }}>
            <Typography variant="body2" color="inherit">
              Follow Me
            </Typography>
            <Stack spacing={2} direction="row">
              <Icon
                component="a"
                href="https://gitlab.com/Grace.Sio"
                target="_blank"
                sx={{ color: "inherit" }}
              >
                <FaGitlab />
              </Icon>
              <Icon
                component="a"
                href="https://github.com/grace-018"
                target="_blank"
                sx={{ color: "inherit" }}
              >
                <FaGithub />
              </Icon>
              <Icon
                component="a"
                href="https://www.linkedin.com/in/mary-grace-sio-213b83269/"
                target="_blank"
                sx={{ color: "inherit" }}
              >
                <FaLinkedin />
              </Icon>
              <Icon
                component="a"
                href="https://www.facebook.com/graces018/"
                target="_blank"
                sx={{ color: "inherit" }}
              >
                <FaFacebook />
              </Icon>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;

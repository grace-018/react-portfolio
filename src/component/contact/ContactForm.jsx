// src/ContactMe.js (React frontend)
import React from "react";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";

const ContactMe = () => {
  return (
    <Box
      id="contact"
      display="flex"
      justifyContent="center"
      wrap="true"
      alignItems="center"
      sx={{
        height: "80vh", // Adjust the height for smaller screens
        width: "100%", // Adjust the width for smaller screens
        margin: "auto",
        bgcolor: "background.default",
      }}
    >
      <Stack spacing={5} direction="column">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Didact Gothic",
            fontWeight: "600",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
            textAlign: "center", // Center the text on smaller screens
          }}
        >
          Contact Me
        </Typography>
        <form
          action="https://formspree.io/f/mnqkpnva"
          method="POST"
          // Replace "your-formspree-email" with your Formspree email
        >
          <Stack spacing={5} direction="column" sx={{ width: "80vw" }}>
            {" "}
            <TextField
              type="text"
              name="name"
              label="Name"
              variant="outlined"
              required
              sx={{
                marginBottom: "10px",
                backgroundColor: "#F4F4F4",
              }}
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              required
              sx={{ marginBottom: "10px", backgroundColor: "#F4F4F4" }}
            />
            <TextField
              name="message"
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              required
              sx={{ marginBottom: "20px", backgroundColor: "#F4F4F4" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "200px",
                alignSelf: "center",
                bgcolor: "accent.main",
                color: "accent.contrastText",
                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "accent.contrastText",
                },
              }}
            >
              Send
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default ContactMe;

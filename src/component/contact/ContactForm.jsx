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
        width: "100vw", // Adjust the width for smaller screens
        margin: "auto",
        background: "#F9F5E7 ",
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
                backgroundColor: "#B8C5F9",
                color: "black",
                "&:hover": {
                  backgroundColor: "#F5E7F9", // Change the background color on hover
                  color: "black", // Change the text color on hover
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

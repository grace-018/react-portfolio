import { Avatar, Typography, Stack, Box } from "@mui/material";

function About() {
  return (
    <Box
      id="about"
      display="flex"
      justifyContent="center"
      wrap="true"
      sx={{
        height: "auto", // Adjust the height for smaller screens
        width: "100vw", // Adjust the width for smaller screens
        margin: "auto",
        background: "#F9F5E7 ",
        paddingBottom: "220px",
      }}
    >
      <Stack spacing={5} direction="column" sx={{ width: "80vw" }}>
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
          About Me
        </Typography>

        <Avatar
          alt="Grace"
          src="/assets/grace.png"
          sx={{
            width: 300,
            height: 300,
            alignSelf: "center",
            textAlign: "center",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Didact Gothic",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          I’m a web developer and accounting professional who enjoys working at
          the intersection of tech and finance.
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Didact Gothic",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          With a background in accountancy and hands-on experience in web
          development, I bring both analytical precision and creative
          problem-solving to the projects I take on. <br />
          I’ve managed websites, content systems, and e-commerce platforms,
          while also handling financial records, bookkeeping, and data
          management. On the tech side, I love building with HTML, CSS,
          JavaScript, and React, and I’ve created projects like an interactive
          game and a finance tracker app. On the accounting side, I’m skilled in
          Excel, QuickBooks, and financial reporting, which keeps my work
          detail-oriented and well-organized. <br />
          Whether I’m coding a new feature or balancing the books, I enjoy
          finding smart, efficient solutions and making processes smoother for
          everyone.
        </Typography>
      </Stack>
    </Box>
  );
}

export default About;

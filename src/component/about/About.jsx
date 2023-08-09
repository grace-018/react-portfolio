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
          src="/assets/Grace-modified.png"
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
          A skilled Full Stack Developer from the Philippines, driven by a deep
          passion for exploring Anime and Korean Shows, delving into Manga and
          Novels, and continuously honing expertise in Web Development.
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
          I earned my degree in BS Accountancy from Adamson University, where I
          developed a strong foundation in financial matters and analytical
          skills. <br />
          However, my thirst for new challenges and curiosity about the dynamic
          world of coding led me to embark on a transformative journey.
          Enrolling in Uplift Bootcamp, I embraced the opportunity to dive
          headfirst into the exciting realm of programming.
        </Typography>
      </Stack>
    </Box>
  );
}

export default About;

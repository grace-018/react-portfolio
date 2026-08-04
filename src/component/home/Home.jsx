import { Typography, Grid, Stack, Button } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";

function Home() {
  return (
    <Grid
      id="home"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      <Stack spacing={5} direction="column">
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: "Didact Gothic",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          HELLO, I'M
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Pacifico",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
          }}
        >
          Mary Grace Sio
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontFamily: "Didact Gothic",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Web Developer & Accounting Professional
          <br />
          <Button
            variant="contained"
            sx={{
              bgcolor: "accent.main",
              color: "accent.contrastText",
              "&:hover": {
                bgcolor: "secondary.main",
              },
              marginTop: "10px",
            }}
          >
            <ScrollLink
              to="projects"
              smooth={true}
              offset={-100} // Set your desired offset value here
            >
              Explore My Projects
            </ScrollLink>
          </Button>
        </Typography>
      </Stack>
    </Grid>
  );
}

export default Home;

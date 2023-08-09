import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Stack,
  Box,
} from "@mui/material";

function Projects() {
  const projectList = [
    {
      id: 1,
      image: "/assets/portfolio.png",
      alt: "My Portfolio",
      name: "Grace Portfolio",
      description:
        "Introducing my first-ever portfolio, crafted with dedication using HTML and CSS. The repository is hosted on GitHub, providing a glimpse of my projects, experiences, and achievements. This platform beautifully highlights my abilities and passion for web development. Take a journey through my work and projects as I embark on an exciting career in the tech world.",
      link: "https://grace-018.github.io/grace-sio-portfolio/?fbclid=IwAR2HFdEZjB15V9YBJ1qwYLRvkCwwu_rDZ6TFmGkaFJD1TmxmdTZWUwXIMt4",
      github: "https://github.com/grace-018/grace-sio-portfolio",
    },
    {
      id: 2,
      image: "/assets/elementalwars.png",
      alt: "Elemental Wars",
      name: "Elemental Wars",
      description: `An interactive JavaScript game influenced by the classic "Rock-Paper-Scissors" concept. You'll engage in a match against the computer, which will make random selections from a pool of six elements: LIGHT, DARK, WIND, FIRE, WATER, and EARTH. The game is available on GitHub for you to explore and enjoy.`,
      link: "https://grace-018.github.io/elemental-wars/",
      github: "https://github.com/grace-018/elemental-wars",
    },
    {
      id: 3,
      image: "/assets/cashbuddy.png",
      alt: "Cash Buddy",
      name: "Cash Buddy",
      description:
        "A pure React App designed to serve as an Income and Expense Tracker, empowering users to monitor their finances effectively. With no backend dependency, the app is deployed on Netlify, ensuring accessibility and seamless usage. Users can now keep a close eye on their money and track their income and expenses with ease using this user-friendly tool.",
      link: "https://cash-buddy.netlify.app/",
      github: "https://github.com/grace-018/cash-buddy-app",
    },
    {
      id: 4,
      image: "/assets/cashbuddy2.png",
      alt: "Cash Buddy",
      name: "Cash Buddy with Backend",
      description:
        "The Income and Expense Tracker is a feature-rich React App with a robust backend that empowers users to take control of their finances effortlessly. This user-friendly tool allows users to monitor their income and expenses effectively, leveraging the power of the backend for seamless data management. Deployed on Render, the app ensures accessibility and smooth usage for all users, enabling them to keep a close eye on their money and gain valuable insights into their financial habits.",
      link: "https://cash-buddy-dmae.onrender.com/",
      github: "https://github.com/grace-018/cash-buddy-backend",
      github2: "https://github.com/grace-018/cash-buddy-FE",
    },
    {
      id: 5,
      image: "/assets/postit.png",
      alt: "Post It",
      name: "Post It Blog",
      description:
        "A blogging platform has been established by a team of three members, drawing inspiration from the dev.to website. This platform aims to foster a positive and all-encompassing social network for software developers, accompanying them throughout every phase of their professional journey.",
      link: "https://post-it-1862.onrender.com/",
      github: "https://github.com/aisha0926/blog-platform",
    },
  ];
  return (
    <Box
      id="projects"
      display="flex"
      justifyContent="center"
      wrap="true"
      sx={{
        height: "auto", // Adjust the height for smaller screens
        width: "100vw", // Adjust the width for smaller screens
        margin: "auto",
        background: "#F9F5E7 ",
        paddingBottom: "50px",
      }}
    >
      <Stack spacing={5} direction="column" sx={{ width: "85vw" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Didact Gothic",
            fontWeight: "600",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          My Projects
        </Typography>
        <Grid container justifyContent="center" spacing={3} item>
          {projectList.map((proj) => (
            <Grid item xs={12} sm={6} key={proj.id}>
              <Card
                sx={{
                  flex: 1,
                  maxWidth: "90%",
                  height: "100%",
                  // margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ height: "200px", width: "100%", objectFit: "cover" }}
                    image={proj.image}
                    alt={proj.alt}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {proj.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {proj.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component="a"
                    href={proj.link}
                    target="_blank"
                  >
                    Website
                  </Button>
                  {proj.github2 ? (
                    <>
                      <Button
                        size="small"
                        color="primary"
                        component="a"
                        href={proj.github}
                        target="_blank"
                      >
                        Backend Github
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        component="a"
                        href={proj.github2}
                        target="_blank"
                      >
                        Frontend Github
                      </Button>{" "}
                    </>
                  ) : (
                    <Button
                      size="small"
                      color="primary"
                      component="a"
                      href={proj.github}
                      target="_blank"
                    >
                      Github
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}

export default Projects;

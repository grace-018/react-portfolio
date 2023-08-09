import { Box, Typography, Stack } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const styles = {
  image: {
    maxWidth: "240px", // Adjust the width of the image here
  },
  label: {
    margin: "10px",
  },
};

const images = [
  {
    title: "HTML",
    label:
      " Hypertext Markup Language, the foundation of web development, enabling me to create the structure and layout of web pages.",
    imgPath: "/assets/html.png",
  },
  {
    title: "CSS",
    label:
      "Cascading Style Sheets, allowing me to add creativity and visual appeal to websites by designing their appearance and layout.",
    imgPath: "/assets/css.png",
  },
  {
    title: "Javascript",
    label:
      " The versatile programming language that empowers me to implement interactive elements and add dynamic functionalities to web applications.",
    imgPath: "/assets/javascript.png",
  },
  {
    title: "React",
    label:
      "A cutting-edge JavaScript library for building user interfaces, enabling me to create responsive and engaging front-end applications.",
    imgPath: "/assets/react.png",
  },
  {
    title: "Node.js",
    label:
      "An incredible runtime environment that enables server-side JavaScript development, allowing me to build scalable and efficient web applications.",
    imgPath: "/assets/nodejs.png",
  },
  {
    title: "Express",
    label:
      " A powerful web application framework for Node.js that simplifies the process of creating robust and feature-rich server-side applications.",
    imgPath: "/assets/express-js.png",
  },
  {
    title: "MongoDB",
    label:
      "A popular NoSQL database, providing me with the ability to work with unstructured data and seamlessly store, retrieve, and manage information for web applications.",
    imgPath: "/assets/mongodb.jpeg",
  },
];

function Skills() {
  return (
    <Box
      id="skills"
      display="flex"
      justifyContent="center"
      wrap="true"
      sx={{
        height: "auto", // Adjust the height for smaller screens
        width: "100vw", // Adjust the width for smaller screens
        margin: "auto",
        background: "#F9F5E7 ",
        paddingBottom: "200px",
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
          My Skills
        </Typography>
        <Typography variant="subtitle1" sx={{ alignSelf: "center" }}>
          Throughout my learning journey, I have been exposed to and gained
          familiarity with a diverse set of technologies, and I am continuously
          expanding my knowledge in the following areas, as well as exploring
          new ones to stay current in the ever-evolving world of web
          development.
        </Typography>
        <div style={styles.container}>
          <Carousel
            animation="slide" // Add slide animation
            autoPlay
            infiniteLoop
            interval={4000}
            style={styles.carousel}
          >
            {images.map((image, index) => (
              <div key={index} className="slide">
                <img
                  src={image.imgPath}
                  alt={image.label}
                  style={styles.image}
                />

                <div style={styles.label}>
                  <h5>{image.title}</h5>
                  {image.label}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Stack>
    </Box>
  );
}

export default Skills;

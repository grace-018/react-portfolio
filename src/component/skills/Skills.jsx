import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const styles = {
  image: {
    maxWidth: "240px", // Adjust the width of the image here
  },
  label: {
    margin: "10px",
    paddingBottom: "25px",
  },
};

const images = [
  {
    title: "HTML",
    label:
      "Hypertext Markup Language, the foundation of web development, enabling me to create the structure and layout of web pages.",
    imgPath: "/assets/html.png",
  },
  {
    title: "CSS",
    label:
      "Cascading Style Sheets, allowing me to add creativity and visual appeal to websites by designing their appearance and layout.",
    imgPath: "/assets/css.png",
  },
  {
    title: "JavaScript",
    label:
      "The versatile programming language that empowers me to implement interactive elements and add dynamic functionalities to web applications.",
    imgPath: "/assets/javascript.png",
  },
  {
    title: "React.js",
    label:
      "A cutting-edge JavaScript library for building user interfaces, enabling me to create responsive and engaging front-end applications.",
    imgPath: "/assets/react2.png",
  },
  {
    title: "Node.js",
    label:
      "An incredible runtime environment that enables server-side JavaScript development, allowing me to build scalable and efficient web applications.",
    imgPath: "/assets/nodejs.png",
  },
  {
    title: "Express.js",
    label:
      "A powerful web application framework for Node.js that simplifies the process of creating robust and feature-rich server-side applications.",
    imgPath: "/assets/express-js.png",
  },
  {
    title: "MongoDB",
    label:
      "A popular NoSQL database, providing me with the ability to work with unstructured data and seamlessly store, retrieve, and manage information for web applications.",
    imgPath: "/assets/mongodb.png",
  },
  {
    title: "Bootstrap",
    label:
      "A front-end toolkit that speeds up responsive web design with prebuilt components and a mobile-first approach.",
    imgPath: "/assets/bootstrap.png",
  },
  {
    title: "Material UI",
    label:
      "A React component library that helps me design modern, consistent, and responsive interfaces with ease.",
    imgPath: "/assets/materialui.png",
  },
  {
    title: "Postman",
    label:
      "A powerful tool for testing and integrating APIs, allowing me to ensure smooth communication between front-end and back-end services.",
    imgPath: "/assets/postman.png",
  },
  {
    title: "Git",
    label:
      "A version control system that allows me to track changes, collaborate effectively, and manage code repositories.",
    imgPath: "/assets/git.png",
  },
  {
    title: "Figma",
    label:
      "A collaborative design tool that I use to create wireframes, UI mockups, and prototypes for seamless design-to-development workflow.",
    imgPath: "/assets/figma.png",
  },
  {
    title: "Wrike",
    label:
      "A project management tool that helps me collaborate, track progress, and manage tasks effectively within teams.",
    imgPath: "/assets/wrike.png",
  },
  {
    title: "Azure DevOps",
    label:
      "A development platform that supports CI/CD, project tracking, and team collaboration for efficient software delivery.",
    imgPath: "/assets/azuredevops.png",
  },
  {
    title: "Microsoft CRM",
    label:
      "A customer relationship management platform that helps streamline workflows and manage client interactions.",
    imgPath: "/assets/microsoftcrm.png",
  },
  {
    title: "Magnolia CMS",
    label:
      "A flexible enterprise CMS that allows me to create, manage, and deliver digital content seamlessly.",
    imgPath: "/assets/magnolia.png",
  },
  {
    title: "NopCommerce",
    label:
      "An open-source eCommerce platform that enables me to manage and customize online stores efficiently.",
    imgPath: "/assets/nopcommerce.png",
  },
];

const otherSkills = [
  {
    id: 1,
    title: "B2B E-commerce Administration",
    alt: "B2B E-commerce Administration",
    description:
      "Experienced in managing e-commerce operations including content creation, digital asset management, inventory tracking, and data entry to ensure smooth online business workflows.",
    imgPath: "/assets/ecommerce.png",
  },
  {
    id: 2,
    title: "Accounting & Finance",
    alt: "Accounting & Finance",
    description:
      "Proficient in financial recordkeeping, bookkeeping principles, ledger entries, reconciliation, invoicing, and billing using tools such as Microsoft Excel and QuickBooks.",
    imgPath: "/assets/accounting.png",
  },
  {
    id: 3,
    title: "Professional Skills",
    alt: "Professional Skills",
    description:
      "Strong analytical and problem-solving abilities with the flexibility to work independently or as part of a collaborative team to achieve business objectives.",
    imgPath: "/assets/professional.png",
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
        width: "100%", // Adjust the width for smaller screens
        margin: "auto",
        bgcolor: "background.default",
        paddingBottom: { xs: 6, md: 20 },
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
                <h3>{image.title}</h3>
                <div style={styles.label}>{image.label}</div>
              </div>
            ))}
          </Carousel>
        </div>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Didact Gothic",
            fontWeight: "600",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "left",
            textAlign: "left", // align the text on smaller screens
          }}
        >
          Other Skills
        </Typography>
        <Grid container justifyContent="center" spacing={3} item>
          {otherSkills.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill.id}>
              <Card
                sx={{
                  flex: 1,
                  maxWidth: "90%",
                  height: "100%",
                  // margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: "200px", width: "100%", objectFit: "contain" }}
                  image={skill.imgPath}
                  alt={skill.alt}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {skill.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {skill.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}

export default Skills;

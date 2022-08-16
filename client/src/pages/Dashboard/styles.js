import { makeStyles } from "@mui/styles";
import bgImage from "../../assets/KIPPRA+portal+hero.jpeg";

export default makeStyles((theme) => ({
  header: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "40vh",
  },
  title: {
    margin: "0 30px",
  },
}));

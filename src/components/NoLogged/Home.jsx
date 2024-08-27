import Title from "../Helmet"
import About from "./About"
import Packages from "./Packages"
import Slider from "./Slider"

const Home = () => {
  return (
    <div>
            <Title title={"Home"}></Title>

        <Slider></Slider>
        <About></About>
        <Packages></Packages>
    </div>
  )
}

export default Home
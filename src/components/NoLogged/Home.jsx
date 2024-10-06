import Title from "../Helmet"
import About from "./About"
import FeaturesSection from "./FeaturesSection"
import Packages from "./Packages"
import Slider from "./Slider"
import TestimonialsSection from "./TestimonialsSection"

const Home = () => {
  return (
    <div>
            <Title title={"Home"}></Title>

        <Slider></Slider>
        <About></About>
        <Packages></Packages>
        <FeaturesSection></FeaturesSection>
        <TestimonialsSection></TestimonialsSection>
    </div>
  )
}

export default Home
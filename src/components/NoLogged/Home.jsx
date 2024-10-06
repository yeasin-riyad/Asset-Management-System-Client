import Title from "../Helmet"
import About from "./About"
import BlogNewsSection from "./BlogNewsSection"
import ContactUsSection from "./ContactUsSection"
import FAQSection from "./FAQSection "
import FeaturesSection from "./FeaturesSection"
import HowItWorksSection from "./HowItWorksSection "
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
        <FAQSection></FAQSection>
        <HowItWorksSection></HowItWorksSection>
        <ContactUsSection></ContactUsSection>
        <BlogNewsSection></BlogNewsSection>
    </div>
  )
}

export default Home
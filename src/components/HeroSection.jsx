import HeroImage from "../assets/heroimage.svg";

const HeroSection = () => {
    return (
        <figure>
            <img
                className="mx-auto sm:h-[60%] sm:w-[50%]"
                src={HeroImage}
                alt="hero image"
            />
            <figcaption className="text-center dark:text-white">
                There's nothing here! click the new invoice button to create a
                new invoice
            </figcaption>
        </figure>
    );
};

export default HeroSection;

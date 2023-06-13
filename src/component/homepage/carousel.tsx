import "../../App.css";
import Flickity from "react-flickity-component";
import "../../flickity.css";

export const Carousel = () => {
  const flickityOptions = {
    initialIndex: 2,
  };
  return (
    <>
      <Flickity
        className="carousel mt-1"
        elementType={"div"}
        options={flickityOptions}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
      >
        <img src="../../../bg1.jpg" />
        <img src="../../../bg2.jpg" />
        <img src="../../../bg3.jpg" />
      </Flickity>
      <hr />
      <br />
      <br />
    </>
  );
};

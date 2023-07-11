import { Carousel } from "@material-tailwind/react";

type EventImageSectionProps = {
  images: string[];
};

const EventImageSection: React.FC<EventImageSectionProps> = ({ images }) => {
  return (
    <Carousel
      className="h-96"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {images &&
        images.map((item) => {
          return (
            <img
              key={item}
              src={item}
              alt="image 1"
              className="h-full w-full object-cover"
            />
          );
        })}
    </Carousel>
  );
};

export default EventImageSection;

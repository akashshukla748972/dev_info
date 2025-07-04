import Marquee from "react-fast-marquee";

// const posters = [
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
//   // Add more posters
// ];

const PosterGallery = ({ projects }) => {
  return (
    <Marquee speed={50} gradient={false}>
      {projects?.map((project, index) => (
        <img
          key={index}
          src={project?.poster.url}
          alt={`poster-${index}`}
          className="w-md h-60 object-cover mx-2 rounded-xl shadow-md"
        />
      ))}
    </Marquee>
  );
};

export default PosterGallery;

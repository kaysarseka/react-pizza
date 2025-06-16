import Stories from "react-insta-stories";
import c1 from "../../assets/c1.webp";
import c2 from "../../assets/c2.webp";
import c3 from "../../assets/c3.webp";
import c4 from "../../assets/c4.webp";
import c5 from "../../assets/c5.webp";
import a1 from "../../assets/a1.webp";

interface StoryProps {
  onClose: () => void;
}

const storyImages = [
  { url: c1, duration: 4000 },
  { url: c2, duration: 4000 },
  { url: c3, duration: 4000 },
  { url: c4, duration: 4000 },
  { url: c5, duration: 4000 },
];

export const Story = ({ onClose }: StoryProps) => {
  return (
    <div className="story-overlay" onClick={onClose}>
      <div className="story-blur" style={{ backgroundImage: `url(${a1})` }} />
      <div className="story-player" onClick={(e) => e.stopPropagation()}>
        <Stories
          stories={storyImages}
          defaultInterval={4000}
          width={450}
          loop
          onAllStoriesEnd={onClose}
        />
      </div>
    </div>
  );
};

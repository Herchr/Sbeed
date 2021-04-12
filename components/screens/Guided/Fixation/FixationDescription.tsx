import React from "react";
import Description from "../Description/Description";

const desc = `A major component of speed reading is eye fixation, a point where your eyes come to rest as you read. Readers who make fewer eye fixations read faster because they take in more words with each fixation. The wider your vision span is, the more words you can process in an eye fixation and the faster you can read. Acquiring the ability to see many words at a time is essential for speed reading.`;

const FixationDescription: React.FC = () => {
  return <Description title="Fixation" desc={desc} />;
};

export default FixationDescription;

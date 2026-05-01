"use client";

import Image from "next/image";

const ExploreBtn = () => {
  return (
    <a
      href="#events"
      className="mt-7 mx-auto"
      id="explore-btn"
    >
      Explore Events!
      <Image
        src="/icons/arrow-down.svg"
        alt="Arrow"
        width={20}
        height={20}
        style={{ width: "auto", height: "auto" }}
      />
    </a>
  );
};

export default ExploreBtn;

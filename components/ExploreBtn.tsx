"use client";

import Image from "next/image";

const ExploreBtn = () => {
  return (
    <button
      onClick={() => {
        console.log("hfd");
      }}
      className="mt-7 mx-auto"
      type="button"
      id="explore-btn"
    >
      <a href="#events">
        Explore Events!
        <Image
          src="icons/arrow-down.svg"
          alt="Arrow"
          width={20}
          height={20}
          style={{ width: "auto", height: "auto" }}
        />
      </a>
    </button>
  );
};

export default ExploreBtn;

"use client";
import React from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), { ssr: false });

const achievementsList = [
  {
    prefix: "~",
    metric: "Visits",
    value: 2700,
  },
  {
    metric: "Projects",
    value: 10,
    postfix: "+",
  },
  {
    prefix: "~",
    metric: "Contributions",
    value: 1300,
  },
  /*
  {
    metric: "Awards",
    value: 7,
  },*/
  {
    metric: "Years",
    value: 4,
  },
];

const AchievementsSection = () => {
  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => (
          <div key={achievement.metric} className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0">
            <h2 className="text-white text-4xl font-bold flex flex-row">
              {achievement.prefix}
              <div className="text-white text-4xl font-bold">
                <AnimatedNumbers
                includeComma
                animateToNumber={achievement.value}
                locale="en-US"
                configs={(_, index) => ({
                  mass: 1,
                  friction: 100,
                  tension: 140 * (index + 1),
                })}
                />
              </div>
              {achievement.postfix}
            </h2>
            <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;

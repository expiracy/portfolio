import React from "react";

export const Title1: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mt-16">
      {props.children}
    </h1>
  );
}

export const Title2: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-16">
      {props.children}
    </h2>
  );
}

export const Text: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <p className="text-sm sm:text-lg md:text-xl mt-6 [&:not(:first-child)]:mt-6 break-words">
      {props.children}
    </p>
  );
}
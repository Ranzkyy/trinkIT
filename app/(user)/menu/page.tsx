import React from "react";
import CardProduct from "@/components/CardProduct";

const ManuPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold underline decoration-solid">
        Our{" "}
        <span className="text-green-500 underline decoration-solid">
          Menu's
        </span>
      </h1>
      <CardProduct />
    </div>
  );
};

export default ManuPage;

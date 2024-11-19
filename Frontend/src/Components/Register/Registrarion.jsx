import React, { useState } from "react";
import Doctor from "./Doctor";
import Patients from "./Patients";
import bg from "../../../public/bg.jpg";
 

function Registrarion() {
  const [form, setForm] = useState("patient");

  return (
    <div
      className="w-full h-full relative pb-20 bg-fixed bg-transparent bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="sm:w-full h-52 flex items-center bg-transparent justify-around gap-5">
        <img
          width={110}
          height={95}
          className="rounded-full sm:w-30 sm:h-30"
          src={"./logo.svg"}
          alt=""
        />
        <h1 className="text-3xl font-bold bg-transparent text-white sm:text-5xl">
          Welcome to AyurConnect
        </h1>
        <img
          width={85}
          className="w-16 h-16 sm:w-20 sm:h-20"
          src={"./profile.png"}
          alt=""
        />
      </div>

      <div className="flex items-center bg-transparent justify-evenly mb-16">
        <div
          onClick={() => setForm("patient")}
          className="text-2xl cursor-pointer border border-blue-200 rounded-full p-4 bg-slate-200 text-black font-medium"
        >
          Register as a Patient
        </div>
        <div
          onClick={() => setForm("doctor")}
          className="text-2xl cursor-pointer border border-blue-200 rounded-full p-4 bg-slate-200 text-black font-medium"
        >
          Register as a Doctor
        </div>
      </div>

      <div  className="w-1/2 h-full rounded-lg py-8 px-5 translate-x-1/2">
        {form === "patient" ? <Patients /> : <Doctor />}
      </div>
    </div>
  );
}

export default Registrarion;

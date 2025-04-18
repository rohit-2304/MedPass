import React from 'react';

function Aboutus() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#ECEAE6] p-8">
      {/* Wrapper */}
      <div className="bg-[#f2f2f2] p-10 rounded-2xl shadow-lg max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-[#267c37] underline decoration-4 decoration-[#267c37] mb-12 drop-shadow">
          About Us
        </h1>

        {/* Team Section */}
<div className="mt-16 bg-white p-8 rounded-2xl shadow-md mb-5">
  <h2 className="text-4xl font-bold text-[#267c37] mb-2 text-center">Meet the Team</h2>
  <p className="text-lg text-gray-600 text-center mb-10 font-medium">
    PICT - Second Year, IT Department
  </p>
  
  <div className="grid grid-cols-2 text-xl md:grid-cols-3 lg:grid-cols-5 gap-6">
    {[
      { name: "Dev Taneja" },
      { name: "Rohit Gatne" },
      { name: "Parikshit Desai" },
      { name: "Aditya Ekande" },
      { name: "Sarthak Gawari" },
    ].map((member, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center p-4 bg-[#f3f7f5] rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
      >
        {/* Avatar Placeholder */}
        <div className="w-20 h-20 bg-[#267c37] text-white flex items-center justify-center rounded-full text-xl font-bold mb-3 shadow-inner">
          {member.name.split(" ").map(word => word[0]).join("")}
        </div>
        <p className="text-md font-semibold text-gray-800 text-center">{member.name}</p>
      </div>
    ))}
  </div>
</div>


        {/* Introduction */}
        <div className="text-lg md:text-xl text-gray-800 leading-relaxed space-y-4 mb-12 px-4">
          <p>
            <strong className="text-[#267c37]">Digital Health Passport & Medical Record Management System</strong> is your all-in-one solution for securely storing and accessing medical information.
            From vaccination records to prescriptions, it's designed to empower individuals with control over their health data.
          </p>
          <p>
            Whether you're visiting a new doctor or traveling abroad, your comprehensive medical history is always a few taps away — improving care and convenience.
          </p>
        </div>

        {/* Motto */}
        <div className="bg-[#3f9e45] text-white text-center text-2xl md:text-3xl font-semibold py-4 rounded-xl shadow mb-12">
          Your Health, Your Control
        </div>

        {/* Objectives */}
        <h2 className="text-3xl font-bold text-[#267c37] underline decoration-2 mb-6 px-4">
          Our Objectives
        </h2>
        <ul className="list-disc list-inside text-lg text-[#1a3c40] space-y-2 mb-12 px-6">
          <li>Easy storage of medical documents.</li>
          <li>Summarized medical history for quick insights.</li>
          <li>Doctor access to relevant patient info instantly.</li>
          <li>Simplified sharing of records with QR codes.</li>
          <li>Unique <strong>MEDPASS ID</strong> for every user.</li>
        </ul>

        {/* Features */}
        <h2 className="text-3xl font-bold text-[#267c37] underline decoration-2 mb-8 text-center">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
          {/* Patient Card */}
          <div className="bg-cyan-950 text-white p-6 rounded-xl shadow-md border border-[#1a3c40] hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-2xl font-bold text-[#64ba75] mb-4">Patient’s End</h3>
            <ul className="list-disc list-inside space-y-2 text-md">
              <li>Store personal medical details.</li>
              <li>Upload reports and prescriptions.</li>
              <li>View summarized health data.</li>
              <li>QR code-based document sharing.</li>
            </ul>
          </div>

          {/* Doctor Card */}
          <div className="bg-cyan-950 text-white p-6 rounded-xl shadow-md border border-[#1a3c40] hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-2xl font-bold text-[#64ba75] mb-4">Doctor’s End</h3>
            <ul className="list-disc list-inside space-y-2 text-md">
              <li>Access records of previous consultations.</li>
              <li>Scan patient QR to retrieve reports instantly.</li>
              <li>Quick view of medical summaries.</li>
            </ul>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Aboutus;

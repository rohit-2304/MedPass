import React from 'react';

function Aboutus() {
  return (
    <div className="min-h-screen bg-[#ECEAE6] text-[#386641] p-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">

        {/* Content Section */}
        <div className="bg-[#FFFFFF] shadow-lg rounded-lg p-8 ">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-md leading-relaxed mb-6">
            The <strong>Digital Health Passport and Medical Record Management System</strong> is an innovative platform designed to simplify and enhance the way we manage our health. 
            In today’s fast-paced world, keeping track of medical history, vaccinations, prescriptions, and doctor’s appointments can be overwhelming.
          </p>
          <p className="text-md leading-relaxed mb-6">
            This system offers a seamless way for individuals to store, track, and access all their important health information in one secure digital space. 
            With just a few taps, patients can have a comprehensive, up-to-date record of their health that can be shared with healthcare providers whenever needed, making healthcare both more accessible and efficient.
          </p>
          {/* Decorative or Additional Content Section */}
        <div className="hidden lg:block">
          <div className="bg-[#6A994E] rounded-lg shadow-lg h-full flex items-center justify-center">
            <p className="text-white text-2xl font-semibold">Your Health, Your Control</p>
          </div>
        </div>
          {/* Objectives */}
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#6A994E]">Objectives:</h2>
          <ul className="list-disc list-inside space-y-2 text-md">
            <li>Easy storage of medical documents.</li>
            <li>Summary of medical history.</li>
            <li>Easy access for doctors to patients' documents and medical history.</li>
            <li>Easy sharing of medical history between doctors and patients.</li>
            <li>Unique <strong>MEDPASS ID</strong> for each doctor and patient.</li>
          </ul>

          {/* Features */}
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#6A994E]">Features:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#A7C957] p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Patient’s End:</h3>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>Save basic medical info upon registration.</li>
                <li>Upload medical documents.</li>
                <li>Medical history summary.</li>
                <li>Scan a QR code to share documents with doctors.</li>
              </ul>
            </div>

            <div className="bg-[#bc4749] text-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Doctor’s End:</h3>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>Access records of previous patients.</li>
                <li>QR code to access patient records.</li>
              </ul>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Aboutus;

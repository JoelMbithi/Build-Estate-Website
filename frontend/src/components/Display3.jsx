import React from "react";

const Display3 = () => {
  return (
    <div className="container flex flex-col mx-auto mt-4 p-4 bg-white rounded">
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-4xl font-bold text-slate-600 ">
          Move to What Moves You
        </h1>
        <p className="text-sm text-slate-500">keep calm & travel on</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* First Section */}
        <div className="bg-white flex flex-col items-center gap-4 justify-center text-center p-4 rounded shadow hover:shadow-md transition">
          <img
            src="https://www.thespruce.com/thmb/kWVXheIAd9HgDIN82eNRTXAQbQQ%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29/Stefania_Wyndham_Card_0126_ACDR01-a225ae29e15f4310bc2ae7dcddeb78d2.jpg"
            alt="Enjoy the great cold"
            className="w-full h-48 object-cover rounded"
          />
          <h1 className="font-bold text-slate-600">Enjoy the great cold</h1>
          <div className="flex items-center justify-center border p-2 border-slate-300 rounded">
            <p className="font-bold text-slate-500">8,672 properties</p>
          </div>
        </div>

        {/* Second Section */}
        <div className="bg-white flex flex-col items-center gap-4 justify-center text-center p-4 rounded shadow hover:shadow-md transition">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60"
            alt="Pick up the earliest sunrise"
            className="w-full h-48 object-cover rounded"
          />
          <h1 className="font-bold text-slate-600">Pick up the earliest sunrise</h1>
          <div className="flex items-center justify-center border p-2 border-slate-300 rounded">
            <p className="font-bold text-slate-500">8,672 properties</p>
          </div>
        </div>

        {/* Third Section */}
        <div className="bg-white flex flex-col items-center gap-4 justify-center text-center p-4 rounded shadow hover:shadow-md transition">
          <img
            src="https://www.bhg.com/thmb/xvAnoi1T3cgIyW1p2C8Zp6Tlu-Q%3D/2500x0/filters%3Ano_upscale%28%29%3Astrip_icc%28%29/farmhouse-living-room-corner-fireplace-wood-beams-beige-Flebut_LivingRoom_A_023-3ea741caf3ca4a8faf1eff6114f0bc66.jpg"
            alt="Unique Stay well"
            className="w-full h-48 object-cover rounded"
          />
          <h1 className="font-bold text-slate-600">Unique Stay</h1>
          <div className="flex items-center justify-center border p-2 border-slate-300 rounded">
            <p className="font-bold text-slate-500">8,672 properties</p>
          </div>
        </div>

        {/* Fourth Section */}
        <div className="bg-white flex flex-col items-center gap-4 justify-center text-center p-4 rounded shadow hover:shadow-md transition">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60"
            alt="One room available"
            className="w-full h-48 object-cover rounded"
          />
          <h1 className="font-bold text-slate-600">One room available</h1>
          <div className="flex items-center justify-center border p-2 border-slate-300 rounded">
            <p className="font-bold text-slate-500">8,672 properties</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display3;

import React from "react";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CounsellorCard = ({ counsellor }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="font-semibold text-lg">{counsellor.name}</h3>
      <p className="text-sm text-gray-600">{counsellor.specialization}</p>

      <div className="flex gap-3 mt-3">
        {/* 📞 Call */}
        <a
          href={`tel:${counsellor.phone}`}
          className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md"
        >
          <Phone size={16} />
          Call
        </a>

        {/* 📅 Book */}
        <button
          onClick={() =>
            navigate(`/student/book/${counsellor._id}`)
          }
          className="px-3 py-2 bg-purple-600 text-white rounded-md"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default CounsellorCard;

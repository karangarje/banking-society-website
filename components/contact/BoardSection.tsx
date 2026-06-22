import React from "react";
import { PhoneOutlined, MessageOutlined } from "@ant-design/icons";

interface BoardMember {
  id: number;
  name: string;
  role: string;
  status: "Available" | "Online" | "Offline";
  initials: string;
  color: string;
}

const members: BoardMember[] = [
  {
    id: 1,
    name: "Manager",
    role: "Manager",
    status: "Online",
    initials: "MG",
    color: "bg-emerald-600",
  },
  {
    id: 2,
    name: "Customer Support",
    role: "Customer Support",
    status: "Available",
    initials: "CS",
    color: "bg-amber-600",
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Online":
      return "bg-blue-500";
    case "Available":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

export default function BoardSection() {
  return (
    <aside className="bg-white rounded-3xl shadow-xl border border-rose-100 sticky top-24 p-6">
      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span role="img" aria-label="board">🏛</span> Board Contact
      </h3>
      <p className="text-sm text-gray-600 mb-4">Connect with leadership and management.</p>
      <div className="space-y-3">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-rose-50 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <div className={`w-11 h-11 ${m.color} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}>
              {m.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm">{m.name}</p>
              <p className="text-xs text-gray-500">{m.role}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${statusColor(m.status)}`} />
              <span className="text-xs text-gray-500">{m.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <button className="w-full bg-[#B3003C] text-white py-2.5 rounded-lg hover:bg-[#92002f] transition font-semibold text-sm">
          <PhoneOutlined className="mr-2" /> Call Board
        </button>
        <button className="w-full border border-[#B3003C] text-[#B3003C] py-2.5 rounded-lg hover:bg-[#B3003C] hover:text-white transition font-semibold text-sm">
          <MessageOutlined className="mr-2" /> Message
        </button>
      </div>
    </aside>
  );
}

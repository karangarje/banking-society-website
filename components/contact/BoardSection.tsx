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
    color: "bg-[#AD002E]",
  },
  {
    id: 2,
    name: "Customer Support",
    role: "Customer Support",
    status: "Available",
    initials: "CS",
    color: "bg-[#AD002E]",
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Online":
      return "bg-[#AD002E]";
    case "Available":
      return "bg-[#AD002E]";
    default:
      return "bg-white";
  }
};

export default function BoardSection() {
  return (
    <aside className="bg-white rounded-lg shadow-md border border-[#AD002E] sticky top-24 p-6">
      <h3 className="text-xl font-bold text-[#AD002E]/70 flex items-center gap-2">
        <span role="img" aria-label="board">🏛</span> Board Contact
      </h3>
      <p className="text-sm text-[#AD002E]/70 mb-4">Connect with leadership and management.</p>
      <div className="space-y-3">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#AD002E]/5 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <div className={`w-11 h-11 ${m.color} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}>
              {m.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#AD002E]/70 text-sm">{m.name}</p>
              <p className="text-xs text-[#AD002E]/70">{m.role}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${statusColor(m.status)}`} />
              <span className="text-xs text-[#AD002E]/70">{m.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <button className="w-full bg-[#AD002E] text-white py-2.5 rounded-lg hover:bg-[#AD002E] transition font-semibold text-sm">
          <PhoneOutlined className="mr-2" /> Call Board
        </button>
        <button className="w-full border border-[#AD002E] text-[#AD002E] py-2.5 rounded-lg hover:bg-[#AD002E] hover:text-white transition font-semibold text-sm">
          <MessageOutlined className="mr-2" /> Message
        </button>
      </div>
    </aside>
  );
}

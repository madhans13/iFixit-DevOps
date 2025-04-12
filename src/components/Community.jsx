import React from "react";
import "../componentStyles/Community.css";

import { FaWrench, FaSearch } from "react-icons/fa"; // ✅ Import icons

import image from '../assets/image.png';
import hard from '../assets/repair.jpg';
import lap from '../assets/laptop.png';
import download from '../assets/laptop.png';
import fix from '../assets/repair.jpg';

const communityCards = [
  {
    title: "Solve Problems",
    desc: "Get help from friendly fixers and share a helping hand with others around the world.",
    btn: "Answers Forum",
    icon: "💬",
    img: lap,
  },
  {
    title: "Write a Story",
    desc: "Share your repair experience to help others learn what to do (and what not to do).",
    btn: "Write a Story",
    icon: "✏️",
    img: hard,
  },
  {
    title: "Teach a Repair",
    desc: "No one knows how to fix everything, but everyone knows how to fix something.",
    btn: "Create a Guide",
    icon: "📘",
    img: download,
  },
  {
    title: "Contests",
    desc: "Compete with your fellow fixers to win awesome prizes and help the planet.",
    btn: "Get Involved",
    icon: "🏆",
    img: fix,
  },
];

export default function Community() {
  return (
    <div className="community">
      

      {/* ✅ Community Title */}
      <h2>Community</h2>

      {/* ✅ Community Cards */}
      <div className="community-cards">
        {communityCards.map((card, index) => (
          <div className="community-card" key={index}>
            <img src={card.img} alt={card.title} />
            <div className="icon-box">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <button>{card.btn}</button>
          </div>
        ))}
      </div>

      {/* ✅ Contribute Section */}
      <div className="community-container">
        <div className="contribute-section">
          <div className="contribute-text">
            <h2>Contribute to iFixit</h2>
            <p>
              No one knows how to fix everything, but everyone knows how to fix something.
              Teach us what you know and make sure things work longer! The easier it is to fix something,
              the more people will do it.
            </p>
            <button>Start a New Page</button>
          </div>
          <div className="contribute-video">
            <iframe
              width="100%"
              height="250"
              src="https://youtu.be/_hWSe9hrsco?si=avCDfieYaU_VnaPT"
              title="How to Write a Repair Guide"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* ✅ Latest Community Activity */}
        <div className="community-activity">
          <h2>Latest Community Activity</h2>
          <div className="activity-cards">
            {[
              { name: 'Nick Schultz', action: 'Published a Guide', img: lap },
              { name: 'Christine Mullaney', action: 'Finished a Repair', img: download },
              { name: 'Dan', action: 'Answered a Question', img: hard },
              { name: 'Sam', action: 'Published a Guide', img: image }
            ].map((item, index) => (
              <div className="activity-card" key={index}>
                <img src={item.img} alt={item.name} />
                <div className="activity-footer">
                  <p><strong>{item.name}</strong></p>
                  <p>{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

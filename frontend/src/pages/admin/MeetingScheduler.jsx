// MeetingScheduler.jsx
import React from "react";
import { InlineWidget } from "react-calendly";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const MeetingScheduler = () => {
  const calendlyUrl = "https://calendly.com/shreyashi-pal05";

  return (
    <DashboardLayout activeMenu='Meeting Scheduler'>
      <div className="min-h-screen flex flex-col items-center justify-start ">
        <div className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-3xl">
          {/* Header */}
          <h1 className="text-3xl font-bold text-[#4535C1] text-center mb-3">
            📅 Schedule a Meeting
          </h1>
          <p className="text-[#36C2CE] text-center mb-6 text-lg">
            Pick a time that works for you. Notifications and invites are handled automatically by Calendly.
          </p>

          {/* Highlight box */}
          <div className="bg-[#77E4C8]/20 border-l-4 border-[#36C2CE] p-4 rounded-lg mb-6 shadow-sm">
            <p className="text-[#478CCF] font-medium">
              Tip: Use this widget to directly schedule meetings. The meeting link will be automatically generated and notifications sent to participants.
            </p>
          </div>

          {/* Calendly Inline Widget */}
          <InlineWidget
            url={calendlyUrl}
            pageSettings={{
              hide_landing_page_details: true,
              hide_gdpr_banner: true,
              background_color: "#ffffff", // White background to match page
              text_color: "#4535C1",       // Dark blue text
              primary_color: "#36C2CE",    // Buttons / highlights
            }}
            styles={{ height: '700px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MeetingScheduler;

import { JobAdsForm } from "@/components/forms/job-ads-form";
import React from "react";

function CreateJobAds() {
  return (
    <div className="m-auto flex w-4/5 max-w-4xl min-w-xl flex-col justify-center gap-4 py-6">
      <div>
        <h2 className="self-center py-6 text-2xl font-semibold capitalize">
          Job Ads Form
        </h2>
      </div>
      <div className="border border-black/10 p-6 shadow-2xl">
        <JobAdsForm />
      </div>
    </div>
  );
}

export default CreateJobAds;

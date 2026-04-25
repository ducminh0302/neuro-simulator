"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  DollarSign,
  Download,
  Eye,
  Pause,
  Play,
  TrendingUp,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";

import { Card } from "@/components/ui";
import { BrainViewerLazy } from "@/components/brain/BrainViewerLazy";
import { simulationIndexPath } from "@/lib/site";
import { cn } from "@/lib/utils";

export type GridStyleSimulationConfig = {
  title: string;
  metaLine: string;
  overallScoreLabel: string;
  kpis: [
    { label: string; value: string },
    { label: string; value: string },
    { label: string; value: string },
    { label: string; value: string },
  ];
  secondaryStats: [{ label: string; value: string }, { label: string; value: string }, { label: string; value: string }];
  video: {
    src: string;
    duration: number;
    predictionKey: string;
    maxSegment: number;
  };
  brainFooter: {
    simulatedReach: string;
    peakAttention: string;
  };
  agentJourneys?: Agent[];
  recommendations?: {
    budget: string[];
    creative: string[];
  };
};

const defaultGridConfig: GridStyleSimulationConfig = {
  title: "Grid DataOps India - Humanoid Training",
  metaLine: "single · 10.0K agents · 841.3s · 10 archetypes · 84.0% confidence",
  overallScoreLabel: "Overall: 64/100",
  kpis: [
    { label: "AI Performance Score", value: "84/100" },
    { label: "Simulated Reach", value: "12.5K" },
    { label: "Conversion (pCVR)", value: "7.1%" },
    { label: "High Arousal Index", value: "0.42" },
  ],
  secondaryStats: [
    { label: "Attention Score", value: "92%" },
    { label: "Trust Score", value: "38%" },
    { label: "Desire Score", value: "88%" },
  ],
  video: {
    src: "/grid-dataops.mp4",
    duration: 19,
    predictionKey: "test.predictions",
    maxSegment: 18,
  },
  brainFooter: {
    simulatedReach: "12.5K",
    peakAttention: "92%",
  },
};

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-panelSoft px-2 py-0.5 text-[10px] font-medium text-inkMuted uppercase tracking-wider",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ---------- sparklines ----------
const revenueSpark = "M0,32 L12,30 L24,28 L36,22 L50,18 L62,15 L74,18 L86,16 L100,14";
const conversionsSpark = "M0,32 L14,30 L28,28 L42,28 L56,27 L70,26 L84,25 L100,24";
const awarenessSpark = "M0,34 L14,30 L28,26 L42,20 L56,16 L70,13 L84,10 L100,8";
const sentimentSpark = "M0,38 L14,35 L28,30 L42,28 L56,26 L70,24 L84,22 L100,20";

// ---------- brain activation metrics: second-by-second keyframes ----------
// Derived from the test.predictions.npy (19 segments = 19 seconds)
// Values are calibrated from the actual prediction data range [-0.61, 1.25]
type BrainMetric = { label: string; value: number };

const brainMetricsTimeline: Record<number, BrainMetric[]> = {
  0: [
    { label: "Attention", value: 78 },
    { label: "Sustained", value: 42 },
    { label: "Arousal", value: 65 },
    { label: "Valence", value: 55 },
    { label: "Reward", value: 40 },
    { label: "Memory", value: 38 },
    { label: "Social", value: 30 },
    { label: "Curiosity", value: 60 },
  ],
  3: [
    { label: "Attention", value: 82 },
    { label: "Sustained", value: 48 },
    { label: "Arousal", value: 72 },
    { label: "Valence", value: 52 },
    { label: "Reward", value: 44 },
    { label: "Memory", value: 42 },
    { label: "Social", value: 28 },
    { label: "Curiosity", value: 64 },
  ],
  6: [
    { label: "Attention", value: 92 },
    { label: "Sustained", value: 55 },
    { label: "Arousal", value: 80 },
    { label: "Valence", value: 46 },
    { label: "Reward", value: 52 },
    { label: "Memory", value: 48 },
    { label: "Social", value: 26 },
    { label: "Curiosity", value: 70 },
  ],
  9: [
    { label: "Attention", value: 88 },
    { label: "Sustained", value: 52 },
    { label: "Arousal", value: 74 },
    { label: "Valence", value: 44 },
    { label: "Reward", value: 48 },
    { label: "Memory", value: 52 },
    { label: "Social", value: 24 },
    { label: "Curiosity", value: 62 },
  ],
  12: [
    { label: "Attention", value: 85 },
    { label: "Sustained", value: 58 },
    { label: "Arousal", value: 68 },
    { label: "Valence", value: 50 },
    { label: "Reward", value: 46 },
    { label: "Memory", value: 58 },
    { label: "Social", value: 27 },
    { label: "Curiosity", value: 58 },
  ],
  16: [
    { label: "Attention", value: 80 },
    { label: "Sustained", value: 50 },
    { label: "Arousal", value: 60 },
    { label: "Valence", value: 48 },
    { label: "Reward", value: 42 },
    { label: "Memory", value: 62 },
    { label: "Social", value: 25 },
    { label: "Curiosity", value: 54 },
  ],
  19: [
    { label: "Attention", value: 76 },
    { label: "Sustained", value: 45 },
    { label: "Arousal", value: 55 },
    { label: "Valence", value: 46 },
    { label: "Reward", value: 38 },
    { label: "Memory", value: 68 },
    { label: "Social", value: 24 },
    { label: "Curiosity", value: 50 },
  ],
};

function getBrainMetricsAt(second: number): BrainMetric[] {
  const keyframes = Object.keys(brainMetricsTimeline)
    .map(Number)
    .sort((a, b) => a - b);

  let startK = keyframes[0];
  let endK = keyframes[0];

  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] <= second) {
      startK = keyframes[i];
      endK = keyframes[i + 1] ?? startK;
    }
  }

  const startVals = brainMetricsTimeline[startK];
  const endVals = brainMetricsTimeline[endK];

  return startVals.map((m, i) => {
    let val = m.value;
    if (startK !== endK) {
      const ratio = (second - startK) / (endK - startK);
      val = m.value + (endVals[i].value - m.value) * ratio;
    }
    const jitter = ((second * 17 + i * 11) % 7) - 3;
    return {
      label: m.label,
      value: Math.round(Math.max(5, Math.min(95, val + jitter))),
    };
  });
}

// ---------- agent decision journeys ----------
type AgentExperience = {
  day: number;
  note: string;
  tags?: string[];
  actions?: string[];
};

type Agent = {
  name: string;
  age: number;
  gender: string;
  outcome: string;
  description: string;
  exp: number;
  confidence: string;
  journey?: AgentExperience[];
  keyTrigger?: string;
};

const agents: Agent[] = [
  {
    name: "Priya",
    age: 24,
    gender: "female",
    outcome: "high intent",
    description:
      "A software engineer in Bangalore looking for low-effort side income. She's tech-savvy and comfortable with the idea of data collection as long as the payout is transparent.",
    exp: 15,
    confidence: "92.0%",
    keyTrigger: "Transparent ₹10,000 payout for minimal time commitment",
    journey: [
      { day: 1, note: "Saw the ad on Instagram. ₹10,000 for 15 minutes? Seems too good to be true, but it's Grid, I've heard of them.", tags: ["curious", "skeptical"] },
      { day: 2, note: "Clicked through to the landing page. UX is smooth. The EEG headset looks professional, not like a toy.", tags: ["impressed"], actions: ["visited website"] },
      { day: 4, note: "Found a Reddit thread discussing Grid's data ethics. Seems they have a clean record. Privacy concerns decreasing.", tags: ["researching"], actions: ["read reviews"] },
      { day: 5, note: "Saw a follow-up ad showing the setup process at home. It looks much simpler than I thought.", tags: ["interested"] },
      { day: 7, note: "Talked to a colleague who did a similar study for a university. They said these EEG bands are very safe.", tags: ["reassured"] },
      { day: 9, note: "Revisited the site. Checked the 'Humanoid Training' section. The idea of helping build robot dexterity is actually cool.", tags: ["intrigued"], actions: ["visited website"] },
      { day: 11, note: "Calculation: ₹10k for 15 mins of chores is basically my daily rate for 15 mins of work. No-brainer.", tags: ["calculated"] },
      { day: 12, note: "Final check on the consent form. It's standard. No hidden clauses about owning my soul.", tags: ["validated"], actions: ["read consent form"] },
      { day: 14, note: "Applied. Ready for the headset to arrive. Excited to see the humanoid training pipeline.", tags: ["intent to purchase"], actions: ["applied"] },
    ],
  },
  {
    name: "Karan",
    age: 29,
    gender: "male",
    outcome: "rejected",
    description:
      "A privacy-conscious cybersecurity analyst. He finds the requirement to film his home environment a major red flag that no amount of money can override.",
    exp: 12,
    confidence: "15.0%",
    keyTrigger: "Home privacy violation and invasive EEG data concerns",
    journey: [
      { day: 1, note: "Ad showing a guy cleaning his kitchen with an EEG headset. Why do they need video of my private space?", tags: ["concerned"] },
      { day: 2, note: "Did some research on 'spatial data harvesting'. This looks like a way to map interior layouts for training LLMs.", tags: ["suspicious"], actions: ["technical research"] },
      { day: 3, note: "Checked the privacy policy. 'Anonymized data' is a vague term. Re-identification is easy with EEG + Video.", tags: ["critical"], actions: ["read privacy policy"] },
      { day: 5, note: "Saw a second ad focusing on the money. Still doesn't address the core privacy issue. Ignored.", tags: ["annoyed"] },
      { day: 7, note: "Participated in a Twitter poll about data-for-pay models. Most people don't realize the risks.", tags: ["vocal"] },
      { day: 9, note: "Revisited the site to see if they updated their data deletion policy. Still too ambiguous.", tags: ["validated distrust"], actions: ["visited website"] },
      { day: 11, note: "₹10,000 is decent, but my biometric and spatial data is worth way more to me. Hard pass.", tags: ["rejected"] },
      { day: 13, note: "Reported the ad for misleading privacy claims. I'm done with this campaign.", tags: ["active rejection"], actions: ["reported ad"] },
    ],
  },
  {
    name: "Zara",
    age: 31,
    gender: "female",
    outcome: "considering",
    description:
      "A stay-at-home mother in Hyderabad. She needs extra income but is worried about the 'scary' looking headgear and if it's safe for her family environment.",
    exp: 14,
    confidence: "58.0%",
    keyTrigger: "Safety concerns vs. financial need",
    journey: [
      { day: 1, note: "The ad popped up during my lunch break. ₹10,000 would really help with the bills this month.", tags: ["hopeful"] },
      { day: 2, note: "Showed the ad to my husband. He's also unsure if the 'brain scanning' part is safe.", tags: ["hesitant"] },
      { day: 4, note: "The headset looks a bit weird. Does it emit any radiation? I have a toddler at home.", tags: ["safety concern"] },
      { day: 5, note: "Checked the Facebook comments. Someone asked about safety but the brand didn't reply yet. Still waiting.", tags: ["waiting"], actions: ["read comments"] },
      { day: 7, note: "Saw a new video with a user who has a dog. It looks very casual and safe. Feeling a bit better.", tags: ["reassured"] },
      { day: 9, note: "Looked up 'EEG safety for kids'. If the headset is only on for 15 minutes, it should be fine.", tags: ["researching"], actions: ["searched safety"] },
      { day: 11, note: "I could really use that money for the school fees next week. Maybe I'll just try it once.", tags: ["considering"] },
      { day: 13, note: "Bookmarked the application page. Need to make sure my internet is fast enough for the upload.", tags: ["preparing"], actions: ["bookmarked page"] },
      { day: 14, note: "Still on the fence. I'll see if I get another sign or a clearer answer on the safety.", tags: ["stalled"] },
    ],
  },
  {
    name: "Ishaan",
    age: 22,
    gender: "male",
    outcome: "high intent",
    description:
      "A final-year AI student in Delhi. He's less interested in the money and more in seeing how the data is used to train humanoid robots.",
    exp: 18,
    confidence: "95.0%",
    keyTrigger: "Technical curiosity and desire to contribute to AI research",
    journey: [
      { day: 1, note: "Humanoid training data collection? This is exactly what I'm studying. I want to see their sensor fusion.", tags: ["excited"] },
      { day: 2, note: "Checked their whitepaper linked in the site footer. They're using Graph Neural Networks for posture.", tags: ["impressed"], actions: ["read whitepaper"] },
      { day: 3, note: "The ₹10,000 is a nice bonus, but I'd do this for free just for the experience.", tags: ["highly motivated"] },
      { day: 5, note: "Posted about it on my college's AI club group. Everyone is curious about the EEG fidelity.", tags: ["influencing"] },
      { day: 7, note: "Sent a technical query to their support email about the sampling rate of the EEG headset.", tags: ["inquiring"], actions: ["sent email"] },
      { day: 8, note: "They replied! 256Hz dry-electrode system. That's high quality for a home-shipped unit.", tags: ["validated tech"] },
      { day: 10, note: "Signed up immediately. Asked them in the 'notes' section if they use Transformer-based models for the gait analysis.", tags: ["applied"], actions: ["applied"] },
      { day: 12, note: "Checked the status. Still under review. I hope they pick me, I want to see the calibration app.", tags: ["impatient"] },
      { day: 14, note: "Confirmed! Headset is shipping. This is going to be the best weekend project ever.", tags: ["high intent"] },
    ],
  },
  {
    name: "Aman",
    age: 26,
    gender: "male",
    outcome: "high intent",
    description:
      "An avid gamer in Pune. He's used to wearing headsets and finds the idea of 'training a robot' like a real-life video game quest.",
    exp: 13,
    confidence: "88.0%",
    keyTrigger: "Gamified perception of the task and comfort with hardware",
    journey: [
      { day: 1, note: "Saw the 'quest' style ad. Wear a headset, clean your desk, get 10k. Sounds like an easy level-up.", tags: ["amused"] },
      { day: 2, note: "I already wear a heavy gaming headset for 6 hours a day. This EEG thing will be nothing.", tags: ["confident"] },
      { day: 3, note: "Checking if I can do the tasks while listening to music. Ad says I need to focus on the movement.", tags: ["clarifying"] },
      { day: 5, note: "The dog in the ad was cool. Makes the company seem chill. Not too corporate.", tags: ["positive vibe"] },
      { day: 7, note: "Saw a friend on Discord mention they got paid by Grid last month. Legitimacy confirmed.", tags: ["reassured"] },
      { day: 9, note: "Checked the task list. Folding clothes and washing dishes? I do this every Sunday anyway.", tags: ["ready"] },
      { day: 11, note: "Application form is short. No long resume needed. I like this simple UX.", tags: ["satisfied"], actions: ["visited website"] },
      { day: 13, note: "Clicked the CTA. Applied. Let's see if I can set a high score for 'data quality'.", tags: ["intent to purchase"], actions: ["applied"] },
    ],
  },
  {
    name: "Sunita",
    age: 38,
    gender: "female",
    outcome: "rejected",
    description:
      "A school teacher in Chennai. She's skeptical of modern technology and thinks 'Humanoid Training' sounds like something out of a dystopian movie.",
    exp: 9,
    confidence: "10.0%",
    keyTrigger: "Technological fear and lack of relatability",
    journey: [
      { day: 1, note: "A machine learning my movements? This is how robots take over. I don't like it.", tags: ["fearful"] },
      { day: 3, note: "The falling cash in the video looks fake. Reminds me of those scammy loan apps.", tags: ["skeptical"], actions: ["reported ad"] },
      { day: 5, note: "Talked to a neighbor. They said it's just 'data', but how do I know it's not controlling me?", tags: ["paranoid"] },
      { day: 7, note: "Saw a news clip about AI replacing jobs. Why should I help them train my replacement?", tags: ["critical"] },
      { day: 9, note: "Not interested in having my brain scanned for any amount of money. Life is fine without it.", tags: ["rejected"], actions: ["dismissed"] },
      { day: 12, note: "The ads keep following me. I've blocked the brand on all platforms now.", tags: ["active avoidance"], actions: ["blocked brand"] },
      { day: 14, note: "Final decision: Technology has gone too far. I'll stick to my books and blackboard.", tags: ["rejected"] },
    ],
  },
  {
    name: "Rahul",
    age: 20,
    gender: "male",
    outcome: "high intent",
    description:
      "A college student in Kolkata. He's saving up for a new laptop and sees this as the fastest way to get his remaining budget.",
    exp: 11,
    confidence: "91.0%",
    keyTrigger: "Urgent financial goal (laptop purchase)",
    journey: [
      { day: 1, note: "₹10,000! That's exactly what I need for the SSD upgrade and extra RAM.", tags: ["excited"] },
      { day: 2, note: "Need to make sure my parents are okay with the headset coming to the house.", tags: ["planning"] },
      { day: 4, note: "I'll do the chores at my hostel. Might have to explain the headset to my roommates though lol.", tags: ["determined"] },
      { day: 6, note: "Checked the reviews on YouTube. People say the payout takes about 3 days after data upload.", tags: ["reassured"], actions: ["watched reviews"] },
      { day: 8, note: "Saw a promo code for students in the newsletter. Might get a bonus?", tags: ["hopeful"] },
      { day: 10, note: "Form filled. Hope they pick me soon. I need the cash before the sale ends.", tags: ["applied"], actions: ["applied"] },
      { day: 12, note: "Checked my email three times today. Nothing yet. The wait is killing me.", tags: ["anxious"] },
      { day: 14, note: "Approved! Getting my slot for the headset delivery tomorrow. Laptop, here I come!", tags: ["high intent"] },
    ],
  },
  {
    name: "Dr. Iyer",
    age: 52,
    gender: "male",
    outcome: "considering",
    description:
      "A senior researcher in Bangalore. He wants to ensure the data is used ethically and that there's proper consent for biometric data usage.",
    exp: 16,
    confidence: "45.0%",
    keyTrigger: "Ethical oversight and data usage transparency",
    journey: [
      { day: 1, note: "Interesting approach to data collection. But who owns the IP of the trained model?", tags: ["analytical"] },
      { day: 3, note: "The ad is a bit too 'flashy'. I'd prefer a more clinical explanation of the EEG fidelity.", tags: ["skeptical"] },
      { day: 5, note: "Downloaded their technical PDF. The signal-to-noise ratio seems acceptable for non-medical use.", tags: ["researching"], actions: ["downloaded docs"] },
      { day: 7, note: "Sent an email to their research alias. If they have an IRB approval, I might participate.", tags: ["researching"], actions: ["sent email"] },
      { day: 9, note: "They responded with their ethical guidelines. It's a start, but I need more details on third-party access.", tags: ["unsatisfied"] },
      { day: 11, note: "Checking if any of my peers in the academy are involved. Found one on the advisory board.", tags: ["validating"] },
      { day: 13, note: "Participating as a user might give me better insight into their protocol than just reading docs.", tags: ["considering"] },
      { day: 14, note: "I'll wait for the next webinar they announced to ask about the long-term data storage.", tags: ["waiting"] },
    ],
  },
  {
    name: "Anjali",
    age: 27,
    gender: "female",
    outcome: "rejected",
    description:
      "A marketing professional in Gurgaon. She thinks the creative is 'cringe' and the UX of the landing page was too slow, leading to abandonment.",
    exp: 12,
    confidence: "32.0%",
    keyTrigger: "Poor UX and lack of high-end brand perception",
    journey: [
      { day: 1, note: "The falling cash VFX is so 2010. Doesn't feel like a high-tech AI company.", tags: ["critical"] },
      { day: 2, note: "Clicked the link but it took 5 seconds to load on my iPhone. I closed it immediately.", tags: ["annoyed"], actions: ["clicked CTA", "bounced"] },
      { day: 4, note: "Saw the ad again. The guy in the video looks like he's acting too hard. Very fake.", tags: ["disinterested"] },
      { day: 6, note: "Tried to visit the site from my laptop. The scroll experience is a bit jerky. UX matters!", tags: ["critical"], actions: ["visited website"] },
      { day: 8, note: "Got a retargeting ad. It's still the same video. Why don't they refresh their creative?", tags: ["annoyed"] },
      { day: 10, note: "Saw it again. Still not feeling the 'vibe'. Too UGC, not enough premium aesthetic.", tags: ["rejected"] },
      { day: 12, note: "Discussed it with my team as a case study of 'what not to do' in tech marketing.", tags: ["vocal rejection"] },
      { day: 14, note: "Final score: 3/10. Won't be applying. Not my level of brand quality.", tags: ["rejected"] },
    ],
  },
  {
    name: "Vikram",
    age: 45,
    gender: "male",
    outcome: "considering",
    description:
      "A retired army officer in Noida. He's looking for structured tasks to stay active and likes the idea of 'training' something, even if it's a robot.",
    exp: 14,
    confidence: "72.0%",
    keyTrigger: "Sense of duty/contribution and structured task nature",
    journey: [
      { day: 1, note: "Training a robot to do chores? Sounds like a good way to help society advance.", tags: ["patriotic"] },
      { day: 3, note: "The payment is a good bonus for the time spent. Is the headset heavy? I have some neck pain.", tags: ["curious"] },
      { day: 5, note: "Checked the weight specs on the site. Only 150 grams. That's manageable.", tags: ["reassured"], actions: ["checked specs"] },
      { day: 7, note: "Talked to my son about it. He says Grid is a big name in AI. He's encouraging me to try.", tags: ["considering"], actions: ["asked family"] },
      { day: 9, note: "Saw a video of an older person doing the study. They looked comfortable. I like the representation.", tags: ["positive"] },
      { day: 11, note: "Reading the terms. They ask for a clear video of the workspace. I'll need to tidy up the study.", tags: ["preparing"] },
      { day: 13, note: "I'll think about it for one more day. I want to make sure I can commit to the 15-minute slot.", tags: ["diligent"] },
      { day: 14, note: "Almost ready to apply. Just need to clear it with my morning routine schedule.", tags: ["considering"] },
    ],
  },
];

// ---------- daily performance ----------
type DailyPoint = { day: number; impressions: number; unique: number };

const dailyPerformance: DailyPoint[] = [
  { day: 0, impressions: 18200, unique: 6400 },
  { day: 1, impressions: 22500, unique: 7100 },
  { day: 2, impressions: 26800, unique: 7800 },
  { day: 3, impressions: 24200, unique: 7600 },
  { day: 4, impressions: 19500, unique: 7200 },
  { day: 5, impressions: 21000, unique: 7400 },
  { day: 6, impressions: 28700, unique: 8200 },
  { day: 7, impressions: 32500, unique: 8600 },
  { day: 8, impressions: 35100, unique: 9200 },
  { day: 9, impressions: 31200, unique: 8900 },
  { day: 10, impressions: 24800, unique: 8400 },
  { day: 11, impressions: 20300, unique: 7900 },
  { day: 12, impressions: 22100, unique: 8100 },
  { day: 13, impressions: 29400, unique: 8700 },
  { day: 14, impressions: 38200, unique: 9600 },
];

// ---------- funnel ----------
type FunnelSegment = {
  label: string;
  count: number;
  percent: number;
  dot: string;
  bar: string;
};

const funnelSegments: FunnelSegment[] = [
  { label: "Aware", count: 4200, percent: 42.0, dot: "bg-[#2f7bff]", bar: "bg-[#2f7bff]" },
  { label: "Considering", count: 1400, percent: 14.0, dot: "bg-[#7c3aed]", bar: "bg-[#7c3aed]" },
  { label: "Intending", count: 450, percent: 4.5, dot: "bg-[#f59e0b]", bar: "bg-[#f59e0b]" },
  { label: "Applied", count: 710, percent: 7.1, dot: "bg-[#22c55e]", bar: "bg-[#22c55e]" },
  { label: "Unaware", count: 3240, percent: 32.4, dot: "bg-[#262626]", bar: "bg-[#262626]" },
];

// ---------- creative benchmarks ----------
type Benchmark = { label: string; score: number; percentile: string };

const benchmarks: Benchmark[] = [
  { label: "Attention Capture", score: 92, percentile: "P88" },
  { label: "Sustained Attention", score: 48, percentile: "P42" },
  { label: "Emotional Arousal", score: 75, percentile: "P71" },
  { label: "Emotional Valence", score: 46, percentile: "P38" },
  { label: "Reward", score: 40, percentile: "P22" },
  { label: "Memory Encoding", score: 52, percentile: "P45" },
  { label: "Social Resonance", score: 35, percentile: "P30" },
  { label: "Curiosity", score: 82, percentile: "P79" },
];

const performanceDrivers = ["Attention Capture", "Curiosity", "Emotional Arousal"];

const budgetRecommendations = [
  "Instagram Reels is 2.3x more effective than baseline — increase allocation by 30%.",
  "YouTube Pre-Roll is underperforming (0.4x baseline) — consider reallocating budget.",
  "Facebook Feed is below baseline (0.5x) — creative format mismatch for this audience.",
  "TikTok For You Page shows strong early signals (1.8x) — test incremental budget here.",
];

const creativeRecommendations = [
  "Remove falling cash VFX to increase the 'Trust' metric by ~20% among high-skepticism segments.",
  "Add a 'Data Privacy Shield' badge or explicit anonymization statement to reduce Skepticism conversion loss.",
  "Clarify head-rig onboarding: add a 3-second overlay showing 'We send the headset to you' to remove hardware friction.",
  "Low word-of-mouth potential (35/100). Add a referral mechanic ('Refer a friend, earn ₹500 bonus') to increase viral coefficient.",
  "Improve emotional valence: current score (46) is below median — showing positive real-life outcomes post-participation would help.",
  "Leverage the dog/pet element: authenticity signal is strong — keep UGC-style moments in future variants.",
];

// =============================================================================
// MAIN SECTION
// =============================================================================
export function GridStyleSimulationSection({ config }: { config: GridStyleSimulationConfig }) {
  const [expandedAgentIdx, setExpandedAgentIdx] = useState<number>(-1);
  const sectionAgents = config.agentJourneys ?? agents;
  const sectionBudgetRecommendations = config.recommendations?.budget ?? budgetRecommendations;
  const sectionCreativeRecommendations = config.recommendations?.creative ?? creativeRecommendations;

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-24">
      {/* ---------- header ---------- */}
      <div className="space-y-3">
        <Link
          href={simulationIndexPath}
          className="inline-flex items-center gap-1.5 text-sm text-inkMuted transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Simulations
        </Link>

        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="headline text-3xl leading-tight text-ink md:text-[2.25rem]">
                {config.title}
              </h1>
              <Chip>Deep Simulation</Chip>
            </div>
            <p className="text-sm text-inkMuted">
              {config.metaLine}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink transition hover:bg-panelSoft"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* ---------- hero KPI cards ---------- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<DollarSign className="h-4 w-4" />}
          label={config.kpis[0].label}
          value={config.kpis[0].value}
          sparkD={revenueSpark}
          sparkColor="#22c55e"
          sparkFill="rgba(34,197,94,0.12)"
        />
        <KpiCard
          icon={<Users className="h-4 w-4" />}
          label={config.kpis[1].label}
          value={config.kpis[1].value}
          sparkD={conversionsSpark}
          sparkColor="#2f7bff"
          sparkFill="rgba(47,123,255,0.10)"
        />
        <KpiCard
          icon={<Eye className="h-4 w-4" />}
          label={config.kpis[2].label}
          value={config.kpis[2].value}
          sparkD={awarenessSpark}
          sparkColor="#14b8a6"
          sparkFill="rgba(20,184,166,0.10)"
        />
        <KpiCard
          icon={<TrendingUp className="h-4 w-4" />}
          label={config.kpis[3].label}
          value={config.kpis[3].value}
          sparkD={sentimentSpark}
          sparkColor="#f59e0b"
          sparkFill="rgba(245,158,11,0.10)"
        />
      </div>

      {/* ---------- secondary KPIs ---------- */}
      <div className="grid gap-4 md:grid-cols-3">
        <MiniStat label={config.secondaryStats[0].label} value={config.secondaryStats[0].value} />
        <MiniStat label={config.secondaryStats[1].label} value={config.secondaryStats[1].value} />
        <MiniStat label={config.secondaryStats[2].label} value={config.secondaryStats[2].value} />
      </div>

      {/* ---------- brain activation with video ---------- */}
      <BrainActivationBlock config={config} />

      {/* ---------- agent decision journeys ---------- */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Agent Decision Journeys</h2>
          <span className="text-xs text-inkMuted">10 archetypes simulated</span>
        </div>
        <div className="mt-4 space-y-2">
          {sectionAgents.map((agent, idx) => (
            <AgentRow
              key={`${agent.name}-${idx}`}
              agent={agent}
              expanded={expandedAgentIdx === idx}
              onToggle={() => setExpandedAgentIdx(expandedAgentIdx === idx ? -1 : idx)}
            />
          ))}
        </div>
      </Card>

      {/* ---------- daily performance + funnel distribution ---------- */}
      <div className="grid gap-4 md:grid-cols-2">
        <DailyPerformanceCard />
        <FunnelDistributionCard />
      </div>

      {/* ---------- funnel breakdown ---------- */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-ink">Funnel Breakdown</h2>
        <div className="mt-4 space-y-3">
          {funnelSegments.map((segment) => (
            <FunnelBar key={segment.label} segment={segment} />
          ))}
        </div>
      </Card>

      {/* ---------- creative benchmarks ---------- */}
      <Card className="p-5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-ink">Creative Benchmarks</h2>
          <span className="text-xs text-inkMuted">vs. 18 historical creatives</span>
        </div>
        <p className="mt-1 text-xs text-inkMuted">
          Strong initial attention hook; trust and reward metrics below median for data-collection
          campaigns.
        </p>
        <div className="mt-5 space-y-4">
          {benchmarks.map((b) => (
            <BenchmarkRow key={b.label} benchmark={b} />
          ))}
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-ink">Top Performance Drivers (Learned)</p>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {performanceDrivers.map((driver, i) => (
              <div
                key={driver}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-sm text-ink">{driver}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ---------- recommendations ---------- */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-ink">Recommendations</h2>

        <div className="mt-4">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-inkMuted">BUDGET</p>
          <div className="mt-2 space-y-2">
            {sectionBudgetRecommendations.map((rec) => (
              <RecommendationItem key={rec} text={rec} />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-inkMuted">CREATIVE</p>
          <div className="mt-2 space-y-2">
            {sectionCreativeRecommendations.map((rec) => (
              <RecommendationItem key={rec} text={rec} />
            ))}
          </div>
        </div>
      </Card>

      {/* ---------- awareness, sentiment & memory ---------- */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-ink">AIDA Funnel &amp; Sentiment Over Time</h2>
        <AwarenessSentimentMemoryChart />
      </Card>
    </div>
  );
}

export function GridDataopsSimulatorSection() {
  return <GridStyleSimulationSection config={defaultGridConfig} />;
}

// =============================================================================
// KPI Card
// =============================================================================
function KpiCard({
  icon,
  label,
  value,
  sparkD,
  sparkColor,
  sparkFill,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sparkD: string;
  sparkColor: string;
  sparkFill: string;
}) {
  const fillD = `${sparkD} L100,44 L0,44 Z`;
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-sm text-inkMuted">
        <span className="text-inkMuted">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-ink">{value}</div>
      <svg className="mt-3 h-10 w-full" viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true">
        <path d={fillD} fill={sparkFill} />
        <path d={sparkD} fill="none" stroke={sparkColor} strokeWidth="1.6" />
      </svg>
    </Card>
  );
}

// =============================================================================
// Mini stat tile
// =============================================================================
function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-5 py-4">
      <div className="text-xs text-inkMuted">{label}</div>
      <div className="mt-1 text-xl font-semibold tracking-tight text-ink">{value}</div>
    </div>
  );
}

// =============================================================================
// Brain Activation (with video + second-by-second metrics)
// =============================================================================
function BrainActivationBlock({ config }: { config: GridStyleSimulationConfig }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(config.video.duration);

  useEffect(() => {
    if (config.video.src) return;
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setCurrentTime((t) => {
        const next = t + 0.1;
        if (next >= duration) {
          setIsPlaying(false);
          return 0;
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [isPlaying, duration, config.video.src]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else void videoRef.current.play();
      return;
    }
    setIsPlaying((p) => !p);
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const nextTime = ratio * duration;
    setCurrentTime(nextTime);
    if (videoRef.current) videoRef.current.currentTime = nextTime;
  };

  const secondsFloor = Math.floor(currentTime);
  const metrics = getBrainMetricsAt(secondsFloor);
  const progressPct = Math.min(100, (currentTime / duration) * 100);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Brain Activation</h2>
        <span className="text-xs text-inkMuted">{config.overallScoreLabel}</span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* TOP LEFT: 3D Brain Viewer — height matched to video */}
        <div className="aspect-[9/16] rounded-2xl bg-black overflow-hidden border border-line/20">
          <BrainViewerLazy
                predictionKey={config.video.predictionKey}
                segmentIndex={Math.min(secondsFloor, config.video.maxSegment)}
                autoRotateSpeed={0.125}
          />
        </div>

        {/* TOP RIGHT: Video container */}
        <div className="relative overflow-hidden rounded-2xl bg-black group">
          {config.video.src ? (
            <video
              ref={videoRef}
              src={config.video.src}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="aspect-[9/16] w-full object-contain"
              playsInline
              muted={isMuted}
            />
          ) : (
            <div className="aspect-[9/16] w-full" />
          )}

          {config.video.src && (
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          )}
        </div>

        {/* BOTTOM LEFT: Spacer (empty as requested) */}
        <div className="hidden md:block" />

        {/* BOTTOM RIGHT: Controls & Metrics */}
        <div className="space-y-4">
          {/* Custom controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePlayPause}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition hover:bg-ink/90"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5" fill="currentColor" />
              ) : (
                <Play className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor" />
              )}
            </button>
            <div
              className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-[#e4e4e7]"
              onClick={handleSeek}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={Math.round(currentTime)}
              tabIndex={0}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-ink"
                style={{ width: `${progressPct}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-ink"
                style={{ left: `calc(${progressPct}% - 6px)` }}
              />
            </div>
            <span className="text-xs tabular-nums text-inkMuted">
              {secondsFloor}s/{Math.floor(duration)}s
            </span>
          </div>

          {/* Second-by-second brain metrics */}
          <div className="space-y-2.5">
            {metrics.map((metric) => {
              const isBoldNumber = metric.value >= 60;
              const isBarDark = metric.value >= 40;
              return (
                <div key={metric.label} className="grid grid-cols-[110px_1fr_40px] items-center gap-3">
                  <span className="text-sm text-ink">{metric.label}</span>
                  <div className="h-2 rounded-full bg-[#e4e4e7]">
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-300",
                        isBarDark ? "bg-ink" : "bg-[#c7c7cb]",
                      )}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-right text-sm tabular-nums",
                      isBoldNumber ? "font-semibold text-ink" : "text-inkMuted",
                    )}
                  >
                    {metric.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer KPIs */}
          <div className="mt-2 grid grid-cols-2 gap-4 border-t border-line pt-4">
            <div>
              <div className="text-xs text-inkMuted">Simulated Reach</div>
              <div className="mt-0.5 text-lg font-semibold text-ink">{config.brainFooter.simulatedReach}</div>
            </div>
            <div>
              <div className="text-xs text-inkMuted">Peak Attention</div>
              <div className="mt-0.5 text-lg font-semibold text-ink">{config.brainFooter.peakAttention}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// =============================================================================
// Agent row
// =============================================================================
function AgentRow({
  agent,
  expanded,
  onToggle,
}: {
  agent: Agent;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white transition">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-4 py-3 text-left transition hover:bg-panelSoft"
        aria-expanded={expanded}
        aria-controls={`agent-journey-${agent.name}`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
          {agent.name.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-ink">{agent.name}</span>
            <span className="text-xs text-inkMuted">
              {agent.age}, {agent.gender}
            </span>
            <span className="text-xs text-inkFaint">·</span>
            <span className="text-xs text-inkMuted">{agent.outcome}</span>
          </div>
          <p className={cn("mt-0.5 text-sm text-inkMuted", !expanded && "truncate")}>
            {agent.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <span className="text-xs text-inkMuted">{agent.exp} exp</span>
          <span className="text-sm font-semibold text-ink">{agent.confidence}</span>
          <ChevronDown
            className={cn("h-4 w-4 text-inkMuted transition-transform", expanded ? "rotate-180" : "")}
          />
        </div>
      </button>

      {expanded && agent.journey && (
        <div id={`agent-journey-${agent.name}`} className="border-t border-line px-6 py-6">
          <div className="relative ml-2 space-y-8 before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#e4e4e7]">
            {agent.journey.map((exp) => (
              <div key={exp.day} className="relative pl-8">
                <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-[#a1a1aa] ring-4 ring-white" />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-ink">Day {exp.day}</span>
                    {exp.tags?.map((tag) => (
                      <Chip key={tag} className="bg-[#f4f4f5] text-[#71717a]">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                  <p className="max-w-2xl text-[13px] leading-relaxed text-inkMuted">
                    {exp.note}
                  </p>
                  {exp.actions && exp.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {exp.actions.map((action) => (
                        <span key={action} className="text-[11px] font-medium text-inkMuted underline decoration-line underline-offset-4">
                          {action}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {agent.keyTrigger && (
            <div className="mt-8 rounded-xl border border-line bg-panelSoft/50 px-4 py-3 text-sm text-ink">
              <span className="font-medium text-inkMuted">Key trigger:</span> {agent.keyTrigger}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Daily Performance line chart
// =============================================================================
function DailyPerformanceCard() {
  const [hoverDay, setHoverDay] = useState<number>(8);

  const chartW = 460;
  const chartH = 220;
  const padL = 34;
  const padR = 8;
  const padT = 10;
  const padB = 28;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const xMax = dailyPerformance.length - 1;
  const yMax = 40000;

  const x = (day: number) => padL + (day / xMax) * plotW;
  const y = (val: number) => padT + plotH - (val / yMax) * plotH;

  const impressionsPath = dailyPerformance
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.day).toFixed(1)},${y(p.impressions).toFixed(1)}`)
    .join(" ");
  const uniquePath = dailyPerformance
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.day).toFixed(1)},${y(p.unique).toFixed(1)}`)
    .join(" ");

  const hoverPoint = dailyPerformance.find((p) => p.day === hoverDay) ?? dailyPerformance[8];
  const yLabels = [0, 10000, 20000, 30000, 40000];

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Daily Performance</h2>
        <div className="flex items-center gap-4 text-xs text-inkMuted">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-5 bg-[#7c3aed]" />
            Impressions
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-5 bg-[#14b8a6]" />
            Unique Reached
          </span>
        </div>
      </div>

      <div className="relative mt-4">
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" onMouseLeave={() => setHoverDay(8)}>
          {yLabels.map((val) => (
            <g key={val}>
              <line x1={padL} x2={chartW - padR} y1={y(val)} y2={y(val)} stroke="#f0f0f3" strokeWidth="1" />
              <text x={padL - 6} y={y(val) + 3} fontSize="10" fill="#9b9ba0" textAnchor="end">
                {val === 0 ? "0" : `${val / 1000}K`}
              </text>
            </g>
          ))}

          <path d={impressionsPath} fill="none" stroke="#7c3aed" strokeWidth="1.8" />
          <path d={uniquePath} fill="none" stroke="#14b8a6" strokeWidth="1.8" />

          <circle cx={x(hoverPoint.day)} cy={y(hoverPoint.impressions)} r="3.5" fill="#7c3aed" />

          {dailyPerformance
            .filter((_, i) => i % 2 === 0)
            .map((p) => (
              <text key={p.day} x={x(p.day)} y={chartH - 8} fontSize="10" fill="#9b9ba0" textAnchor="middle">
                Day {p.day}
              </text>
            ))}

          {dailyPerformance.map((p, i) => {
            const prevX = i === 0 ? padL : (x(p.day) + x(dailyPerformance[i - 1].day)) / 2;
            const nextX =
              i === dailyPerformance.length - 1 ? chartW - padR : (x(p.day) + x(dailyPerformance[i + 1].day)) / 2;
            return (
              <rect
                key={p.day}
                x={prevX}
                y={padT}
                width={nextX - prevX}
                height={plotH}
                fill="transparent"
                onMouseEnter={() => setHoverDay(p.day)}
              />
            );
          })}
        </svg>

        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-xl border border-line bg-white px-3 py-2 text-xs shadow-[0_4px_14px_rgba(18,18,23,0.08)]"
          style={{
            left: `calc(${padL}px + ${(hoverPoint.day / xMax) * 100}% * (100% - ${padL + padR}px) / 100%)`,
            top: `calc(${(y(hoverPoint.impressions) / chartH) * 100}% - 8px)`,
          }}
        >
          <div className="font-semibold text-ink">Day {hoverPoint.day}</div>
          <div className="mt-0.5 text-inkMuted">
            Impressions : <span className="text-ink">{hoverPoint.impressions.toLocaleString()}</span>
          </div>
          <div className="text-inkMuted">
            Unique Reached : <span className="text-ink">{hoverPoint.unique.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// =============================================================================
// Funnel Distribution donut
// =============================================================================
function FunnelDistributionCard() {
  const cx = 110;
  const cy = 110;
  const rOuter = 80;
  const rInner = 50;

  const total = funnelSegments.reduce((sum, s) => sum + s.count, 0) || 1;
  let angle = -Math.PI / 2;
  const arcs = funnelSegments.map((segment) => {
    const portion = segment.count / total;
    const sweep = portion * Math.PI * 2;
    const start = angle;
    const end = angle + sweep;
    angle = end;

    if (segment.count === 0) return null;

    const largeArc = sweep > Math.PI ? 1 : 0;
    const x1 = (cx + rOuter * Math.cos(start)).toFixed(3);
    const y1 = (cy + rOuter * Math.sin(start)).toFixed(3);
    const x2 = (cx + rOuter * Math.cos(end)).toFixed(3);
    const y2 = (cy + rOuter * Math.sin(end)).toFixed(3);
    const x3 = (cx + rInner * Math.cos(end)).toFixed(3);
    const y3 = (cy + rInner * Math.sin(end)).toFixed(3);
    const x4 = (cx + rInner * Math.cos(start)).toFixed(3);
    const y4 = (cy + rInner * Math.sin(start)).toFixed(3);
    const d = `M${x1},${y1} A${rOuter},${rOuter} 0 ${largeArc} 1 ${x2},${y2} L${x3},${y3} A${rInner},${rInner} 0 ${largeArc} 0 ${x4},${y4} Z`;
    return { d, fill: segment.dot.replace("bg-[", "").replace("]", "") };
  });

  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-ink">Funnel Distribution</h2>
      <div className="mt-4 flex items-center justify-center">
        <svg viewBox="0 0 220 220" className="h-56 w-56">
          {arcs.map((arc, i) => (arc ? <path key={i} d={arc.d} fill={arc.fill} /> : null))}
          <text x={cx} y={cy - 2} fontSize="18" fontWeight="600" fill="#1b1b1f" textAnchor="middle">
            10.0K
          </text>
          <text x={cx} y={cy + 14} fontSize="10" fill="#9b9ba0" textAnchor="middle">
            Total
          </text>
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs">
        {funnelSegments.map((segment) => (
          <span key={segment.label} className="inline-flex items-center gap-1.5">
            <span className={cn("inline-block h-1.5 w-1.5 rounded-full", segment.dot)} />
            <span className="text-inkMuted">{segment.label}</span>
          </span>
        ))}
      </div>
    </Card>
  );
}

// =============================================================================
// Funnel bar
// =============================================================================
function FunnelBar({ segment }: { segment: FunnelSegment }) {
  const displayCount =
    segment.count >= 1000 ? `${(segment.count / 1000).toFixed(1)}K` : segment.count.toString();
  return (
    <div className="grid grid-cols-[120px_1fr_auto] items-center gap-4">
      <span className="text-sm text-ink">{segment.label}</span>
      <div className="h-2 rounded-full bg-[#f0f0f3]">
        <div className={cn("h-full rounded-full", segment.bar)} style={{ width: `${segment.percent}%` }} />
      </div>
      <span className="text-sm tabular-nums text-ink">
        {displayCount} <span className="text-inkMuted">({segment.percent.toFixed(1)}%)</span>
      </span>
    </div>
  );
}

// =============================================================================
// Benchmark row
// =============================================================================
function BenchmarkRow({ benchmark }: { benchmark: Benchmark }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink">{benchmark.label}</span>
        <span className="tabular-nums">
          <span className="font-semibold text-ink">{benchmark.score}</span>{" "}
          <span className="text-inkMuted">{benchmark.percentile}</span>
        </span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-[#f0f0f3]">
        <div className="h-full rounded-full bg-ink" style={{ width: `${benchmark.score}%` }} />
      </div>
    </div>
  );
}

// =============================================================================
// Recommendation item
// =============================================================================
function RecommendationItem({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink">{text}</div>
  );
}

// =============================================================================
// AIDA Funnel & Sentiment chart
// =============================================================================
function AwarenessSentimentMemoryChart() {
  // AIDA from test-result.md: Awareness 100%, Interest 72%, Desire 45%, Action 7.1%
  // Sentiment verticals: Excitement 75%, Confusion 40%, Distrust 55%, Curiosity 82%
  const days = Array.from({ length: 15 }, (_, i) => i);
  const awareness = [
    0.10, 0.13, 0.16, 0.20, 0.24, 0.28, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30,
  ];
  const interest = [
    0.05, 0.08, 0.12, 0.16, 0.19, 0.21, 0.22, 0.22, 0.22, 0.21, 0.20, 0.20, 0.20, 0.21, 0.22,
  ];
  const desire = [
    0.02, 0.04, 0.06, 0.08, 0.10, 0.11, 0.12, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13,
  ];

  const chartW = 460;
  const chartH = 220;
  const padL = 34;
  const padR = 8;
  const padT = 10;
  const padB = 28;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;
  const yMax = 0.32;
  const xMax = days.length - 1;

  const toPath = (series: number[]) =>
    series
      .map((v, i) => {
        const xPos = padL + (i / xMax) * plotW;
        const yPos = padT + plotH - (v / yMax) * plotH;
        return `${i === 0 ? "M" : "L"}${xPos.toFixed(1)},${yPos.toFixed(1)}`;
      })
      .join(" ");

  const yLabels = [0, 0.08, 0.16, 0.24, 0.32];

  return (
    <div className="mt-3">
      <div className="mb-3 flex flex-wrap gap-4 text-xs text-inkMuted">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5 bg-[#22c55e]" /> Awareness
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5 bg-[#2f7bff]" /> Interest
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5 bg-[#f59e0b]" /> Desire
        </span>
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full">
        {yLabels.map((val) => {
          const yPos = padT + plotH - (val / yMax) * plotH;
          return (
            <g key={val}>
              <line x1={padL} x2={chartW - padR} y1={yPos} y2={yPos} stroke="#f0f0f3" strokeWidth="1" />
              <text x={padL - 6} y={yPos + 3} fontSize="10" fill="#9b9ba0" textAnchor="end">
                {val === 0 ? "0" : val.toFixed(2)}
              </text>
            </g>
          );
        })}

        <path d={toPath(awareness)} fill="none" stroke="#22c55e" strokeWidth="1.8" />
        <path d={toPath(interest)} fill="none" stroke="#2f7bff" strokeWidth="1.8" />
        <path d={toPath(desire)} fill="none" stroke="#f59e0b" strokeWidth="1.8" />

        {days
          .filter((d) => d % 2 === 0)
          .map((d) => {
            const xPos = padL + (d / xMax) * plotW;
            return (
              <text key={d} x={xPos} y={chartH - 8} fontSize="10" fill="#9b9ba0" textAnchor="middle">
                Day {d}
              </text>
            );
          })}
      </svg>
    </div>
  );
}

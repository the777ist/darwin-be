interface LogEvent {
  timestamp: string;
  type: "goalAchievement" | "experimentEvent" | "visitorMilestone";
  description: string;
}

interface Variant {
  name: string;
  visitors: number;
  conversions: number;
  revenue: number;
}

interface LiveUpdate {
  timestamp: string;
  control: {
    visitors: number;
    conversions: number;
    revenue: number;
  };
  variantB: {
    visitors: number;
    conversions: number;
    revenue: number;
  };
}

interface ExperimentData {
  experimentId: string;
  variants: Variant[];
  liveUpdates: LiveUpdate[];
  logs: LogEvent[];
}

export function generateExperimentData(): ExperimentData {
  const baseVisitorsControl = 1200 + Math.floor(Math.random() * 50);
  const baseVisitorsVariantB = 1100 + Math.floor(Math.random() * 50);

  const controlConversionRate = 0.21 + Math.random() * 0.02;
  const variantBConversionRate = 0.26 + Math.random() * 0.02;

  const avgRevenuePerConversion = 20;

  const controlConversions = Math.floor(
    baseVisitorsControl * controlConversionRate
  );
  const variantBConversions = Math.floor(
    baseVisitorsVariantB * variantBConversionRate
  );

  const controlRevenue = controlConversions * avgRevenuePerConversion;
  const variantBRevenue = variantBConversions * avgRevenuePerConversion;

  const getRandomPastTimestamp = (
    minMinutesAgo: number,
    maxMinutesAgo: number
  ) => {
    const now = new Date();
    const minutesAgo =
      minMinutesAgo +
      Math.floor(Math.random() * (maxMinutesAgo - minMinutesAgo));
    return new Date(now.getTime() - minutesAgo * 60000).toISOString();
  };

  const liveUpdates: LiveUpdate[] = Array.from({ length: 12 }, (_, i) => ({
    timestamp: getRandomPastTimestamp(i * 5, (i + 1) * 5),
    control: {
      visitors: Math.floor(Math.random() * 20) + 15,
      conversions: Math.floor(Math.random() * 5) + 3,
      revenue: Math.floor(Math.random() * 100) + 80,
    },
    variantB: {
      visitors: Math.floor(Math.random() * 20) + 15,
      conversions: Math.floor(Math.random() * 6) + 4,
      revenue: Math.floor(Math.random() * 120) + 90,
    },
  })).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const logs: LogEvent[] = [];

  if (baseVisitorsControl + baseVisitorsVariantB > 2000) {
    logs.push({
      timestamp: getRandomPastTimestamp(120, 180),
      type: "visitorMilestone",
      description: "2000 total visitors reached",
    });
  }

  if (Math.random() > 0.7) {
    logs.push({
      timestamp: getRandomPastTimestamp(30, 60),
      type: "experimentEvent",
      description:
        "Variant B reached statistical significance (+12% conversion rate)",
    });
  }

  if (controlRevenue + variantBRevenue > 10000) {
    logs.push({
      timestamp: getRandomPastTimestamp(90, 150),
      type: "goalAchievement",
      description: "$10,000 revenue milestone achieved",
    });
  }

  logs.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return {
    experimentId: "exp_live_001",
    variants: [
      {
        name: "Variant A",
        visitors: baseVisitorsControl,
        conversions: controlConversions,
        revenue: controlRevenue,
      },
      {
        name: "Variant B",
        visitors: baseVisitorsVariantB,
        conversions: variantBConversions,
        revenue: variantBRevenue,
      },
    ],
    liveUpdates,
    logs,
  };
}

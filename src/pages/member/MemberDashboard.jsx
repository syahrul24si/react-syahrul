import { useAuth } from "@/context/AuthContext";
import PageHeader from "@/components/PageHeader";

const tierConfig = {
  bronze: { discount: 5, color: "bg-orange-200 text-orange-800", nextTier: "Silver", nextAt: 101 },
  silver: { discount: 10, color: "bg-gray-300 text-gray-800", nextTier: "Gold", nextAt: 501 },
  gold: { discount: 15, color: "bg-yellow-200 text-yellow-800", nextTier: "Platinum", nextAt: 1001 },
  platinum: { discount: 20, color: "bg-purple-200 text-purple-800", nextTier: null, nextAt: null },
};

export default function MemberDashboard() {
  const { profile } = useAuth();

  if (!profile) return null;

  const tier = profile.tier || "bronze";
  const config = tierConfig[tier];
  const pointsNeeded = config.nextAt ? config.nextAt - profile.points : 0;

  return (
    <div>
      <PageHeader title="My Dashboard" breadcrumb={["Home", "Member Dashboard"]} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {/* Welcome Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {profile.full_name || "Member"}!
          </h2>
          <p className="text-gray-500">
            Enjoy shopping with exclusive member benefits.
          </p>
        </div>

        {/* Tier Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <p className="text-sm text-gray-500 mb-2">Current Tier</p>
          <span className={`inline-block rounded-full px-4 py-2 text-lg font-bold capitalize ${config.color}`}>
            {tier}
          </span>
          <p className="mt-3 text-gray-600">
            You get <span className="font-bold text-green-600">{config.discount}%</span> discount on every purchase.
          </p>
        </div>

        {/* Points Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <p className="text-sm text-gray-500 mb-2">Total Points</p>
          <p className="text-4xl font-bold text-emerald-600">{profile.points}</p>

          {config.nextTier ? (
            <div className="mt-3">
              <p className="text-sm text-gray-500">
                {pointsNeeded > 0
                  ? `${pointsNeeded} more points to reach ${config.nextTier}`
                  : `You've reached ${config.nextTier}!`}
              </p>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${Math.min((profile.points / config.nextAt) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-purple-600 font-semibold">
              Maximum tier reached!
            </p>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Tier Benefits</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {Object.entries(tierConfig).map(([key, val]) => (
            <div
              key={key}
              className={`rounded-xl p-4 text-center ${key === tier ? "ring-2 ring-emerald-500" : ""} bg-gray-50`}
            >
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold capitalize ${val.color}`}>
                {key}
              </span>
              <p className="mt-2 text-2xl font-bold">{val.discount}%</p>
              <p className="text-xs text-gray-500">discount</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Earn 1 point for every Rp 10,000 spent. Points accumulate to unlock higher tiers!
        </p>
      </div>
    </div>
  );
}

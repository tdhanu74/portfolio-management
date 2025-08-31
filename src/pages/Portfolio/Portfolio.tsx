import {
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
} from "recharts";
import portfolio from "./portfolio.json";

type PortfolioRow = {
  date: string;
  equity: number;
  drawdown: number;
  growth: number;
};

function parseDate(d: string): Date {
  const [dd, mm, yyyy] = d.split("-");
  return new Date(`${yyyy}-${mm}-${dd}`);
}

function computePortfolioRows(data: { date: string; equity: number }[]): PortfolioRow[] {
  let peak = -Infinity;
  const firstEquity = data.length > 0 ? data[0].equity : 1;
  const dateToIndex: Record<string, number> = {};
  data.forEach((row, idx) => {
    dateToIndex[row.date] = idx;
  });

  return data.map((row) => {
    if (row.equity > peak) peak = row.equity;
    const drawdown = row.equity - peak;
    const growth = firstEquity !== 0 ? ((row.equity - firstEquity) / firstEquity) * 100 : 0;
    return {
      date: row.date,
      equity: row.equity,
      drawdown,
      growth,
    };
  });
}

const Portfolio = () => {
  const parsedData = (portfolio as any[])
    .map((row) => ({
      date: row["NAV Date"] || "",
      equity: Number(row["NAV"] ?? 0),
    }))
    .filter((row) => row.date && !isNaN(row.equity))
    .sort((a, b) => {
      return parseDate(a.date).getTime() - parseDate(b.date).getTime();
    });

  const portfolioData: PortfolioRow[] = computePortfolioRows(parsedData);

  return (
    <div className="mx-4 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Portfolio Overview</h1>
        <p className="text-gray-600 text-lg">Track your equity, growth, and drawdown over time.</p>
      </header>
      {portfolioData.length === 0 ? (
        <div className="text-center text-gray-400 my-8">
          No portfolio data available.
        </div>
      ) : (
        <>
          <div className="mb-8 flex justify-center" style={{ minHeight: 400 }}>
            <ResponsiveContainer width="100%" minWidth={650} height={600}>
              <AreaChart
                data={portfolioData}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid stroke="#E0E0E0" strokeWidth={1} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) =>
                    typeof date === "string" ? date.slice(0, 10) : date
                  }
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  formatter={(value: any, name: string) => {
                    if (name === "Equity") {
                      return `₹ ${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
                    }
                    if (name === "Drawdown") {
                      return Number(value) < 0
                        ? `-${Math.abs(Number(value)).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                        : value;
                    }
                    return value;
                  }}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="equity"
                  name="Equity"
                  stroke="#48bf84"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Area
                  type="monotone"
                  dataKey="drawdown"
                  name="Drawdown Area"
                  legendType="none"
                  tooltipType="none"
                  stroke="none"
                  fill="url(#drawdownGradient)"
                  isAnimationActive={false}
                  yAxisId={0}
                  connectNulls={false}
                  data={portfolioData.map((row) => ({
                    ...row,
                    drawdown: row.drawdown < 0 ? row.drawdown : 0,
                  }))}
                />
                <defs>
                  <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="drawdown"
                  name="Drawdown"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white rounded-xl shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-black-500">Date</th>
                  <th className="px-4 py-2 text-left text-black-500">Equity</th>
                  <th className="px-4 py-2 text-left text-black-500">Growth</th>
                  <th className="px-4 py-2 text-left text-black-500">Drawdown</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((row, idx) => (
                  <tr key={row.date + idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="px-4 py-2 text-gray-900">{row.date}</td>
                    <td className="px-4 py-2 text-gray-900">
                      {isNaN(row.equity) ? "-" : `₹ ${row.equity.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                    </td>
                    <td className={`px-4 py-2 ${row.growth < 0 ? "text-red-500" : "text-green-600"}`}>
                      {isNaN(row.growth)
                        ? "-"
                        : row.growth < 0
                          ? `${row.growth.toFixed(2)}%`
                          : `+${row.growth.toFixed(2)}%`}
                    </td>
                    <td
                      className={`px-4 py-2 ${row.drawdown < 0 ? "text-red-500" : "text-green-600"
                        }`}
                    >
                      {isNaN(row.drawdown)
                        ? "-"
                        : row.drawdown < 0
                          ? `-${Math.abs(row.drawdown).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                          : row.drawdown}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <footer className="text-center mt-8">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Capital</p>
      </footer>
    </div>
  );
};

export default Portfolio;

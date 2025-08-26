import React, { useState, useRef } from 'react';
import { StockHistoryPoint } from '../types';

interface StockHistoryChartProps {
  history: StockHistoryPoint[];
}

const StockHistoryChart: React.FC<StockHistoryChartProps> = ({ history }) => {
  const [tooltip, setTooltip] = useState<{ x: number, y: number, content: string } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  if (!history || history.length < 2) {
    return <p>Not enough historical data to display a chart.</p>;
  }

  const width = 500;
  const height = 150;
  const padding = { top: 10, right: 30, bottom: 25, left: 30 };

  const data = history.map(d => ({
    date: new Date(d.date_utc.endsWith('Z') ? d.date_utc : d.date_utc + 'Z'),
    score: d.score,
  }));

  const minDate = data[0].date;
  const maxDate = data[data.length - 1].date;

  const xScale = (date: Date) => {
    if (maxDate.getTime() === minDate.getTime()) {
      return padding.left + (width - padding.left - padding.right) / 2;
    }
    return padding.left + ((date.getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime())) * (width - padding.left - padding.right);
  };

  const yScale = (score: number) => {
    return height - padding.bottom - ((score / 100)) * (height - padding.top - padding.bottom);
  };

  const linePath = data.map(d => `${xScale(d.date)},${yScale(d.score)}`).join(' ');
  const areaPath = `${xScale(minDate)},${height - padding.bottom} ` + linePath + ` ${xScale(maxDate)},${height - padding.bottom}`;
  
  const yAxisLabels = [0, 50, 100];
  const numLabels = Math.min(data.length, 4);
  const xAxisLabels = numLabels > 1 ? Array.from({ length: numLabels }, (_, i) => data[Math.floor(i * (data.length - 1) / (numLabels - 1))]) : [data[0]];


  const handleMouseOver = (e: React.MouseEvent, d: { date: Date, score: number }) => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    setTooltip({
      x: e.clientX - svgRect.left,
      y: e.clientY - svgRect.top - 10,
      content: `${d.date.toLocaleDateString()}: ${d.score}`
    });
  };

  const handleMouseOut = () => {
    setTooltip(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', fontFamily: 'inherit' }}>
        {yAxisLabels.map(label => (
          <g key={label}>
            <line className="grid-line" x1={padding.left} y1={yScale(label)} x2={width - padding.right} y2={yScale(label)} />
            <text className="axis-label" x={padding.left - 5} y={yScale(label) + 3} textAnchor="end">{label}</text>
          </g>
        ))}
        {xAxisLabels.map((d, i) => {
          let anchor = "middle";
          if (i === 0) anchor = "start";
          if (i === xAxisLabels.length - 1) anchor = "end";

          return (
            <text className="axis-label" key={i} x={xScale(d.date)} y={height - padding.bottom + 12} textAnchor={anchor}>
              {d.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </text>
          );
        })}
        <defs>
          <linearGradient id="stockAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-line-color)" stopOpacity={0.4}/>
            <stop offset="100%" stopColor="var(--chart-line-color)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <polyline className="score-area" points={areaPath} fill="url(#stockAreaGradient)" />
        <polyline className="score-line" points={linePath} />
        {data.map((d, i) => (
          <circle
            key={i}
            className="score-point"
            cx={xScale(d.date)}
            cy={yScale(d.score)}
            r="3"
            onMouseOver={(e) => handleMouseOver(e, d)}
            onMouseOut={handleMouseOut}
          />
        ))}
      </svg>
      {tooltip && (
        <div className="chart-tooltip" style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)' }}>
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default StockHistoryChart;
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const lessonNumber = chartData.findIndex(d => d.date === data.date) + 123;
    
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 md:p-4">
        <div className="space-y-1 md:space-y-1.5">
          <div>
            <p className="text-sm md:text-base font-semibold text-just_cod-gray">{data.fullDate}</p>
            <p className="text-[10px] md:text-xs text-gray-500">Lesson #{lessonNumber}</p>
          </div>
          <div>
            <p className="text-sm md:text-sm font-semibold text-just_cod-gray">
              Total Words: {data.totalWords.toLocaleString()}
            </p>
          </div>
          
          {data.newWords > 0 && (
            <div className="flex items-center gap-1 text-xs md:text-sm text-green-600">
              <span>↑</span>
              <span>{data.newWords} from previous</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

// Generate realistic data based on the reference chart
const generateChartData = () => {
  // Key points extracted from the reference chart (date offset from start, total words)
  const keyPoints = [
    { dayOffset: 0, totalWords: 0 },       // Aug 15
    { dayOffset: 6, totalWords: 344 },     // Aug 21
    { dayOffset: 10, totalWords: 768 },    // Aug 25
    { dayOffset: 11, totalWords: 1210 },    // Aug 26
    { dayOffset: 15, totalWords: 2077 },    // Aug 30
    { dayOffset: 23, totalWords: 3776 },    // Sep 7
    { dayOffset: 29, totalWords: 5400 },    // Sep 13
    { dayOffset: 34, totalWords: 6752 },   // Sep 18
    { dayOffset: 36, totalWords: 10998 },   // Sep 20
    { dayOffset: 40, totalWords: 11588 },   // Sep 24
    { dayOffset: 42, totalWords: 12315 },   // Sep 26
    { dayOffset: 51, totalWords: 14579 },   // Oct 5
    { dayOffset: 55, totalWords: 14918 },   // Oct 9
    { dayOffset: 60, totalWords: 16547 },   // Oct 14
    { dayOffset: 62, totalWords: 16643 },  // Oct 16
    { dayOffset: 65, totalWords: 18469 },  // Oct 19
    { dayOffset: 66, totalWords: 21600 },  // Oct 20
    { dayOffset: 76, totalWords: 21700 },  // Oct 30
    { dayOffset: 82, totalWords: 21800 },  // Nov 5
    { dayOffset: 117, totalWords: 21916 }, // Dec 10
    { dayOffset: 118, totalWords: 26310 }, // Dec 11 - final jump
  ];
  
  const data = [];
  const startDate = new Date(2025, 7, 15); // August 15, 2025
  
  for (let i = 0; i < keyPoints.length; i++) {
    const point = keyPoints[i];
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + point.dayOffset);
    
    const month = currentDate.toLocaleDateString('en-US', { month: 'short' });
    const day = currentDate.getDate();
    
    const newWords = i > 0 ? point.totalWords - keyPoints[i - 1].totalWords : 0;
    
    data.push({
      date: `${month} ${day}`,
      totalWords: point.totalWords,
      newWords,
      fullDate: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
  }
  
  return data;
};

const chartData = generateChartData();

const chartConfig = {
  totalWords: {
    label: 'Total Words',
    color: '#3b82f6', // Blue
  },
  newWords: {
    label: 'New Words',
    color: '#10b981', // Green
  },
};

export function ProgressChart() {
  // Find Dec 10 data point (index 19)
  const defaultPoint = chartData[19]; // Dec 10
  const [isHovering, setIsHovering] = useState(false);
  
  // Track if chart is in viewport for animation
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.3 });

  return (
    <Card ref={chartRef} className="w-full h-full border-0 shadow-none bg-transparent relative">
      <CardContent className="p-0 h-full">
        {/* Default tooltip - only visible when not hovering */}
        <AnimatePresence>
          {!isHovering && defaultPoint && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-4 left-4 md:left-auto md:right-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-3 md:p-4"
            >
              <div className="space-y-1 md:space-y-1.5">
                <div>
                  <p className="text-sm md:text-base font-semibold text-just_cod-gray">{defaultPoint.fullDate}</p>
                  <p className="text-[10px] md:text-xs text-gray-500">Lesson #{chartData.findIndex(d => d.date === defaultPoint.date) + 123}</p>
                </div>
                <div>
                  <p className="text-sm md:text-sm font-semibold text-just_cod-gray">
                    Total Words: {defaultPoint.totalWords.toLocaleString()}
                  </p>
                </div>
                
                {defaultPoint.newWords > 0 && (
                  <div className="flex items-center gap-1 text-xs md:text-sm text-green-600">
                    <span>↑</span>
                    <span>{defaultPoint.newWords} from previous</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
              onMouseMove={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={true} opacity={0.8} />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval={Math.floor(chartData.length / 8)}
              />
              {/* <YAxis 
                tickFormatter={(value) => value.toLocaleString()}
                tick={{ fontSize: 12 }}
                stroke="#888888"
              /> */}
              <ChartTooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Area
                type="monotone"
                dataKey="totalWords"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#colorNew)"
                dot={false}
                activeDot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                isAnimationActive={isInView}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

import React, { useEffect, useState } from 'react';
import useRestauarantAndBranch from '../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Label, LineChart, Line, LabelList } from 'recharts';
import LoadingPage from '../../Shared/LoadingPages/LoadingPage/LoadingPage';


const Statistics = () => {
    const axiosSecure = useAxiosSecure();
    const {res_id, branchID} = useRestauarantAndBranch();
    const [chartWidth, setChartWidth] = useState(600); // Initial width value

    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ["data", res_id, branchID],

        queryFn: async () => {

            const res = await axiosSecure.get(`/admin/restaurant/branch/${branchID}/statistics`);
            console.log(res.data)
            return res?.data;
        },
    });
    const COLORS = ['#FF5733', // Orange
    '#33FF57', // Green
    '#3357FF', // Blue
    '#FF33A1', // Pink
    '#FFBD33', // Yellow-Orange
    '#8E44AD', // Purple
    '#2ECC71', // Fresh Green
    '#F39C12', // Golden Orange
    '#E74C3C', // Deep Red
    '#3498DB',]; // Cool Blue // Customize colors as needed

  

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 375) {
        setChartWidth(300); // Set width for small screens
      } else if (screenWidth <= 768) {
        setChartWidth(360); // Set width for small screens
      } else if (screenWidth <= 1024) {
        setChartWidth(450); // Set width for medium screens
      } else {
        setChartWidth(600); // Set width for large screens
      }
    };

    handleResize(); // Set initial width

    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);
    return (
        <>
        
        <div className='mt-8 md:mt-12 lg:mt-24 mx-3 lg:mx-40 flex flex-wrap gap-20 justify-center'>
            {/* --------------Order Count BarChart------------------ */}
            <div
            className="rounded-lg shadow-md"
            aria-label="New Users Per Month graph"
          >
            <div className="m-5">
              <h1 className="text-lg">Revenue Per Hour <span className="text-xs">in tk</span></h1>
            </div>
        <BarChart
          width={chartWidth}
          height={400}
          data={data?.Hour}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#45D483" />
        </BarChart>
        </div>

        {/* ------------------------Reveneue AreaChart--------------------- */}
        <div className="" aria-label="revenue graph">
            <div className="rounded-lg shadow-md">
              <div className="m-5">
                <h1 className="text-lg">
                  Revenue Per Day <span className="text-xs">in tk</span>
                </h1>
              </div>
        <AreaChart
          width={chartWidth}
          height={400}
          data={data?.daywise}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke="#A35778" fill="#E4D4F4" />
        </AreaChart>
        </div>
          </div>


          {/* --------------order status pie chart--------------- */}
          <div className="" aria-label="completed order pie chart">
            <div className="rounded-lg shadow-md">
              <div className="m-5">
                <h1 className="text-lg">Order Status</h1>
              </div>
              <PieChart width={chartWidth} height={288}>
      <Pie
        data={data?.status}
        outerRadius={90}
                    innerRadius={50}
                    labelLine={false}
        fill="#8884d8"
        dataKey="orderCount"
      >
        {data?.status.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <LabelList
        fill='#000000'
          dataKey="_id"
          position="outside" /* You can use "inside" or "outside" */
        />
      </Pie>
      <Legend />
    </PieChart>
            </div>
            </div>


        </div>
      
        </>
    );
};

export default Statistics;
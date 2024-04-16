import React, { useEffect, useState } from 'react';
import useRestauarantAndBranch from '../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';


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
    const COLORS = ["#64c5b1", "rgb(230, 137, 0)", "#DCDCDC"]; // Customize colors as needed

  

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 375) {
        setChartWidth(300); // Set width for small screens
      } else if (screenWidth <= 768) {
        setChartWidth(350); // Set width for small screens
      } else if (screenWidth <= 1024) {
        setChartWidth(300); // Set width for medium screens
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
        <div className='mt-8 md:mt-12 lg:mt-24 mx-3 lg:mx-40 grid grid-cols-1 md:grid-cols-2 gap-20 justify-center'>
            {/* --------------Order Count BarChart------------------ */}
            <div
            className="rounded-lg shadow-md"
            aria-label="New Users Per Month graph"
          >
            <div className="m-5">
              <h1 className="text-lg">Order Summary Per Count</h1>
            </div>
        <BarChart
          width={chartWidth}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orderCount" fill="#45D483" />
        </BarChart>
        </div>

        {/* ------------------------Reveneue AreaChart--------------------- */}
        <div className="" aria-label="revenue graph">
            <div className="rounded-lg shadow-md">
              <div className="m-5">
                <h1 className="text-lg">
                  Revenue <span className="text-xs">in tk</span>
                </h1>
              </div>
        <AreaChart
          width={chartWidth}
          height={400}
          data={data}
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

        </div>
      
        </>
    );
};

export default Statistics;
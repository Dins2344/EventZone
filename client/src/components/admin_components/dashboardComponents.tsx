import { useEffect, useState } from "react";
import {
  getTotalEvents,
  getTotalOrganizers,
  getTotalTicketsSold,
  getTotalUsers,
  getMonthlySales,
  getMonthlyTicketSales,
  getMonthlyTicketTypeSales,
  getMostSoldEvents
} from "../../api/adminAuth/admin";
import { RegisteredUserInterface } from "../../types/userInterface";
import { RegisteredEventInterface } from "../../types/organizerInterface";
import { RegisteredOrganization } from "../../types/userInterface";
import Chart from "react-apexcharts";



type totalTicketSoldType = {
    totalTickets:number 
    eventName:string
}
const DashboardComponents: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<RegisteredUserInterface[]>();
  const [totalEvents, setTotalEvents] = useState<RegisteredEventInterface[]>();
  const [totalOrganizations, setTotalOrganizations] = useState<RegisteredOrganization[]>();
  const [totalTicketsSold, setTotalTicketsSold] = useState<totalTicketSoldType[]>();

  useEffect(() => {
    fetchTotalCount();
  }, []);

  const fetchTotalCount = async () => {
    const totalUsers = await getTotalUsers();
    const totalOrganizers = await getTotalOrganizers();
    const totalEventsData = await getTotalEvents();
    const totalTicketsSold = await getTotalTicketsSold();
    totalEventsData && setTotalEvents(totalEventsData?.data.data);
    totalOrganizers && setTotalOrganizations(totalOrganizers.data.data);
    totalUsers && setTotalUsers(totalUsers?.data.data);
    totalTicketsSold && setTotalTicketsSold(totalTicketsSold?.data.data);
  };
  const totalTicketsSum =totalTicketsSold && totalTicketsSold.reduce((acc, event) => acc + event.totalTickets, 0);

  return (
    <>
      <div className="flex flex-wrap mt=4">
        <div className="flex w-full md:w-1/2 lg:w-1/4 h-24  p-2 ">
          <div className="flex w-full bg-blue-gray-300  items-center rounded-lg pl-3">
            <h2 className="text-5xl mr-3">{totalUsers?.length}</h2>
            <h5 className="text-xl font-bold text-black">Users</h5>
          </div>
        </div>
        <div className="flex w-full md:w-1/2 lg:w-1/4 h-24  p-2 ">
          <div className="flex w-full bg-blue-gray-300  items-center rounded-lg pl-3">
            <h2 className="text-5xl mr-3">{totalOrganizations?.length}</h2>
            <h5 className="text-xl font-bold text-black">Organizers</h5>
          </div>
        </div>
        <div className="flex w-full md:w-1/2 lg:w-1/4 h-24  p-2 ">
          <div className="flex w-full bg-blue-gray-300  items-center rounded-lg pl-3">
            <h2 className="text-5xl mr-3">{totalEvents?.length}</h2>
            <h5 className="text-xl font-bold text-black">Events</h5>
          </div>
        </div>
        <div className="flex w-full md:w-1/2 lg:w-1/4 h-24  p-2 ">
          <div className="flex w-full bg-blue-gray-300  items-center rounded-lg pl-3">
            <h2 className="text-5xl mr-3">{totalTicketsSum}</h2>
            <h5 className="text-xl font-bold text-black">Tickets sold</h5>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-10 border shadow-md px-3 rounded-md">
          <div className="flex flex-col justify-center w-full py-4 mb-3">
            <h2 className="text-xl  font-extrabold text-black ">
              Sales Summary
            </h2>
            <p>An overview of all ticket sales,</p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 items-center">
            <p>Monthly revenue</p>
            <ChartComponent />
          </div>
          <div className="flex flex-col w-full md:w-1/2 items-center mt-3 md:mt-0">
            <p>Tickets sold in a month</p>
            <LineChartComponent />
          </div>
        </div>
        <div className="flex flex-wrap mt-10 border shadow-md px-3 rounded-md">
          <div className="flex flex-col justify-center w-full py-4 mb-3">
            <h2 className="text-xl  font-extrabold text-black ">
              Sales by Ticket Type
            </h2>
            <p>An overview of all ticket sales by ticket type</p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 items-center">
            <p className="mb-2">Ticket types sold</p>
            <PieChartComponent />
          </div>
          <div className="flex flex-col w-full md:w-1/2 items-center mt-3 md:mt-0">
            <p className="mb-2">Ticket sold by events</p>
            <MostTicketSold />
          </div>
        </div>
    </>
  );
};

export default DashboardComponents;

type MonthlySales = {
  totalSales: number;
  month: string;
};

export const ChartComponent: React.FC = () => {
  const [monthlySales, setMonthlySales] = useState<MonthlySales[]>();
  useEffect(() => {
    fetchMonthlySales();
  }, []);
  const fetchMonthlySales = async () => {
    const data = await getMonthlySales();
    setMonthlySales(data?.data.data);
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const allMonths = [
    "2023-01",
    "2023-02",
    "2023-03",
    "2023-04",
    "2023-05",
    "2023-06",
    "2023-07",
    "2023-08",
    "2023-09",
    "2023-10",
    "2023-11",
    "2023-12",
  ];

  const monthlySalesArray = allMonths.map((month) => {
    // Find the element in the output array corresponding to the current month
    const dataForMonth =
      monthlySales && monthlySales.find((item) => item.month === month);

    // If data for the current month exists, use its totalSales value, otherwise use 0
    return dataForMonth ? dataForMonth.totalSales : 0;
  });

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: months,
      },
    },
    series: [
      {
        name: "Revenue",
        data: monthlySalesArray,
      },
    ],
  };

  return (
    <>
      <div className="w-full">
        <Chart options={state.options} series={state.series} type="bar" />
      </div>
    </>
  );
};

type ticketSales = {
  totalTickets:number
  month:string
}

export const LineChartComponent: React.FC = () => {
  const [ticketSales,setTicketSales]=useState<ticketSales[]>()
useEffect(() => {
  fetchMonthlyTicketSale();
}, []);

const fetchMonthlyTicketSale = async () => {
  const data = await getMonthlyTicketSales();
  setTicketSales(data?.data.data)
};
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const allMonths = [
  "2023-01",
  "2023-02",
  "2023-03",
  "2023-04",
  "2023-05",
  "2023-06",
  "2023-07",
  "2023-08",
  "2023-09",
  "2023-10",
  "2023-11",
  "2023-12",
];

const monthlyTicketSalesArray = allMonths.map((month) => {
  const dataForMonth =
    ticketSales && ticketSales.find((item) => item.month === month);

  return dataForMonth ? dataForMonth.totalTickets : 0;
});
const state = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: months,
    },
  },
  series: [
    {
      name: "Ticket sold",
      data: monthlyTicketSalesArray,
    },
  ],
};
return (
  <>
    <div className="w-full">
      <Chart options={state.options} series={state.series} type="line" />
    </div>
  </>
);
};

type ticketTypeSales = {
  paymentType:string
  totalTickets:number
}

export const PieChartComponent: React.FC = () => {
  const  [ticketTypeSold,setTicketTypeSold]=useState<ticketTypeSales[]>()

  useEffect(()=>{
      fetchTicketSoldType ()
  },[])

  const fetchTicketSoldType = async () =>{
      const data = await getMonthlyTicketTypeSales()
      setTicketTypeSold(data?.data.data)
  }
  const ticketTypes = ['free','charged','donation']

  const monthlyTicketSoldArray = ticketTypes.map((type) => {
      const dataForMonth =
        ticketTypeSold && ticketTypeSold.find((item) => item.paymentType === type);
  
      return dataForMonth ? dataForMonth.totalTickets : 0;
    });

const state = {
  series: monthlyTicketSoldArray,
  chartOptions: {
    labels: ticketTypes,
  },
};
return (
  <>
    <div className="w-full">
      <Chart options={state.chartOptions} series={state.series} type="pie" />
    </div>
  </>
);
};


export const MostTicketSold:React.FC = ()=>{
  useEffect(()=>{
    fetchMostSoldEvents()
  },[])

  const fetchMostSoldEvents = async()=>{
    const data  = await getMostSoldEvents()
    console.log(data)
  }
  return (
    <>
    </>
  )
}
